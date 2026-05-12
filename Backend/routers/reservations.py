from fastapi import APIRouter, status, Depends, HTTPException
from typing import List
from database import get_db
from sqlalchemy.orm import Session
import schemas, models

router = APIRouter(prefix="/api/reservations", tags=["Reservations"])


@router.get("/", response_model=List[schemas.ReservationDetail])
def get_all_reservation(db: Session = Depends(get_db)):
    reservations = db.query(models.Reservation).all()
    if not reservations:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aucune reservation trouvée")
    return reservations


@router.get("/{id_reservation}", response_model=schemas.ReservationDetail, status_code=status.HTTP_200_OK)
def get_reservation_by_id(id_reservation: str, db: Session = Depends(get_db)):
    reservation = db.query(models.Reservation).filter(
        models.Reservation.id_reservation == id_reservation
    ).first()
    if not reservation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reservation introuvable")
    return reservation


@router.post("/", response_model=schemas.ReservationDetail, status_code=status.HTTP_201_CREATED)
def create_reservation(request: schemas.ReservationCreate, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.id_client == request.id_client).first()
    vehicule = db.query(models.Vehicule).filter(models.Vehicule.id_vehicule == request.id_vehicule).first()
    agent = db.query(models.Utilisateur).filter(models.Utilisateur.id_user == request.id_user).first()
    
    if not client:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Ce client n'existe pas")
    if not vehicule:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Ce vehicule n'existe pas")
    if not agent:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cet agent n'existe pas")
    id_reservation = hash(str(request.id_client) + str(request.id_vehicule))
    new_reservation = models.Reservation(
        id_reservation=id_reservation,
        date_debut=request.date_debut,
        date_fin=request.date_fin,
        date_reservation=request.date_reservation,
        montant_total=request.montant_total,
        # CORRECTION : inclure status (présent dans le model et le schéma)
        status=request.status,
        id_client=request.id_client,
        id_vehicule=request.id_vehicule,
        id_user=request.id_user,
    )
    db.add(new_reservation)
    db.commit()
    db.refresh(new_reservation)
    return new_reservation


@router.put("/{id_reservation}", response_model=schemas.ReservationDetail, status_code=status.HTTP_200_OK)
def update_reservation(id_reservation: str, request: schemas.ReservationCreate, db: Session = Depends(get_db)):
    reservation = db.query(models.Reservation).filter(
        models.Reservation.id_reservation == id_reservation
    ).first()
    if not reservation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reservation introuvable")

    client = db.query(models.Client).filter(models.Client.id_client == request.id_client).first()
    vehicule = db.query(models.Vehicule).filter(models.Vehicule.id_vehicule == request.id_vehicule).first()
    agent = db.query(models.Utilisateur).filter(models.Utilisateur.id_user == request.id_user).first()

    if not client:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Ce client n'existe pas")
    if not vehicule:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Ce vehicule n'existe pas")
    if not agent:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cet agent n'existe pas")

    # CORRECTION : ne pas exclure les FK — on les met à jour normalement
    updated_data = request.model_dump(exclude={"id_reservation"})
    for key, value in updated_data.items():
        setattr(reservation, key, value)

    db.commit()
    db.refresh(reservation)
    # CORRECTION : retourner l'objet DB et non `request` (objet Pydantic incompatible avec ReservationDetail)
    return reservation


@router.delete("/{id_reservation}", status_code=status.HTTP_200_OK)
def delete_reservation(id_reservation: str, db: Session = Depends(get_db)):
    reservation = db.query(models.Reservation).filter(
        models.Reservation.id_reservation == id_reservation
    ).first()
    if not reservation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cette reservation n'existe pas")
    db.delete(reservation)
    db.commit()
    return {"Message": "Reservation supprimée avec succès"}