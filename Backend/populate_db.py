from database import SessionLocal, engine
from models import Utilisateur, Client, Vehicule, Reservation
from hashing import hash_password
from datetime import date, datetime

# Créer une session
db = SessionLocal()

try:
    # Créer des utilisateurs (admin et agent)
    admin = Utilisateur(
        id_user="ADMIN_01",
        nom="Mansouri",
        prenom="Yasmine",
        mot_de_passe=hash_password("Hash_Yash2026"),
        role="admin",
        email="y.mansouri@agence.ma"
    )

    agent = Utilisateur(
        id_user="AGENT_01",
        nom="Dupont",
        prenom="Jean",
        mot_de_passe=hash_password("agent123"),
        role="agent",
        id_admin="ADMIN_01",
        email="j.dupont@agence.ma"
    )

    db.add(admin)
    db.add(agent)

    # Créer des clients
    client1 = Client(
        id_client="CLIENT_01",
        mot_de_passe=hash_password("client123"),
        nom="Martin",
        prenom="Alice",
        adresse="123 Rue de la Paix, Paris",
        tel="0123456789",
        cin="AB123456",
        num_permis="P123456789",
        email="a.martin@email.com"
    )

    client2 = Client(
        id_client="CLIENT_02",
        mot_de_passe=hash_password("client456"),
        nom="Dubois",
        prenom="Pierre",
        adresse="456 Avenue des Champs, Lyon",
        tel="0987654321",
        cin="CD789012",
        num_permis="P987654321",
        email="p.dubois@email.com"
    )

    db.add(client1)
    db.add(client2)

    # Créer des véhicules
    vehicule1 = Vehicule(
        id_vehicule="VEH_001",
        marque="Renault",
        modele="Clio",
        carburant="Essence",
        prix_par_jour=50.0,
        status="disponible"
    )

    vehicule2 = Vehicule(
        id_vehicule="VEH_002",
        marque="Peugeot",
        modele="208",
        carburant="Diesel",
        prix_par_jour=60.0,
        status="disponible"
    )

    vehicule3 = Vehicule(
        id_vehicule="VEH_003",
        marque="Tesla",
        modele="Model 3",
        carburant="Electrique",
        prix_par_jour=100.0,
        status="maintenance"
    )

    db.add(vehicule1)
    db.add(vehicule2)
    db.add(vehicule3)

    # Créer des réservations
    reservation1 = Reservation(
        id_reservation="RES_001",
        date_debut=date(2026, 5, 15),
        date_fin=date(2026, 5, 20),
        montant_total=250.0,
        status="confirmee",
        id_client="CLIENT_01",
        id_vehicule="VEH_001",
        id_user="AGENT_01"
    )

    reservation2 = Reservation(
        id_reservation="RES_002",
        date_debut=date(2026, 5, 18),
        date_fin=date(2026, 5, 22),
        montant_total=240.0,
        status="en_attente",
        id_client="CLIENT_02",
        id_vehicule="VEH_002",
        id_user="AGENT_01"
    )

    db.add(reservation1)
    db.add(reservation2)

    # Commiter les changements
    db.commit()
    print("Base de données peuplée avec succès !")

except Exception as e:
    db.rollback()
    print(f"Erreur lors du peuplement de la base de données : {e}")

finally:
    db.close()