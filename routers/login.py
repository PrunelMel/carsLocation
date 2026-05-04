from fastapi import Depends, HTTPException, status, APIRouter
import models
from database import get_db
import schemas
from sqlalchemy.orm import Session
from typing import List
from hashing import verify_password

router = APIRouter(prefix="/api/login", tags=["login"])

@router.post("/", status_code=status.HTTP_201_CREATED)
def login(request : schemas.UserLogin | schemas.ClientLogin, db : Session = Depends(get_db)):
    if isinstance(request, schemas.UserLogin):
        user = db.query(models.Utilisateur).filter(models.Utilisateur.email == request.email,  models.Utilisateur.role == request.role).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Utilisateur introuvable")
        else:
            if verify_password(request.mot_de_passe, user.mot_de_passe):
                raise  HTTPException(status_code=status.HTTP_200_OK,detail="Utilisateur valide")
            
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Mot de passe Utilisateur incorrect")
        
    else:
        client = db.query(models.Client).filter(models.Client.email == request.email).first()
        
        if verify_password(request.mot_de_passe, client.mot_de_passe):
            # return {"detail": "Client introuvable"}
            raise HTTPException(status_code=status.HTTP_200_OK,detail="Client valide")
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Mot de passe Client incorrect")
            # return {"detail": "Mot de passe incorrect"}
    