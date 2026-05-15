#!/bin/bash

# Script de peuplement de la base de données - Système de location de voitures
# Utilisation: ./populate_db.sh [URL_API]
# Exemple: ./populate_db.sh http://localhost:8000

set -e  # Arrêter en cas d'erreur

# Configuration
API_URL="${1:-http://localhost:3000}"
echo "🚀 Peuplement de la base de données via l'API: $API_URL"
echo "================================================"

# Vérifier que jq est installé
if ! command -v jq &> /dev/null; then
    echo "❌ Erreur: jq n'est pas installé. Installez-le avec: sudo apt install jq"
    exit 1
fi

# Couleurs pour l'affichage
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour extraire l'ID de la réponse JSON
extract_id() {
    local response="$1"
    local key="$2"
    echo "$response" | jq -r ".$key"
}

# ============================================
# 1. CRÉATION DES UTILISATEURS (Admins puis Agents)
# ============================================
echo -e "\n${BLUE}📋 Étape 1/6 : Création des utilisateurs${NC}"

# Admin 1 - Directeur général
echo "  → Création de l'admin Youssef Benjelloun..."
ADMIN1=$(curl -s -X POST "$API_URL/api/users/" \
    -H "Content-Type: application/json" \
    -d '{
        "nom": "Benjelloun",
        "prenom": "Youssef",
        "mot_de_passe": "Admin@2024",
        "email": "y.benjelloun@locationauto.ma",
        "role": "admin",
        "id_admin": null
    }')
ID_ADMIN1=$(extract_id "$ADMIN1" "id_user")
echo -e "  ${GREEN}✓${NC} Admin créé: $ID_ADMIN1"

# Admin 2 - Responsable succursale
echo "  → Création de l'admin Fatima Alaoui..."
ADMIN2=$(curl -s -X POST "$API_URL/api/users/" \
    -H "Content-Type: application/json" \
    -d '{
        "nom": "Alaoui",
        "prenom": "Fatima",
        "mot_de_passe": "Admin@2024",
        "email": "f.alaoui@locationauto.ma",
        "role": "admin",
        "id_admin": null
    }')
ID_ADMIN2=$(extract_id "$ADMIN2" "id_user")
echo -e "  ${GREEN}✓${NC} Admin créé: $ID_ADMIN2"

# Agent 1 - sous admin1
echo "  → Création de l'agent Mehdi Tazi..."
AGENT1=$(curl -s -X POST "$API_URL/api/users/" \
    -H "Content-Type: application/json" \
    -d "{
        \"nom\": \"Tazi\",
        \"prenom\": \"Mehdi\",
        \"mot_de_passe\": \"Agent@2024\",
        \"email\": \"m.tazi@locationauto.ma\",
        \"role\": \"agent\",
        \"id_admin\": \"$ID_ADMIN1\"
    }")
ID_AGENT1=$(extract_id "$AGENT1" "id_user")
echo -e "  ${GREEN}✓${NC} Agent créé: $ID_AGENT1"

# Agent 2 - sous admin1
echo "  → Création de l'agent Zineb Berrada..."
AGENT2=$(curl -s -X POST "$API_URL/api/users/" \
    -H "Content-Type: application/json" \
    -d "{
        \"nom\": \"Berrada\",
        \"prenom\": \"Zineb\",
        \"mot_de_passe\": \"Agent@2024\",
        \"email\": \"z.berrada@locationauto.ma\",
        \"role\": \"agent\",
        \"id_admin\": \"$ID_ADMIN1\"
    }")
ID_AGENT2=$(extract_id "$AGENT2" "id_user")
echo -e "  ${GREEN}✓${NC} Agent créé: $ID_AGENT2"

# Agent 3 - sous admin2
echo "  → Création de l'agent Karim Idrissi..."
AGENT3=$(curl -s -X POST "$API_URL/api/users/" \
    -H "Content-Type: application/json" \
    -d "{
        \"nom\": \"Idrissi\",
        \"prenom\": \"Karim\",
        \"mot_de_passe\": \"Agent@2024\",
        \"email\": \"k.idrissi@locationauto.ma\",
        \"role\": \"agent\",
        \"id_admin\": \"$ID_ADMIN2\"
    }")
ID_AGENT3=$(extract_id "$AGENT3" "id_user")
echo -e "  ${GREEN}✓${NC} Agent créé: $ID_AGENT3"

# ============================================
# 2. CRÉATION DES CLIENTS
# ============================================
echo -e "\n${BLUE}📋 Étape 2/6 : Création des clients${NC}"

# Client 1
echo "  → Création du client Amine Chakir..."
CLIENT1=$(curl -s -X POST "$API_URL/api/clients/" \
    -H "Content-Type: application/json" \
    -d '{
        "nom": "Chakir",
        "prenom": "Amine",
        "mot_de_passe": "Client@2024",
        "adresse": "Résidence Al Majd, Boulevard Zerktouni, Casablanca",
        "tel": "+212661234567",
        "email": "amine.chakir@gmail.com",
        "cin": "BK458721",
        "num_permis": "P1547823"
    }')
ID_CLIENT1=$(extract_id "$CLIENT1" "id_client")
echo -e "  ${GREEN}✓${NC} Client créé: $ID_CLIENT1"

# Client 2
echo "  → Création du client Sara Bennani..."
CLIENT2=$(curl -s -X POST "$API_URL/api/clients/" \
    -H "Content-Type: application/json" \
    -d '{
        "nom": "Bennani",
        "prenom": "Sara",
        "mot_de_passe": "Client@2024",
        "adresse": "Immeuble Anfa Place, Boulevard Anfa, Casablanca",
        "tel": "+212662345678",
        "email": "sara.bennani@yahoo.com",
        "cin": "CD892341",
        "num_permis": "P2891456"
    }')
ID_CLIENT2=$(extract_id "$CLIENT2" "id_client")
echo -e "  ${GREEN}✓${NC} Client créé: $ID_CLIENT2"

# Client 3
echo "  → Création du client Omar Fassi..."
CLIENT3=$(curl -s -X POST "$API_URL/api/clients/" \
    -H "Content-Type: application/json" \
    -d '{
        "nom": "Fassi",
        "prenom": "Omar",
        "mot_de_passe": "Client@2024",
        "adresse": "Villa 45, Quartier Californie, Casablanca",
        "tel": "+212663456789",
        "email": "omar.fassi@outlook.com",
        "cin": "AB123987",
        "num_permis": "P3456789"
    }')
ID_CLIENT3=$(extract_id "$CLIENT3" "id_client")
echo -e "  ${GREEN}✓${NC} Client créé: $ID_CLIENT3"

# Client 4
echo "  → Création du client Nadia Sefrioui..."
CLIENT4=$(curl -s -X POST "$API_URL/api/clients/" \
    -H "Content-Type: application/json" \
    -d '{
        "nom": "Sefrioui",
        "prenom": "Nadia",
        "mot_de_passe": "Client@2024",
        "adresse": "Résidence Les Jardins, Maarif, Casablanca",
        "tel": "+212664567890",
        "email": "nadia.sefrioui@gmail.com",
        "cin": "EF567234",
        "num_permis": "P4567890"
    }')
ID_CLIENT4=$(extract_id "$CLIENT4" "id_client")
echo -e "  ${GREEN}✓${NC} Client créé: $ID_CLIENT4"

# Client 5
echo "  → Création du client Yassine Lahlou..."
CLIENT5=$(curl -s -X POST "$API_URL/api/clients/" \
    -H "Content-Type: application/json" \
    -d '{
        "nom": "Lahlou",
        "prenom": "Yassine",
        "mot_de_passe": "Client@2024",
        "adresse": "Appartement 12, Sidi Maarouf, Casablanca",
        "tel": "+212665678901",
        "email": "yassine.lahlou@hotmail.com",
        "cin": "GH789456",
        "num_permis": "P5678901"
    }')
ID_CLIENT5=$(extract_id "$CLIENT5" "id_client")
echo -e "  ${GREEN}✓${NC} Client créé: $ID_CLIENT5"

# ============================================
# 3. CRÉATION DES VÉHICULES
# ============================================
echo -e "\n${BLUE}📋 Étape 3/6 : Création des véhicules${NC}"

# Véhicule 1 - Dacia Logan
echo "  → Création du véhicule Dacia Logan..."
VEHICULE1=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Dacia",
        "modele": "Logan",
        "carburant": "Diesel",
        "prix_par_jour": 250.0,
        "status": "disponible",
        "img": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=80"
    }')
ID_VEHICULE1=$(extract_id "$VEHICULE1" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE1"

# Véhicule 2 - Renault Clio
echo "  → Création du véhicule Renault Clio..."
VEHICULE2=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Renault",
        "modele": "Clio 5",
        "carburant": "Essence",
        "prix_par_jour": 350.0,
        "status": "disponible",
        "img": "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800"
    }')
ID_VEHICULE2=$(extract_id "$VEHICULE2" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE2"

# Véhicule 3 - Peugeot 208
echo "  → Création du véhicule Peugeot 208..."
VEHICULE3=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Peugeot",
        "modele": "208",
        "carburant": "Diesel",
        "prix_par_jour": 380.0,
        "status": "louer",
        "img": "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop&q=80"
    }')
ID_VEHICULE3=$(extract_id "$VEHICULE3" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE3"

# Véhicule 4 - Hyundai Tucson
echo "  → Création du véhicule Hyundai Tucson..."
VEHICULE4=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Hyundai",
        "modele": "Tucson",
        "carburant": "Diesel",
        "prix_par_jour": 550.0,
        "status": "disponible",
        "img": "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=800"
    }')
ID_VEHICULE4=$(extract_id "$VEHICULE4" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE4"

# Véhicule 5 - Toyota Corolla
echo "  → Création du véhicule Toyota Corolla..."
VEHICULE5=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Toyota",
        "modele": "Corolla",
        "carburant": "Hybride",
        "prix_par_jour": 450.0,
        "status": "maintenance",
        "img": "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800"
    }')
ID_VEHICULE5=$(extract_id "$VEHICULE5" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE5"

# ── Véhicules supplémentaires : Essence ──────────────────────────────────────

# Véhicule 6 - Peugeot 208 Essence
echo "  → Création du véhicule Peugeot 208 Essence..."
VEHICULE6=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Peugeot",
        "modele": "208",
        "carburant": "Essence",
        "prix_par_jour": 360.0,
        "status": "disponible",
        "img": "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&auto=format&fit=crop&q=80"
    }')
ID_VEHICULE6=$(extract_id "$VEHICULE6" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE6"

# Véhicule 7 - Dacia Sandero Essence
echo "  → Création du véhicule Dacia Sandero Essence..."
VEHICULE7=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Dacia",
        "modele": "Sandero",
        "carburant": "Essence",
        "prix_par_jour": 280.0,
        "status": "disponible",
        "img": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80"
    }')
ID_VEHICULE7=$(extract_id "$VEHICULE7" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE7"

# ── Véhicules supplémentaires : Diesel ───────────────────────────────────────

# Véhicule 8 - Volkswagen Golf Diesel
echo "  → Création du véhicule Volkswagen Golf Diesel..."
VEHICULE8=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Volkswagen",
        "modele": "Golf",
        "carburant": "Diesel",
        "prix_par_jour": 420.0,
        "status": "disponible",
        "img": "https://images.unsplash.com/photo-1530675706010-bc677ce30ab6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }')
ID_VEHICULE8=$(extract_id "$VEHICULE8" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE8"

# Véhicule 9 - Renault Kadjar Diesel
echo "  → Création du véhicule Renault Kadjar Diesel..."
VEHICULE9=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Renault",
        "modele": "Kadjar",
        "carburant": "Diesel",
        "prix_par_jour": 480.0,
        "status": "disponible",
        "img": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80"
    }')
ID_VEHICULE9=$(extract_id "$VEHICULE9" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE9"

# ── Véhicules supplémentaires : Électrique ───────────────────────────────────

# Véhicule 10 - Renault Zoé Électrique
echo "  → Création du véhicule Renault Zoé Électrique..."
VEHICULE10=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Renault",
        "modele": "Zoé",
        "carburant": "Électrique",
        "prix_par_jour": 390.0,
        "status": "disponible",
        "img": "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80"
    }')
ID_VEHICULE10=$(extract_id "$VEHICULE10" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE10"

# Véhicule 11 - Nissan Leaf Électrique
echo "  → Création du véhicule Nissan Leaf Électrique..."
VEHICULE11=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Nissan",
        "modele": "Leaf",
        "carburant": "Électrique",
        "prix_par_jour": 430.0,
        "status": "disponible",
        "img": "https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800"
    }')
ID_VEHICULE11=$(extract_id "$VEHICULE11" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE11"

# ── Véhicules supplémentaires : Hybride ──────────────────────────────────────

# Véhicule 12 - Toyota Yaris Cross Hybride
echo "  → Création du véhicule Toyota Yaris Cross Hybride..."
VEHICULE12=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Toyota",
        "modele": "Yaris Cross",
        "carburant": "Hybride",
        "prix_par_jour": 500.0,
        "status": "disponible",
        "img": "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&auto=format&fit=crop&q=80"
    }')
ID_VEHICULE12=$(extract_id "$VEHICULE12" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE12"

# Véhicule 13 - Renault Clio E-Tech Hybride
echo "  → Création du véhicule Renault Clio E-Tech Hybride..."
VEHICULE13=$(curl -s -X POST "$API_URL/api/vehicules/" \
    -H "Content-Type: application/json" \
    -d '{
        "marque": "Renault",
        "modele": "Clio E-Tech",
        "carburant": "Hybride",
        "prix_par_jour": 400.0,
        "status": "disponible",
        "img": "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop&q=80"
    }')
ID_VEHICULE13=$(extract_id "$VEHICULE13" "id_vehicule")
echo -e "  ${GREEN}✓${NC} Véhicule créé: $ID_VEHICULE13"

# ============================================
# 4. CRÉATION DES RÉSERVATIONS
# ============================================
echo -e "\n${BLUE}📋 Étape 4/6 : Création des réservations${NC}"

# Réservation 1 - Client1 + Vehicule1 + Agent1
echo "  → Création de la réservation 1..."
RESERVATION1=$(curl -s -X POST "$API_URL/api/reservations/" \
    -H "Content-Type: application/json" \
    -d "{
        \"date_debut\": \"2025-05-15\",
        \"date_fin\": \"2025-05-20\",
        \"date_reservation\": \"2025-05-10\",
        \"montant_total\": 1250.0,
        \"status\": \"confirmee\",
        \"id_client\": \"$ID_CLIENT1\",
        \"id_vehicule\": \"$ID_VEHICULE1\",
        \"id_user\": \"$ID_AGENT1\"
    }")
ID_RESERVATION1=$(extract_id "$RESERVATION1" "id_reservation")
echo -e "  ${GREEN}✓${NC} Réservation créée: $ID_RESERVATION1"

# Réservation 2 - Client2 + Vehicule2 + Agent1
echo "  → Création de la réservation 2..."
RESERVATION2=$(curl -s -X POST "$API_URL/api/reservations/" \
    -H "Content-Type: application/json" \
    -d "{
        \"date_debut\": \"2025-05-18\",
        \"date_fin\": \"2025-05-25\",
        \"date_reservation\": \"2025-05-12\",
        \"montant_total\": 2450.0,
        \"status\": \"en_cours\",
        \"id_client\": \"$ID_CLIENT2\",
        \"id_vehicule\": \"$ID_VEHICULE2\",
        \"id_user\": \"$ID_AGENT1\"
    }")
ID_RESERVATION2=$(extract_id "$RESERVATION2" "id_reservation")
echo -e "  ${GREEN}✓${NC} Réservation créée: $ID_RESERVATION2"

# Réservation 3 - Client3 + Vehicule3 + Agent2
echo "  → Création de la réservation 3..."
RESERVATION3=$(curl -s -X POST "$API_URL/api/reservations/" \
    -H "Content-Type: application/json" \
    -d "{
        \"date_debut\": \"2025-05-05\",
        \"date_fin\": \"2025-05-12\",
        \"date_reservation\": \"2025-05-01\",
        \"montant_total\": 2660.0,
        \"status\": \"terminee\",
        \"id_client\": \"$ID_CLIENT3\",
        \"id_vehicule\": \"$ID_VEHICULE3\",
        \"id_user\": \"$ID_AGENT2\"
    }")
ID_RESERVATION3=$(extract_id "$RESERVATION3" "id_reservation")
echo -e "  ${GREEN}✓${NC} Réservation créée: $ID_RESERVATION3"

# Réservation 4 - Client4 + Vehicule4 + Agent2
echo "  → Création de la réservation 4..."
RESERVATION4=$(curl -s -X POST "$API_URL/api/reservations/" \
    -H "Content-Type: application/json" \
    -d "{
        \"date_debut\": \"2025-06-01\",
        \"date_fin\": \"2025-06-10\",
        \"date_reservation\": \"2025-05-20\",
        \"montant_total\": 4950.0,
        \"status\": \"en_attente\",
        \"id_client\": \"$ID_CLIENT4\",
        \"id_vehicule\": \"$ID_VEHICULE4\",
        \"id_user\": \"$ID_AGENT2\"
    }")
ID_RESERVATION4=$(extract_id "$RESERVATION4" "id_reservation")
echo -e "  ${GREEN}✓${NC} Réservation créée: $ID_RESERVATION4"

# Réservation 5 - Client5 + Vehicule5 + Agent3
echo "  → Création de la réservation 5..."
RESERVATION5=$(curl -s -X POST "$API_URL/api/reservations/" \
    -H "Content-Type: application/json" \
    -d "{
        \"date_debut\": \"2025-05-22\",
        \"date_fin\": \"2025-05-28\",
        \"date_reservation\": \"2025-05-15\",
        \"montant_total\": 2700.0,
        \"status\": \"annulee\",
        \"id_client\": \"$ID_CLIENT5\",
        \"id_vehicule\": \"$ID_VEHICULE5\",
        \"id_user\": \"$ID_AGENT3\"
    }")
ID_RESERVATION5=$(extract_id "$RESERVATION5" "id_reservation")
echo -e "  ${GREEN}✓${NC} Réservation créée: $ID_RESERVATION5"

# ============================================
# 5. CRÉATION DES PAIEMENTS
# ============================================
echo -e "\n${BLUE}📋 Étape 5/6 : Création des paiements${NC}"

# Paiement 1 - Reservation1 - Carte bancaire
echo "  → Création du paiement 1..."
PAIEMENT1=$(curl -s -X POST "$API_URL/api/paiements/" \
    -H "Content-Type: application/json" \
    -d "{
        \"mode_paiement\": \"carte\",
        \"id_reservation\": \"$ID_RESERVATION1\"
    }")
ID_PAIEMENT1=$(extract_id "$PAIEMENT1" "id_paiement")
echo -e "  ${GREEN}✓${NC} Paiement créé: $ID_PAIEMENT1"

# Paiement 2 - Reservation2 - Application
echo "  → Création du paiement 2..."
PAIEMENT2=$(curl -s -X POST "$API_URL/api/paiements/" \
    -H "Content-Type: application/json" \
    -d "{
        \"mode_paiement\": \"application\",
        \"id_reservation\": \"$ID_RESERVATION2\"
    }")
ID_PAIEMENT2=$(extract_id "$PAIEMENT2" "id_paiement")
echo -e "  ${GREEN}✓${NC} Paiement créé: $ID_PAIEMENT2"

# Paiement 3 - Reservation3 - Espèces
echo "  → Création du paiement 3..."
PAIEMENT3=$(curl -s -X POST "$API_URL/api/paiements/" \
    -H "Content-Type: application/json" \
    -d "{
        \"mode_paiement\": \"espece\",
        \"id_reservation\": \"$ID_RESERVATION3\"
    }")
ID_PAIEMENT3=$(extract_id "$PAIEMENT3" "id_paiement")
echo -e "  ${GREEN}✓${NC} Paiement créé: $ID_PAIEMENT3"

# Paiement 4 - Reservation4 - Carte bancaire
echo "  → Création du paiement 4..."
PAIEMENT4=$(curl -s -X POST "$API_URL/api/paiements/" \
    -H "Content-Type: application/json" \
    -d "{
        \"mode_paiement\": \"carte\",
        \"id_reservation\": \"$ID_RESERVATION4\"
    }")
ID_PAIEMENT4=$(extract_id "$PAIEMENT4" "id_paiement")
echo -e "  ${GREEN}✓${NC} Paiement créé: $ID_PAIEMENT4"

# Paiement 5 - Reservation5 - Application
echo "  → Création du paiement 5..."
PAIEMENT5=$(curl -s -X POST "$API_URL/api/paiements/" \
    -H "Content-Type: application/json" \
    -d "{
        \"mode_paiement\": \"application\",
        \"id_reservation\": \"$ID_RESERVATION5\"
    }")
ID_PAIEMENT5=$(extract_id "$PAIEMENT5" "id_paiement")
echo -e "  ${GREEN}✓${NC} Paiement créé: $ID_PAIEMENT5"

# ============================================
# 6. CRÉATION DES RETOURS
# ============================================
echo -e "\n${BLUE}📋 Étape 6/6 : Création des retours${NC}"

# Retour 1 - Reservation1 - État parfait
echo "  → Création du retour 1..."
RETOUR1=$(curl -s -X POST "$API_URL/api/retours/" \
    -H "Content-Type: application/json" \
    -d "{
        \"date_retour\": \"2025-05-20\",
        \"etat_voiture\": \"parfait\",
        \"frais_supplementaire\": 0.0,
        \"id_reservation\": \"$ID_RESERVATION1\"
    }")
ID_RETOUR1=$(extract_id "$RETOUR1" "id_retour")
echo -e "  ${GREEN}✓${NC} Retour créé: $ID_RETOUR1"

# Retour 2 - Reservation2 - Nettoyage requis
echo "  → Création du retour 2..."
RETOUR2=$(curl -s -X POST "$API_URL/api/retours/" \
    -H "Content-Type: application/json" \
    -d "{
        \"date_retour\": \"2025-05-25\",
        \"etat_voiture\": \"nettoyage_requis\",
        \"frais_supplementaire\": 150.0,
        \"id_reservation\": \"$ID_RESERVATION2\"
    }")
ID_RETOUR2=$(extract_id "$RETOUR2" "id_retour")
echo -e "  ${GREEN}✓${NC} Retour créé: $ID_RETOUR2"

# Retour 3 - Reservation3 - Dommages mineurs
echo "  → Création du retour 3..."
RETOUR3=$(curl -s -X POST "$API_URL/api/retours/" \
    -H "Content-Type: application/json" \
    -d "{
        \"date_retour\": \"2025-05-12\",
        \"etat_voiture\": \"dommages_mineurs\",
        \"frais_supplementaire\": 500.0,
        \"id_reservation\": \"$ID_RESERVATION3\"
    }")
ID_RETOUR3=$(extract_id "$RETOUR3" "id_retour")
echo -e "  ${GREEN}✓${NC} Retour créé: $ID_RETOUR3"

# Retour 4 - Reservation4 - État parfait
echo "  → Création du retour 4..."
RETOUR4=$(curl -s -X POST "$API_URL/api/retours/" \
    -H "Content-Type: application/json" \
    -d "{
        \"date_retour\": \"2025-06-10\",
        \"etat_voiture\": \"parfait\",
        \"frais_supplementaire\": 0.0,
        \"id_reservation\": \"$ID_RESERVATION4\"
    }")
ID_RETOUR4=$(extract_id "$RETOUR4" "id_retour")
echo -e "  ${GREEN}✓${NC} Retour créé: $ID_RETOUR4"

# Retour 5 - Reservation5 - Dommages majeurs
echo "  → Création du retour 5..."
RETOUR5=$(curl -s -X POST "$API_URL/api/retours/" \
    -H "Content-Type: application/json" \
    -d "{
        \"date_retour\": \"2025-05-28\",
        \"etat_voiture\": \"dommages_majeurs\",
        \"frais_supplementaire\": 2500.0,
        \"id_reservation\": \"$ID_RESERVATION5\"
    }")
ID_RETOUR5=$(extract_id "$RETOUR5" "id_retour")
echo -e "  ${GREEN}✓${NC} Retour créé: $ID_RETOUR5"

# ============================================
# RÉSUMÉ
# ============================================
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Peuplement terminé avec succès !${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "📊 Résumé des enregistrements créés :"
echo "  • Utilisateurs : 5 (2 admins + 3 agents)"
echo "  • Clients : 5"
echo "  • Véhicules : 13"
echo "    - Essence    : 3  (Renault Clio 5, Peugeot 208, Dacia Sandero)"
echo "    - Diesel     : 4  (Dacia Logan, Peugeot 208, Volkswagen Golf, Renault Kadjar)"
echo "    - Électrique : 2  (Renault Zoé, Nissan Leaf)"
echo "    - Hybride    : 3  (Toyota Corolla, Toyota Yaris Cross, Renault Clio E-Tech)"
echo "  • Réservations : 5"
echo "  • Paiements : 5"
echo "  • Retours : 5"
echo ""
echo "🔐 Identifiants de connexion :"
echo ""
echo "  Admin 1:"
echo "    Email: y.benjelloun@locationauto.ma"
echo "    Mot de passe: Admin@2024"
echo ""
echo "  Admin 2:"
echo "    Email: f.alaoui@locationauto.ma"
echo "    Mot de passe: Admin@2024"
echo ""
echo "  Agent 1:"
echo "    Email: m.tazi@locationauto.ma"
echo "    Mot de passe: Agent@2024"
echo ""
echo "  Client 1:"
echo "    Email: amine.chakir@gmail.com"
echo "    Mot de passe: Client@2024"
echo ""
echo "💡 Pour tester l'API, utilisez:"
echo "  curl $API_URL/api/users/"
echo "  curl $API_URL/api/clients/"
echo "  curl $API_URL/api/vehicules/"
echo ""