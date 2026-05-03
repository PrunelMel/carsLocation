#!/bin/bash

# Script pour peupler la base de données de l'agence de location de voiture
# À exécuter avec : bash requetes_api.sh

BASE_URL="http://localhost:3000/api"

echo "================================================"
echo "   CRÉATION DES DONNÉES DE L'AGENCE"
echo "================================================"

# ============================================
# 1. CRÉATION DES ADMINS
# ============================================
echo -e "\n[1/7] Création des admins..."

curl -X POST "$BASE_URL/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_user": "admin001",
    "nom": "Alami",
    "prenom": "Mohammed",
    "mot_de_passe": "Admin@2024!",
    "role": "admin",
    "id_admin": null
  }'

echo ""

curl -X POST "$BASE_URL/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_user": "admin002",
    "nom": "Bennani",
    "prenom": "Fatima",
    "mot_de_passe": "SecureAdmin123",
    "role": "admin",
    "id_admin": null
  }'

echo -e "\n✅ 2 admins créés"

# ============================================
# 2. CRÉATION DES AGENTS
# ============================================
echo -e "\n[2/7] Création des agents..."

curl -X POST "$BASE_URL/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_user": "agent001",
    "nom": "Idrissi",
    "prenom": "Youssef",
    "mot_de_passe": "Agent@Pass1",
    "role": "agent",
    "id_admin": "admin001"
  }'

echo ""

curl -X POST "$BASE_URL/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_user": "agent002",
    "nom": "Chakir",
    "prenom": "Amina",
    "mot_de_passe": "Agent@Pass2",
    "role": "agent",
    "id_admin": "admin001"
  }'

echo ""

curl -X POST "$BASE_URL/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_user": "agent003",
    "nom": "El Fassi",
    "prenom": "Karim",
    "mot_de_passe": "Agent@Pass3",
    "role": "agent",
    "id_admin": "admin002"
  }'

echo -e "\n✅ 3 agents créés"

# ============================================
# 3. CRÉATION DES CLIENTS
# ============================================
echo -e "\n[3/7] Création des clients..."

curl -X POST "$BASE_URL/clients/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_client": "client001",
    "nom": "Tazi",
    "prenom": "Hassan",
    "mot_de_passe": "Client@123",
    "adresse": "45 Rue Mohamed V, Casablanca",
    "tel": "+212661234567",
    "cin": "AB123456",
    "num_permis": "P123456789"
  }'

echo ""

curl -X POST "$BASE_URL/clients/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_client": "client002",
    "nom": "Ouazzani",
    "prenom": "Salma",
    "mot_de_passe": "Client@456",
    "adresse": "12 Boulevard Zerktouni, Casablanca",
    "tel": "+212662345678",
    "cin": "CD234567",
    "num_permis": "P234567890"
  }'

echo ""

curl -X POST "$BASE_URL/clients/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_client": "client003",
    "nom": "Benjelloun",
    "prenom": "Omar",
    "mot_de_passe": "Client@789",
    "adresse": "78 Avenue Hassan II, Rabat",
    "tel": "+212663456789",
    "cin": "EF345678",
    "num_permis": "P345678901"
  }'

echo ""

curl -X POST "$BASE_URL/clients/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_client": "client004",
    "nom": "Lahlou",
    "prenom": "Zineb",
    "mot_de_passe": "Client@101",
    "adresse": "23 Rue de la Liberté, Marrakech",
    "tel": "+212664567890",
    "cin": "GH456789",
    "num_permis": "P456789012"
  }'

echo ""

curl -X POST "$BASE_URL/clients/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_client": "client005",
    "nom": "Sebti",
    "prenom": "Rachid",
    "mot_de_passe": "Client@202",
    "adresse": "56 Avenue Mohammed VI, Tanger",
    "tel": "+212665678901",
    "cin": "IJ567890",
    "num_permis": "P567890123"
  }'

echo -e "\n✅ 5 clients créés"

# ============================================
# 4. CRÉATION DES VÉHICULES
# ============================================
echo -e "\n[4/7] Création des véhicules..."

curl -X POST "$BASE_URL/vehicules/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_vehicule": "VH001",
    "marque": "Dacia",
    "modele": "Logan",
    "carburant": "Diesel",
    "prix_par_jour": 250.0,
    "status": "disponible"
  }'

echo ""

curl -X POST "$BASE_URL/vehicules/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_vehicule": "VH002",
    "marque": "Renault",
    "modele": "Clio",
    "carburant": "Essence",
    "prix_par_jour": 300.0,
    "status": "disponible"
  }'

echo ""

curl -X POST "$BASE_URL/vehicules/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_vehicule": "VH003",
    "marque": "Peugeot",
    "modele": "208",
    "carburant": "Essence",
    "prix_par_jour": 320.0,
    "status": "disponible"
  }'

echo ""

curl -X POST "$BASE_URL/vehicules/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_vehicule": "VH004",
    "marque": "Hyundai",
    "modele": "Tucson",
    "carburant": "Diesel",
    "prix_par_jour": 450.0,
    "status": "disponible"
  }'

echo ""

curl -X POST "$BASE_URL/vehicules/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_vehicule": "VH005",
    "marque": "Toyota",
    "modele": "Corolla",
    "carburant": "Hybride",
    "prix_par_jour": 400.0,
    "status": "disponible"
  }'

echo ""

curl -X POST "$BASE_URL/vehicules/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_vehicule": "VH006",
    "marque": "Volkswagen",
    "modele": "Golf",
    "carburant": "Diesel",
    "prix_par_jour": 350.0,
    "status": "disponible"
  }'

echo ""

curl -X POST "$BASE_URL/vehicules/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_vehicule": "VH007",
    "marque": "Mercedes",
    "modele": "Classe A",
    "carburant": "Essence",
    "prix_par_jour": 600.0,
    "status": "maintenance"
  }'

echo -e "\n✅ 7 véhicules créés"

# ============================================
# 5. CRÉATION DES RÉSERVATIONS
# ============================================
echo -e "\n[5/7] Création des réservations..."

# Réservation 1 : Client001 loue VH001 pour 5 jours (250*5=1250)
curl -X POST "$BASE_URL/reservations/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_reservation": "RES001",
    "date_debut": "2026-05-10",
    "date_fin": "2026-05-15",
    "date_reservation": "2026-05-03",
    "montant_total": 1250.0,
    "id_client": "client001",
    "id_vehicule": "VH001",
    "id_user": "agent001"
  }'

echo ""

# Réservation 2 : Client002 loue VH002 pour 3 jours (300*3=900)
curl -X POST "$BASE_URL/reservations/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_reservation": "RES002",
    "date_debut": "2026-05-05",
    "date_fin": "2026-05-08",
    "date_reservation": "2026-05-02",
    "montant_total": 900.0,
    "id_client": "client002",
    "id_vehicule": "VH002",
    "id_user": "agent002"
  }'

echo ""

# Réservation 3 : Client003 loue VH004 pour 7 jours (450*7=3150)
curl -X POST "$BASE_URL/reservations/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_reservation": "RES003",
    "date_debut": "2026-05-12",
    "date_fin": "2026-05-19",
    "date_reservation": "2026-05-03",
    "montant_total": 3150.0,
    "id_client": "client003",
    "id_vehicule": "VH004",
    "id_user": "agent003"
  }'

echo ""

# Réservation 4 : Client004 loue VH003 pour 4 jours (320*4=1280)
curl -X POST "$BASE_URL/reservations/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_reservation": "RES004",
    "date_debut": "2026-05-08",
    "date_fin": "2026-05-12",
    "date_reservation": "2026-05-01",
    "montant_total": 1280.0,
    "id_client": "client004",
    "id_vehicule": "VH003",
    "id_user": "agent001"
  }'

echo ""

# Réservation 5 : Client005 loue VH005 pour 10 jours (400*10=4000)
curl -X POST "$BASE_URL/reservations/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_reservation": "RES005",
    "date_debut": "2026-05-15",
    "date_fin": "2026-05-25",
    "date_reservation": "2026-05-03",
    "montant_total": 4000.0,
    "id_client": "client005",
    "id_vehicule": "VH005",
    "id_user": "agent002"
  }'

echo ""

# Réservation 6 : Client001 loue VH006 pour 2 jours (350*2=700)
curl -X POST "$BASE_URL/reservations/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_reservation": "RES006",
    "date_debut": "2026-06-01",
    "date_fin": "2026-06-03",
    "date_reservation": "2026-05-03",
    "montant_total": 700.0,
    "id_client": "client001",
    "id_vehicule": "VH006",
    "id_user": "agent003"
  }'

echo -e "\n✅ 6 réservations créées"

# ============================================
# 6. CRÉATION DES PAIEMENTS
# ============================================
echo -e "\n[6/7] Création des paiements..."

curl -X POST "$BASE_URL/paiements/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_paiement": "PAY001",
    "mode_paiement": "carte",
    "id_reservation": "RES001"
  }'

echo ""

curl -X POST "$BASE_URL/paiements/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_paiement": "PAY002",
    "mode_paiement": "espece",
    "id_reservation": "RES002"
  }'

echo ""

curl -X POST "$BASE_URL/paiements/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_paiement": "PAY003",
    "mode_paiement": "application",
    "id_reservation": "RES003"
  }'

echo ""

curl -X POST "$BASE_URL/paiements/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_paiement": "PAY004",
    "mode_paiement": "carte",
    "id_reservation": "RES004"
  }'

echo ""

curl -X POST "$BASE_URL/paiements/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_paiement": "PAY005",
    "mode_paiement": "carte",
    "id_reservation": "RES005"
  }'

echo ""

curl -X POST "$BASE_URL/paiements/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_paiement": "PAY006",
    "mode_paiement": "espece",
    "id_reservation": "RES006"
  }'

echo -e "\n✅ 6 paiements créés"

# ============================================
# 7. CRÉATION DES RETOURS (pour les réservations terminées)
# ============================================
echo -e "\n[7/7] Création des retours..."

# Retour 1 : Voiture rendue en parfait état
curl -X POST "$BASE_URL/retours/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_retour": "RET001",
    "date_retour": "2026-05-08",
    "etat_voiture": "parfait",
    "frais_supplementaire": 0,
    "id_reservation": "RES002"
  }'

echo ""

# Retour 2 : Voiture avec nettoyage requis (frais de 200 DH)
curl -X POST "$BASE_URL/retours/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_retour": "RET002",
    "date_retour": "2026-05-12",
    "etat_voiture": "nettoyage_requis",
    "frais_supplementaire": 200.0,
    "id_reservation": "RES004"
  }'

echo ""

# Retour 3 : Voiture avec dommages mineurs (frais de 500 DH)
curl -X POST "$BASE_URL/retours/" \
  -H "Content-Type: application/json" \
  -d '{
    "id_retour": "RET003",
    "date_retour": "2026-05-15",
    "etat_voiture": "dommages_mineurs",
    "frais_supplementaire": 500.0,
    "id_reservation": "RES001"
  }'

echo -e "\n✅ 3 retours créés"

echo -e "\n================================================"
echo "   ✅ TOUTES LES DONNÉES ONT ÉTÉ CRÉÉES"
echo "================================================"
echo ""
echo "Résumé:"
echo "  - 2 Admins"
echo "  - 3 Agents"
echo "  - 5 Clients"
echo "  - 7 Véhicules"
echo "  - 6 Réservations"
echo "  - 6 Paiements"
echo "  - 3 Retours"
echo ""
