from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from database import get_db
from typing import List
import schemas,models


router = APIRouter(prefix="/api/retours", tags=["Retours"])


@router.get("/",response_model=List[schemas.ShowRetour])
def get_all_retour(db : Session = Depends(get_db)) :
    retours = db.query(models.Retour).all()
    if not retours :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Aucun retour trouvé")
    return retours

@router.get("/{id_retour}",response_model=schemas.ShowRetour)
def get_retour_by_id(id_retour:str,db : Session = Depends(get_db)) :
    retour = db.query(models.Retour).filter(models.Retour.id_retour == id_retour).first()
    if not retour :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Aucun retour trouvé")
    return retour


@router.post("/", response_model=schemas.ShowRetour,status_code=status.HTTP_201_CREATED)
def create_retour(request: schemas.RetourCreate, db: Session = Depends(get_db)):
    
    
    reservation = db.query(models.Reservation).filter(models.Reservation.id_reservation == request.id_reservation).first()
    
    
    if not reservation:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cette reservation n'existe pas")
   

    new_retour = models.Retour(    
        id_retour = request.id_retour,
        id_reservation =request.id_reservation,      
        date_retour = request.date_retour,
        etat_voiture = request.etat_voiture,
        frais_supplementaire = request.frais_supplementaire
    )
    db.add(new_retour)
    db.commit()
    db.refresh(new_retour)
    return new_retour


@router.put("/{id_retour}",response_model=schemas.ShowRetour)
def update_client(id_retour: str, request: schemas.RetourCreate, db: Session = Depends(get_db)):
    #Rechercher le retour existant
    retour = db.query(models.Retour).filter(models.Retour.id_retour == id_retour).first()

    if not retour:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Retour introuvable"
        )
    
    reservation = db.query(models.Reservation).filter(models.Reservation.id_reservation == request.id_reservation).first()
    if not reservation :
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,detail="Reservation n'existe pas")

    # Mettre à jour les champs (en excluant l'ID pour ne pas modifier la clé primaire)
    update_data = request.model_dump(exclude={"id_retour"})
    for key, value in update_data.items():
        setattr(retour, key, value)

    db.commit()
    db.refresh(retour)
    return retour



@router.delete("/{id_retour}")
def delete(id_retour:str, db : Session = Depends(get_db)):
    retour = db.query(models.Retour).filter(models.Retour.id_retour==id_retour).first()
    if not retour :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Ce retour n'existe pas")
    db.delete(retour)
    db.commit()
    return {"Message":"Retour supprimé avec succès"}