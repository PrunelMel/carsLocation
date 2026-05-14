from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from database import get_db
import schemas
import models
from sqlalchemy.orm import Session
from hashing import  _hash


router = APIRouter(prefix="/api/vehicules", tags=["Vehicules"])


# Recuperer tous les vehicules
@router.get("/", response_model=List[schemas.ShowVehicule])
def get_all_vehicules(db: Session = Depends(get_db)):
    vehicules = db.query(models.Vehicule).all()
    if not vehicules:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aucun vehicule trouvé")
    return vehicules


# Recuperer un vehicule par Id
# CORRECTION : le paramètre de path s'appelait `id` mais le path déclare `{id_vehicule}`
@router.get("/{id_vehicule}", response_model=schemas.ShowVehicule)
def get_vehicule_by_id(id_vehicule: str, db: Session = Depends(get_db)):
    vehicule = db.query(models.Vehicule).filter(models.Vehicule.id_vehicule == id_vehicule).first()
    if not vehicule:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aucun vehicule correspondant")
    return vehicule


# Creer un vehicule
# CORRECTION : schemas.Vehicule → schemas.VehiculeCreate (le schéma correct)
@router.post("/", response_model=schemas.ShowVehicule, status_code=status.HTTP_201_CREATED)
def create_vehicule(request: schemas.VehiculeCreate, db: Session = Depends(get_db)):
    id_vehicule = _hash(str(request.marque) + str(request.modele) + str(request.prix_par_jour) )
    new_vehicule = models.Vehicule(
        id_vehicule=id_vehicule,
        marque=request.marque,
        modele=request.modele,
        carburant=request.carburant,
        prix_par_jour=request.prix_par_jour,
        status=request.status,
        img=request.img,
    )
    db.add(new_vehicule)
    db.commit()
    db.refresh(new_vehicule)
    return new_vehicule


# Mettre à jour un vehicule
# CORRECTION : paramètre `id` → `id_vehicule` + schemas.Vehicule → schemas.VehiculeCreate
@router.put("/{id_vehicule}", response_model=schemas.ShowVehicule)
def update_vehicule(id_vehicule: str, request: schemas.VehiculeCreate, db: Session = Depends(get_db)):
    vehicule = db.query(models.Vehicule).filter(models.Vehicule.id_vehicule == id_vehicule).first()
    if not vehicule:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aucun vehicule ne correspond")
    updated_vehicule = request.model_dump(exclude={"id_vehicule"})
    for key, value in updated_vehicule.items():
        setattr(vehicule, key, value)
    db.commit()
    db.refresh(vehicule)
    # CORRECTION : retourner l'objet DB et non `request` (un objet Pydantic)
    return vehicule


@router.delete("/{id_vehicule}", status_code=status.HTTP_200_OK)
def delete(id_vehicule: str, db: Session = Depends(get_db)):
    vehicule = db.query(models.Vehicule).filter(models.Vehicule.id_vehicule == id_vehicule).first()
    if not vehicule:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ce vehicule n'existe pas")
    db.delete(vehicule)
    db.commit()
    return {"Message": "Vehicule supprimé avec succès"}