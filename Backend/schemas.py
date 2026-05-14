from pydantic import BaseModel, Field, ConfigDict
from datetime import date, datetime
from typing import Optional
from enum import Enum


# ENUMS 

class RoleEnum(str, Enum):
    agent = "agent"
    admin = "admin"

#login

class ClientLoginResponse(BaseModel):
    id_user: str
    email: str
    detail:str
    
class UserLoginResponse(BaseModel):
    id_user: str
    email: str
    role: RoleEnum
    detail:str

class ModePaiementEnum(str, Enum):
    carte = "carte"
    espece = "espece"
    application = "application"


class EtatVehiculeEnum(str, Enum):
    parfait = "parfait"
    nettoyage_requis = "nettoyage_requis"
    dommages_mineurs = "dommages_mineurs"
    dommages_majeurs = "dommages_majeurs"


class StatusVehiculeEnum(str, Enum):
    disponible = "disponible"
    louer = "louer"
    maintenance = "maintenance"


class StatusReservationEnum(str, Enum):
    en_attente = "en_attente"
    confirmee = "confirmee"
    en_cours = "en_cours"
    terminee = "terminee"
    annulee = "annulee"

    


# UTILISATEUR 

class ClientLogin(BaseModel):
    email: str
    mot_de_passe: str
    
class UserLogin(BaseModel):
    email: str
    mot_de_passe: str
    role: RoleEnum
    
class ShowAdmin(BaseModel):
    id_user: str
    nom: str
    prenom: str
    role: RoleEnum
    email: str
    model_config = ConfigDict(from_attributes=True)



class UtilisateurCreate(BaseModel):
    # id_user: str = Field(..., max_length=50)
    nom: str = Field(..., max_length=100)
    prenom: str = Field(..., max_length=100)
    mot_de_passe: str
    email: str = Field(..., max_length=100)
    role: RoleEnum
    id_admin: Optional[str] = Field(None, max_length=50)
    img: Optional[str] = None
    


class ShowUtilisateur(BaseModel):
    id_user: str
    nom: str 
    prenom: str
    role: RoleEnum
    email: str
    img: Optional[str] = None
    created_at: Optional[datetime] = None
    admin: Optional[ShowAdmin] = None

    model_config = ConfigDict(from_attributes=True)  
    

# CLIENT 

class ClientCreate(BaseModel):
    nom: str = Field(..., max_length=100)
    prenom: str = Field(..., max_length=100)
    mot_de_passe: str
    adresse: str
    email: str = Field(..., max_length=100,)
    tel: str = Field(..., max_length=20)
    cin: str = Field(..., max_length=20)
    num_permis: str = Field(..., max_length=50)

class ShowClient(BaseModel):
    id_client: str
    nom: str
    prenom: str
    adresse: str
    tel: str
    cin: str
    num_permis: str
    email: str
    created_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)

    

# VEHICULE 

class VehiculeCreate(BaseModel):
    # id_vehicule: str = Field(..., max_length=50)
    marque: str = Field(..., max_length=50)
    modele: str = Field(..., max_length=50)
    carburant: str = Field(..., max_length=30)
    prix_par_jour: float = Field(..., gt=0)
    status: StatusVehiculeEnum = Field(default=StatusVehiculeEnum.disponible)
    img: Optional[str] = None


class ShowVehicule(BaseModel):
    id_vehicule: str
    marque: str
    modele: str
    carburant: str
    prix_par_jour: float
    status: StatusVehiculeEnum
    img: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# RESERVATION

class ReservationCreate(BaseModel):
    # id_reservation: str = Field(..., max_length=50)
    date_debut: date
    date_fin: date
    date_reservation: Optional[date] = None
    montant_total: float = Field(..., ge=0)
    status: StatusReservationEnum = Field(default=StatusReservationEnum.en_attente)
    id_client: str = Field(..., max_length=50)
    id_vehicule: str = Field(..., max_length=50)
    id_user:Optional[str] = Field(default="agent1")

   



class ReservationDetail(BaseModel):
    id_reservation: str
    date_debut: date
    date_fin: date
    date_reservation: Optional[date]
    montant_total: float
    montant_final: Optional[float] = None
    status: StatusReservationEnum
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    client: ShowClient
    vehicule: ShowVehicule
    utilisateur: ShowUtilisateur

    model_config = ConfigDict(from_attributes=True)


class ReservationUpdate(BaseModel):
    status: Optional[StatusReservationEnum] = None
    montant_final: Optional[float] = None


# PAIEMENT 

class PaiementCreate(BaseModel):
    # id_paiement: str = Field(..., max_length=50)
    mode_paiement: ModePaiementEnum = Field(default=ModePaiementEnum.carte)
    id_reservation: str = Field(..., max_length=50)


class ShowPaiement(BaseModel):
    id_paiement: str
    mode_paiement: ModePaiementEnum
    created_at: Optional[datetime] = None
    reservation: ReservationDetail
    model_config = ConfigDict(from_attributes=True)




#  RETOUR 

class RetourCreate(BaseModel):
    # id_retour: str = Field(..., max_length=50)
    date_retour: date
    etat_voiture: EtatVehiculeEnum
    frais_supplementaire: Optional[float] = 0
    id_reservation: str = Field(..., max_length=50)


class ShowRetour(BaseModel):
    id_retour: str
    date_retour: date
    etat_voiture: EtatVehiculeEnum
    frais_supplementaire: float
    created_at: Optional[datetime] = None
    reservation: ReservationDetail
    model_config = ConfigDict(from_attributes=True)