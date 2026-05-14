from uuid import uuid4
from database import engine, SessionLocal
import models
from hashing import hash_password

# Créer les tables
models.Base.metadata.create_all(engine)

# Créer une session
session = SessionLocal()

try:
    # Vérifier si l'admin existe déjà
    existing_admin = session.query(models.Utilisateur).filter(
        models.Utilisateur.email == 'admin1@example.com'
    ).first()
    
    if existing_admin:
        print("L'admin existe déjà!")
    else:
        # Créer l'admin
        admin = models.Utilisateur(
            id_user=str(uuid4()),
            nom='Admin',
            prenom='Un',
            mot_de_passe=hash_password('Admin123!'),
            role='admin',
            email='admin1@example.com'
        )
        
        session.add(admin)
        session.commit()
        print("Admin créé avec succès!")
        print(f"Email: admin1@example.com")
        print(f"Mot de passe: Admin123!")
        
finally:
    session.close()
