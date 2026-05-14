from fastapi import Depends, HTTPException, status, APIRouter
import models
from database import get_db
import schemas
from sqlalchemy.orm import Session
from hashing import verify_password
from fastapi import Response

router = APIRouter(prefix="/api/login", tags=["login"])


@router.post("/", status_code=status.HTTP_200_OK, response_model=schemas.ClientLoginResponse | schemas.UserLoginResponse)
def login(request: schemas.UserLogin | schemas.ClientLogin, db: Session = Depends(get_db)):

    if isinstance(request, schemas.UserLogin):
        user = db.query(models.Utilisateur).filter(
            models.Utilisateur.email == request.email,
            models.Utilisateur.role == request.role
        ).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Utilisateur introuvable"
            )

        # CORRECTION : verify_password retourne True si correct → retourner normalement,
        # lever une exception seulement en cas d'échec
        if not verify_password(request.mot_de_passe, user.mot_de_passe):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Mot de passe incorrect"
            )

        return {"detail": "Utilisateur valide", "role": user.role, "id_user": user.id_user, "email": user.email}

    else:
        # CORRECTION : vérifier que le client existe avant d'appeler verify_password
        client = db.query(models.Client).filter(models.Client.email == request.email).first()

        if not client:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Client introuvable"
            )

        if not verify_password(request.mot_de_passe, client.mot_de_passe):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Mot de passe incorrect"
            )

        return    {"detail": "Client valide", "id_user": client.id_client, "email": client.email}