from fastapi import Depends, HTTPException, status, APIRouter
import models
from database import get_db
import schemas
from sqlalchemy.orm import Session
from typing import List
from hashing import _hash, hash_password

router = APIRouter(prefix="/api/users", tags=["Users"])





#Recupérer tous les utilisateurs
@router.get("/", response_model=List[schemas.ShowUtilisateur])
def get_all_users(db : Session = Depends(get_db)):
    db_agents = db.query(models.Utilisateur).all()
    if  not db_agents:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Aucun agent trouvé")
    return db_agents

#Recuperer un utilisateur par id
@router.get("/{id_user}",response_model=schemas.ShowUtilisateur)
def get_user_by_id(id_user : str, db : Session = Depends(get_db)):
    got_user = db.query(models.Utilisateur).filter(models.Utilisateur.id_user == id_user).first()
    if not got_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Utilisateur introuvable")
    return got_user

#Créer un utilisateur 
@router.post("/",response_model=schemas.ShowUtilisateur,status_code=status.HTTP_201_CREATED)
def create_user(request : schemas.UtilisateurCreate,db : Session = Depends(get_db)):
    if request.role == "agent":
        if not request.id_admin:
            raise HTTPException(400, "Un agent doit avoir un id_admin")
        admin = db.query(models.Utilisateur).filter(models.Utilisateur.id_user == request.id_admin).first()
        if not admin:
            raise HTTPException(404, "Cet admin n'existe pas")
    id_user = _hash(str(request.email))
    new_user = models.Utilisateur(
        id_user = id_user,
        nom = request.nom,
        prenom = request.prenom,
        mot_de_passe = hash_password(request.mot_de_passe),
        email = request.email,
        role = request.role,
        id_admin = request.id_admin
    )
  
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

#Supprimer un Utilisateur
@router.delete("/{id_user}", status_code=status.HTTP_200_OK)
def delete_user(id_user : str, db : Session = Depends(get_db)):
    deleted_user = db.query(models.Utilisateur).filter(models.Utilisateur.id_user == id_user).first()
    if not deleted_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Utilisateur {id_user} introuvable")
    
    db.delete(deleted_user)
    db.commit()
    return {"Message": f"{deleted_user.role} {id_user} supprimé"}

#Mettre à jour un utilisateur                 
@router.put("/{id_user}",status_code=status.HTTP_200_OK)
def update_user(id_user: str, request: schemas.UtilisateurCreate, db: Session = Depends(get_db)):
    # 1. Rechercher l'utilisateur existant            
    user = db.query(models.Utilisateur).filter(models.Utilisateur.id_user == id_user).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Utilisateur avec l'id {id_user} introuvable"
        )
    request.mot_de_passe = hash_password(request.mot_de_passe)

    update_data = request.model_dump(exclude={"id_user"})
    for key, value in update_data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return {"Utilisateur mise à jour avec succès"}     
