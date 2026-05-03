from pydantic import BaseModel, Field,ConfigDict
from datetime import date
from typing import Optional
from enum import Enum



# ENUMS 

class RoleEnum(str, Enum):
    agent = "agent"
    admin = "admin"


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
    loue = "loue"
    maintenance = "maintenance"

    


# UTILISATEUR 
class ShowAdmin(BaseModel):
    id_user : str
    nom : str
    prenom : str
    role : RoleEnum


class UtilisateurCreate(BaseModel):
    id_user: str = Field(..., max_length=50)
    nom: str = Field(..., max_length=100)
    prenom: str = Field(..., max_length=100)
    mot_de_passe: str
    role: RoleEnum
    id_admin: Optional[str] = Field(None, max_length=50)
    


class ShowUtilisateur(BaseModel):
    id_user: str
    nom: str 
    prenom: str
    role: RoleEnum
    admin : Optional[ShowAdmin]

# La classe config est necessaire dans les responses model pour eviter les erreurs
    model_config = ConfigDict(from_attributes=True)  
    

# CLIENT 

class ClientCreate(BaseModel):
    id_client: str = Field(..., max_length=50)
    nom: str = Field(..., max_length=100)
    prenom: str = Field(..., max_length=100)
    mot_de_passe: str
    adresse: str
    tel: str = Field(..., max_length=20)
    cin: str = Field(..., max_length=20)
    num_permis: str = Field(..., max_length=50)

class ShowClient(BaseModel):
    id_client :str
    nom : str
    prenom : str
    adresse : str
    tel : str
    cin : str
    num_permis : str

    model_config = ConfigDict(from_attributes=True)

    

# VEHICULE 

class Vehicule(BaseModel):
    id_vehicule: str = Field(..., max_length=50)
    marque: str = Field(..., max_length=50)
    modele: str = Field(..., max_length=50)
    carburant: str = Field(..., max_length=30)
    prix_par_jour: float = Field(..., gt=0)
    status: str | Optional[StatusVehiculeEnum] = "disponible"

   


class ShowVehicule(BaseModel):
    marque: str
    modele: str
    carburant: str
    prix_par_jour: float
    status: str

    model_config = ConfigDict(from_attributes=True)


# RESERVATION

class ReservationCreate(BaseModel):
    id_reservation: str = Field(..., max_length=50)
    date_debut: date
    date_fin: date
    date_reservation: Optional[date] = None
    montant_total: float = Field(..., ge=0)
    id_client: str = Field(..., max_length=50)
    id_vehicule: str = Field(..., max_length=50)
    id_user: str = Field(..., max_length=50)



class ReservationDetail(BaseModel):
    id_reservation: str
    date_debut: date
    date_fin: date
    date_reservation: Optional[date]
    montant_total: float
    client: ShowClient
    vehicule: ShowVehicule
    utilisateur: ShowUtilisateur 

    # Indispensable pour que Pydantic puisse lire les objets SQLAlchemy
    model_config = ConfigDict(from_attributes=True)

# PAIEMENT 

class PaiementCreate(BaseModel):
    id_paiement: str = Field(..., max_length=50)
    mode_paiement: Optional[ModePaiementEnum] = ModePaiementEnum.carte
    id_reservation: str = Field(..., max_length=50)


class ShowPaiement(BaseModel):
    mode_paiement : str
    reservation : ReservationDetail



#  RETOUR 

class RetourCreate(BaseModel):
    id_retour: str = Field(..., max_length=50)
    date_retour: date
    etat_voiture: EtatVehiculeEnum
    frais_supplementaire: Optional[float] = Field(0, ge=0)
    id_reservation: str = Field(..., max_length=50)


class ShowRetour (BaseModel):
    date_retour : date
    etat_vehicule : EtatVehiculeEnum
    frais_supplementaire : float
    reservation : ReservationDetail
    model_config = ConfigDict(from_attributes=True)


