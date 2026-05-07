#!/bin/bash

# Configuration de l'URL (Ajustez le port si nécessaire)
# Note: Si vous utilisez un préfixe dans votre main.py, ajoutez-le ici (ex: /api)
BASE_URL="http://localhost:3000/api"

echo "=========================================================="
echo "   🚀 PEUPLEMENT DE LA BASE AVEC DONNÉES RÉELLES"
echo "=========================================================="

# 1. UTILISATEURS (2 Admins + 3 Agents = 5)
echo -e "\n[1/6] Création des Utilisateurs..."
# Admins
curl -s -X POST "$BASE_URL/users" -H "Content-Type: application/json" -d '{
  "id_user": "ADMIN_01", "nom": "Mansouri", "prenom": "Yasmine", "mot_de_passe": "Hash_Yash2026", 
  "role": "admin", "email": "y.mansouri@agence.ma"
}' > /dev/null
curl -s -X POST "$BASE_URL/users" -H "Content-Type: application/json" -d '{
  "id_user": "ADMIN_02", "nom": "Benjelloun", "prenom": "Karim", "mot_de_passe": "Hash_Karim2026", 
  "role": "admin", "email": "k.benjelloun@agence.ma"
}' > /dev/null
# Agents (liés à ADMIN_01)
curl -s -X POST "$BASE_URL/users" -H "Content-Type: application/json" -d '{
  "id_user": "AGENT_01", "nom": "Tazi", "prenom": "Amine", "mot_de_passe": "Agent@Amine", 
  "role": "agent", "email": "a.tazi@agence.ma", "id_admin": "ADMIN_01"
}' > /dev/null
curl -s -X POST "$BASE_URL/users" -H "Content-Type: application/json" -d '{
  "id_user": "AGENT_02", "nom": "Idrissi", "prenom": "Sofia", "mot_de_passe": "Agent@Sofia", 
  "role": "agent", "email": "s.idrissi@agence.ma", "id_admin": "ADMIN_01"
}' > /dev/null
curl -s -X POST "$BASE_URL/users" -H "Content-Type: application/json" -d '{
  "id_user": "AGENT_03", "nom": "El Fassi", "prenom": "Omar", "mot_de_passe": "Agent@Omar", 
  "role": "agent", "email": "o.elfassi@agence.ma", "id_admin": "ADMIN_01"
}' > /dev/null
echo "✅ 2 Admins et 3 Agents créés."

# 2. CLIENTS (5 total)
echo -e "\n[2/6] Création des Clients..."
declare -a c_noms=("El Amrani" "Bennani" "Sadiki" "Filali" "Chraibi")
declare -a c_prenoms=("Driss" "Ghita" "Mehdi" "Sara" "Walid")
for i in {0..4}; do
  curl -s -X POST "$BASE_URL/clients" -H "Content-Type: application/json" -d "{
    \"id_client\": \"CLI_00$((i+1))\", \"nom\": \"${c_noms[$i]}\", \"prenom\": \"${c_prenoms[$i]}\",
    \"mot_de_passe\": \"ClientPass$i\", \"adresse\": \"Boulevard Zerktouni, Casablanca\", 
    \"email\": \"client$((i+1))@gmail.com\", \"tel\": \"066100000$i\", \"cin\": \"BK7000$i\", \"num_permis\": \"20/1000$i\"
  }" > /dev/null
done
echo "✅ 5 Clients créés."

# 3. VÉHICULES (5 total)
echo -e "\n[3/6] Création des Véhicules..."
# Marques et modèles réels
declare -a v_marques=("Dacia" "Renault" "Peugeot" "Toyota" "Volkswagen")
declare -a v_modeles=("Sandero" "Clio 5" "208" "Yaris" "Golf 8")
declare -a v_stats=("disponible" "louer" "disponible" "maintenance" "disponible")

for i in {0..4}; do
  curl -s -X POST "$BASE_URL/vehicules" -H "Content-Type: application/json" -d "{
    \"id_vehicule\": \"VH_$((i+1))\", \"marque\": \"${v_marques[$i]}\", \"modele\": \"${v_modeles[$i]}\",
    \"carburant\": \"Diesel\", \"prix_par_jour\": $((250 + i*50)), \"status\": \"${v_stats[$i]}\"
  }" > /dev/null
done
echo "✅ 5 Véhicules créés."

# 4. RÉSERVATIONS (5 total)
# Note : Respect de la contrainte date_fin > date_debut
echo -e "\n[4/6] Création des Réservations..."
for i in {1..5}; do
  curl -s -X POST "$BASE_URL/reservations" -H "Content-Type: application/json" -d "{
    \"id_reservation\": \"RES_00$i\", \"date_debut\": \"2026-06-0$i\", \"date_fin\": \"2026-06-1$i\",
    \"montant_total\": $((1500 + i*200)), \"status\": \"confirmee\", 
    \"id_client\": \"CLI_00$i\", \"id_vehicule\": \"VH_$i\", \"id_user\": \"AGENT_01\"
  }" > /dev/null
done
echo "✅ 5 Réservations créées."

# 5. PAIEMENTS (5 total)
echo -e "\n[5/6] Création des Paiements..."
declare -a p_modes=("carte" "espece" "application" "carte" "espece")
for i in {0..4}; do
  curl -s -X POST "$BASE_URL/paiements" -H "Content-Type: application/json" -d "{
    \"id_paiement\": \"PAY_00$((i+1))\", \"mode_paiement\": \"${p_modes[$i]}\", \"id_reservation\": \"RES_00$((i+1))\"
  }" > /dev/null
done
echo "✅ 5 Paiements créés."

# 6. RETOURS (5 total)
echo -e "\n[6/6] Création des Retours..."
declare -a r_etats=("parfait" "nettoyage_requis" "dommages_mineurs" "parfait" "parfait")
for i in {0..4}; do
  curl -s -X POST "$BASE_URL/retours" -H "Content-Type: application/json" -d "{
    \"id_retour\": \"RET_00$((i+1))\", \"date_retour\": \"2026-07-01\", 
    \"etat_voiture\": \"${r_etats[$i]}\", \"frais_supplementaire\": $((i * 100)), \"id_reservation\": \"RES_00$((i+1))\"
  }" > /dev/null
done
echo "✅ 5 Retours créés."

echo -e "\n🚀 Opération terminée avec succès !"