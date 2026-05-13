from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from database import get_db
from typing import List
import schemas,models


router = APIRouter(prefix="/api/paiements", tags=["paiements"])


@router.get("/",response_model=List[schemas.ShowPaiement])
def get_all_paiement(db : Session = Depends(get_db)) :
    paiement = db.query(models.Paiement).all()
    if not paiement :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Aucun paiement trouvé")
    return paiement

@router.get("/{id_paiement}",response_model=schemas.ShowPaiement)
def get_paiement_by_id(id_paiement:str,db : Session = Depends(get_db)) :
    paiement = db.query(models.Paiement).filter(models.Paiement.id_paiement == id_paiement).first()
    if not paiement :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Aucun paiement trouvé")
    return paiement


@router.post("/", response_model=schemas.ShowPaiement)
def create_paiement(request: schemas.PaiementCreate, db: Session = Depends(get_db)):
 
    reservation = db.query(models.Reservation).filter(models.Reservation.id_reservation == request.id_reservation).first()
 
    if not reservation :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Reservation n'existe pas")
    id_paiement = hash(request.id_reservation)
    new_paiement = models.Paiement(    
        id_paiement = id_paiement,
        id_reservation =request.id_reservation, 
        mode_paiement = request.mode_paiement     
    )
    db.add(new_paiement)
    db.commit()
    db.refresh(new_paiement)
    return new_paiement


@router.put("/{id_paiement}",response_model=schemas.ShowPaiement,status_code=status.HTTP_200_OK)
def update_client(id_paiement: str, request: schemas.PaiementCreate, db: Session = Depends(get_db)):
    #  Rechercher le paiement existant
    paiement = db.query(models.Paiement).filter(models.Paiement.id_paiement == id_paiement).first()

    if not paiement:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Paiement introuvable"
        )
    
    reservation = db.query(models.Reservation).filter(models.Reservation.id_reservation == request.id_reservation).first()
    if not reservation :
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND,detail="Reservation n'existe pas")

   # Mettre à jour les champs (en excluant l'ID pour ne pas modifier la clé primaire)
    update_data = request.model_dump(exclude={"id_paiement"})
    for key, value in update_data.items():
        setattr(paiement, key, value)

    db.commit()
    db.refresh(paiement)
    return paiement

@router.delete("/{id_paiement}")
def delete(id_paiement:str, db : Session = Depends(get_db)):
    paiement = db.query(models.Paiement).filter(models.Paiement.id_paiement==id_paiement).first()
    if not paiement :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Ce paiement n'existe pas")
    db.delete(paiement)
    db.commit()
    return {"Message":"Paiement supprimé avec succès"}
