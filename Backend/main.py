from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import users, clients,vehicules,reservations,retour,paiement, login


# Crée les tables une seule fois au démarrage
models.Base.metadata.create_all(engine)

app = FastAPI()


#Cors pour la connexion depuis le front


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routeurs
app.include_router(users.router)
app.include_router(clients.router)
app.include_router(vehicules.router)
app.include_router(reservations.router)
app.include_router(retour.router)
app.include_router(paiement.router)
app.include_router(login.router)