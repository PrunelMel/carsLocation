#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

PYTHON=$(command -v python3 || command -v python)
if [[ -z "$PYTHON" ]]; then
  echo "Python n'est pas installé ou introuvable. Installez python3 ou python et réessayez."
  exit 1
fi

echo "Remplissage de la base de données..."
"$PYTHON" - <<'PY'
from uuid import uuid4
from datetime import date, timedelta
from database import engine, SessionLocal
import models
from hashing import hash_password

models.Base.metadata.create_all(engine)

session = SessionLocal()
try:
    session.query(models.Retour).delete()
    session.query(models.Paiement).delete()
    session.query(models.Reservation).delete()
    session.query(models.Vehicule).delete()
    session.query(models.Client).delete()
    session.query(models.Utilisateur).delete()
    session.commit()

    admins = [
        models.Utilisateur(
          
            nom='Admin',
            prenom='Un',
            mot_de_passe=hash_password('Admin123!'),
            role='admin',
            email='admin1@example.com',
        ),
        models.Utilisateur(
            nom='Admin',
            prenom='Deux',
            mot_de_passe=hash_password('Admin123!'),
            role='admin',
            email='admin2@example.com',
        ),
    ]

    agents = [
        models.Utilisateur(
            nom='Agent',
            prenom='Un',
            mot_de_passe=hash_password('Agent123!'),
            role='agent',
            id_admin='admin1',
            email='agent1@example.com',
        ),
        models.Utilisateur(
            nom='Agent',
            prenom='Deux',
            mot_de_passe=hash_password('Agent123!'),
            role='agent',
            id_admin='admin1',
            email='agent2@example.com',
        ),
        models.Utilisateur(
            nom='Agent',
            prenom='Trois',
            mot_de_passe=hash_password('Agent123!'),
            role='agent',
            id_admin='admin2',
            email='agent3@example.com',
        ),
    ]

    clients = []
    for i in range(1, 6):
        clients.append(models.Client(
            mot_de_passe=hash_password(f'Client{i}123!'),
            nom=f'Client{i}',
            prenom='Test',
            adresse=f'Adresse {i} rue Exemple',
            tel=f'061234560{i}',
            cin=f'CIN000{i}',
            num_permis=f'PERM{i:03d}',
            email=f'client{i}@example.com',
        ))

    vehicules = [
        models.Vehicule(
            marque=marque,
            modele=f'Modele{i}',
            carburant=carburant,
            prix_par_jour=50.0 + 10.0 * i,
            status='disponible',
            img=f'https://example.com/vehicule{i}.jpg',
        )
        for i, (marque, carburant) in enumerate([
            ('Toyota', 'essence'),
            ('Renault', 'diesel'),
            ('Peugeot', 'hybride'),
            ('BMW', 'essence'),
            ('Tesla', 'electrique'),
        ], start=1)
    ]

    reservations = []
    paiements = []
    retours = []

    for i in range(1, 6):
     
        debut = date.today() + timedelta(days=i)
        fin = debut + timedelta(days=3)
        montant_total = 100.0 + i * 20.0

        reservation = models.Reservation(
           
            date_debut=debut,
            date_fin=fin,
            montant_total=montant_total,
            status='en_attente',
            id_client=client_id,
            id_vehicule=vehicule_id,
            id_user=utilisateur_id,
        )
        paiement = models.Paiement(
     
            id_reservation=reservation_id,
            mode_paiement='carte',
        )
        retour = models.Retour(
            id_retour=f'retour{i}',
            date_retour=fin + timedelta(days=1),
            etat_voiture='parfait',
            frais_supplementaire=0.0,
            id_reservation=reservation_id,
        )

        reservations.append(reservation)
        paiements.append(paiement)
        retours.append(retour)

    session.add_all(admins + agents + clients + vehicules + reservations + paiements + retours)
    session.commit()

    print('Insertion terminée :')
    print(f'  admins   = {len(admins)}')
    print(f'  agents   = {len(agents)}')
    print(f'  clients  = {len(clients)}')
    print(f'  vehicules= {len(vehicules)}')
    print(f'  reservations = {len(reservations)}')
    print(f'  paiements = {len(paiements)}')
    print(f'  retours = {len(retours)}')
finally:
    session.close()
PY

echo "Base de données remplie avec succès."
