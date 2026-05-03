from fastapi import FastAPI
import models
from database import engine
from routers import users, clients,vehicules,reservations,retour,paiement


# Crée les tables une seule fois au démarrage
models.Base.metadata.create_all(engine)

app = FastAPI()

# Inclusion des routeurs
app.include_router(users.router)
app.include_router(clients.router)
app.include_router(vehicules.router)
app.include_router(reservations.router)
app.include_router(retour.router)
app.include_router(paiement.router)