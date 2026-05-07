
from fastapi import Depends,HTTPException,status,APIRouter
import models
from database import get_db
import schemas
from sqlalchemy.orm import Session
from typing import List
from hashing import hash_password


router = APIRouter(prefix="/api/clients",tags=["clients"])


# Recuperer tous les clients

@router.get("/", response_model=List[schemas.ShowClient])
def get_all_clients(db: Session = Depends(get_db)):
    clients = db.query(models.Client).all()
    if not clients:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Aucun client trouvé")
    return clients
# Recuperer un client par id
@router.get("/{id_client}",response_model=schemas.ShowClient)
def get_client_by_id(id_client:str,db : Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.id_client == id_client).first()
    if not client :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"Client {id_client} introuvable ")
    return client

# Créer un nouveau Client
@router.post("/", status_code=status.HTTP_201_CREATED,response_model=schemas.ShowClient)
def create_client(request : schemas.ClientCreate, db : Session = Depends(get_db)):
    new_client = models.Client(
        id_client = request.id_client,
        nom = request.nom,
        mot_de_passe = hash_password(request.mot_de_passe),
        prenom = request.prenom,
        adresse = request.adresse,
        tel = request.tel,
        email = request.email,
        cin = request.cin ,
        num_permis = request.num_permis
    )
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client

# Supprimer un client
@router.delete("/{id_client}", status_code=status.HTTP_200_OK)
def delete_client (id_client : str, db : Session = Depends(get_db)):
    deleteted_client = db.query(models.Client).filter(models.Client.id_client == id_client).first()
    if not deleteted_client:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Client {id_client} introuvable")
    db.delete(deleteted_client)
    db.commit()
    return {"detail": f"Client {id_client} supprimé"}

# Mettre à jour un client
@router.put("/{id_client}",response_model=schemas.ShowClient)
def update_client(id_client: str, request: schemas.ClientCreate, db: Session = Depends(get_db)):
    # 1. Rechercher le client existant
    db_client = db.query(models.Client).filter(models.Client.id_client == id_client).first()

    if not db_client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Client avec l'id {id_client} introuvable"
        )

    # 2. Mettre à jour les champs (en excluant l'ID pour ne pas modifier la clé primaire)
    request.mot_de_passe = hash_password(request.mot_de_passe)
    update_data = request.model_dump(exclude={"id_client"}) 
    for key, value in update_data.items():
        setattr(db_client, key, value)

    db.commit()
    db.refresh(db_client)
    return db_client