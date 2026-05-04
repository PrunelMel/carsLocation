from fastapi import APIRouter ,HTTPException,status,Depends
from typing import List
from database import get_db
import schemas
import models
from sqlalchemy.orm import Session
import models
router = APIRouter(prefix="/api/vehicules",tags=["Vehicules"])

#Recuperer tous les vehicules

@router.get("/",response_model=List[schemas.ShowVehicule])
def get_all_vehicules(db : Session = Depends(get_db)):
    vehicules = db.query(models.Vehicule).all()
    if not vehicules :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Aucun vehicule trouvé")
    return vehicules


#Recuperer un vehicule par Id
@router.get("/{id_vehicule}",response_model=schemas.ShowVehicule)
def get_vehicule_by_id(id : str , db : Session = Depends(get_db)):
    vehicule = db.query(models.Vehicule).filter(models.Vehicule.id_vehicule ==id).first()
    if not vehicule :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Aucun vehicule correspondant")

    return vehicule


#Creer un vehicule 
@router.post("/",response_model=schemas.ShowVehicule,status_code=status.HTTP_201_CREATED)
def create_vehicule(request : schemas.Vehicule , db : Session = Depends(get_db)):
    new_vehicule = models.Vehicule(
        id_vehicule = request.id_vehicule,
        marque =request.marque,
        modele = request.modele,
        carburant = request.carburant,
        prix_par_jour = request.prix_par_jour,
        status = request.status
    )

    db.add(new_vehicule)
    db.commit()
    db.refresh(new_vehicule)
    return new_vehicule


#Mettre à jour un vehicule
@router.put("/{id_vehicule}",response_model=schemas.ShowVehicule)
def update_vehicule(id : str,request : schemas.Vehicule ,db : Session = Depends(get_db)):
    vehicule = db.query(models.Vehicule).filter(models.Vehicule.id_vehicule == id).first()
    if not vehicule:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Aucun vehicule ne correspond")
    updated_vehicule = request.model_dump(exclude={"id_vehicule"})
    for key,value in updated_vehicule.items():
        setattr(vehicule,key,value)
    db.commit()
    db.refresh(vehicule)
    return request



@router.delete("/{id_vehicule}")
def delete(id_vehicule:str, db : Session = Depends(get_db)):
    vehicule = db.query(models.Vehicule).filter(models.Vehicule.id_vehicule==id_vehicule).first()
    if not vehicule :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Ce vehicule n'existe pas")
    db.delete(vehicule)
    db.commit()
    return {"Message":"Vehicule supprimé avec succès"}

    
    
    


