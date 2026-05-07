from sqlalchemy import Column, String, Float, Date, DateTime, Text, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from database import Base
from datetime import date, datetime


class Utilisateur(Base):
    __tablename__ = 'utilisateur'
    
    id_user = Column(String(50), primary_key=True, nullable=False)
    nom = Column(String(100), nullable=False)
    prenom = Column(String(100), nullable=False)
    mot_de_passe = Column(Text, nullable=False)
    role = Column(String(20), nullable=False)
    id_admin = Column(String(50), ForeignKey('utilisateur.id_user'), nullable=True)
    img = Column(Text, nullable=True)
    email = Column(String(100), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, onupdate=datetime.now, nullable=True)
    
    # Contrainte CHECK pour le rôle
    __table_args__ = (
        CheckConstraint("role IN ('admin', 'agent')", name='check_role'),
    )
    
    # Relations
    admin = relationship("Utilisateur", remote_side=[id_user], backref="agents")
    reservations = relationship("Reservation", back_populates="utilisateur")




class Client(Base):
    __tablename__ = 'client'
    
    id_client = Column(String(50), primary_key=True, nullable=False)
    mot_de_passe = Column(Text, nullable=False)
    nom = Column(String(100), nullable=False)
    prenom = Column(String(100), nullable=False)
    adresse = Column(Text, nullable=False)
    tel = Column(String(20), nullable=False)
    cin = Column(String(20), unique=True, nullable=False)
    num_permis = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, onupdate=datetime.now, nullable=True)
    
    # Relations
    reservations = relationship("Reservation", back_populates="client", cascade="all, delete-orphan")


class Vehicule(Base):
    __tablename__ = 'vehicule'
    
    id_vehicule = Column(String(50), primary_key=True, nullable=False)
    marque = Column(String(50), nullable=False)
    modele = Column(String(50), nullable=False)
    carburant = Column(String(30), nullable=False)
    prix_par_jour = Column(Float, nullable=False)
    status = Column(String(20), default='disponible', nullable=False)
    img = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, onupdate=datetime.now, nullable=True)
    
    # Contraintes CHECK
    __table_args__ = (
        CheckConstraint("prix_par_jour > 0", name='check_prix_positif'),
        CheckConstraint("status IN ('disponible', 'louer', 'maintenance')", name='check_status_vehicule'),
    )
    
    # Relations
    reservations = relationship("Reservation", back_populates="vehicule", cascade="all, delete-orphan")


class Reservation(Base):
    __tablename__ = 'reservation'
    
    id_reservation = Column(String(50), primary_key=True, nullable=False)
    date_debut = Column(Date, nullable=False)
    date_fin = Column(Date, nullable=False)
    date_reservation = Column(Date, default=date.today, nullable=False)
    montant_total = Column(Float, nullable=False)
    montant_final = Column(Float, nullable=True)
    status = Column(String(20), default='en_attente', nullable=False)
    id_client = Column(String(50), ForeignKey('client.id_client', ondelete='CASCADE'))
    id_vehicule = Column(String(50), ForeignKey('vehicule.id_vehicule', ondelete='CASCADE'))
    id_user = Column(String(50), ForeignKey('utilisateur.id_user'), nullable=True)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, onupdate=datetime.now, nullable=True)
    
    # Contraintes CHECK
    __table_args__ = (
        CheckConstraint("montant_total >= 0", name='check_montant_positif'),
        CheckConstraint("montant_final IS NULL OR montant_final >= 0", name='check_montant_final_positif'),
        CheckConstraint("date_fin > date_debut", name='check_dates_coherentes'),
        CheckConstraint(
            "status IN ('en_attente', 'confirmee', 'en_cours', 'terminee', 'annulee')", 
            name='check_status_reservation'
        ),
    )
    
    # Relations
    client = relationship("Client", back_populates="reservations")
    vehicule = relationship("Vehicule", back_populates="reservations")
    utilisateur = relationship("Utilisateur", back_populates="reservations")
    paiement = relationship("Paiement", back_populates="reservation", uselist=False, cascade="all, delete-orphan")
    retour = relationship("Retour", back_populates="reservation", uselist=False, cascade="all, delete-orphan")


class Paiement(Base):
    __tablename__ = 'paiement'
    
    id_paiement = Column(String(50), primary_key=True, nullable=False)
    mode_paiement = Column(String(20), default='carte', nullable=False)
    id_reservation = Column(String(50), ForeignKey('reservation.id_reservation', ondelete='CASCADE'))
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, onupdate=datetime.now, nullable=True)
    
    # Contrainte CHECK pour mode_paiement
    __table_args__ = (
        CheckConstraint("mode_paiement IN ('carte', 'espece', 'application')", name='check_mode_paiement'),
    )
    
    # Relations
    reservation = relationship("Reservation", back_populates="paiement")


class Retour(Base):
    __tablename__ = 'retour'
    
    id_retour = Column(String(50), primary_key=True, nullable=False)
    date_retour = Column(Date, nullable=False)
    etat_voiture = Column(String(50), nullable=False)
    frais_supplementaire = Column(Float, default=0, nullable=False)
    id_reservation = Column(String(50), ForeignKey('reservation.id_reservation', ondelete='CASCADE'), unique=True)
    created_at = Column(DateTime, default=datetime.now, nullable=False)
    updated_at = Column(DateTime, onupdate=datetime.now, nullable=True)
    
    # Contraintes CHECK
    __table_args__ = (
        CheckConstraint(
            "etat_voiture IN ('parfait', 'nettoyage_requis', 'dommages_mineurs', 'dommages_majeurs')", 
            name='check_etat_voiture'
        ),
        CheckConstraint("frais_supplementaire >= 0", name='check_frais_positif'),
    )
    
    # Relations
    reservation = relationship("Reservation", back_populates="retour")