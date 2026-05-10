const Base_URL = "http://localhost:3000/api/";

const fetchAll = async (endpoint) => {
    try {
        const response = await fetch(`${Base_URL}${endpoint}`)
        if (!response.ok) {
            throw new Error("Bad response")
        }
        const data = await response.json()
        return data
    } catch (e) {
        console.error(e)
        throw e  
    }
}

const create = async (endpoint, data) => {
    try {
        const response = await fetch(`${Base_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la création")
        }
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}

const update = async (endpoint, data) => {
    try {
        const response = await fetch(`${Base_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour")
        }
        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

const supprimer = async (endpoint, id) => {
    try {
        const response = await fetch(`${Base_URL}${endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json"
            }
        })
        if (!response.ok) {
            throw new Error("Erreur lors de la suppression")
        }
       
        return response
    } catch (error) {
        console.error(error)
        throw error
    }

}

const login = async (endpoint, data) => {
    try {
        const response = await fetch(`${Base_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error("Identifiants invalides")
        }
       
        return response  
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const apiService = {
    //Operations sur utilisateurs
    getClients: async () => await fetchAll("clients"),    
    createClient: (data) => create("clients", data),
    updateClient: (id, data) => update(`clients/${id}`, data),
    deleteClient: (id) => supprimer("clients", id),
    
    //Operations sur clients
    getUtilisateur: () =>  fetchAll("users"),
    createUtilisateur: (data) => create("users", data),
    updateUtilisateur: (id, data) => update(`users/${id}`, data),
    deleteUtilisateur: (id) => supprimer("users", id),
    loginUtilisateur : (data)=>login("login/",data),
    //Opérations sur reservations
    getReservations: () => fetchAll("reservations"),
    createReservations: (data) => create("reservations", data), 
    updateReservation: (id, data) => update(`reservations/${id}`, data),
    deleteReservation: (id) => supprimer("reservations", id),
    //Operations sur paiements
    getPaiements: () => fetchAll("paiements"),
    createPaiements: (data) => create("paiements", data),
    updatePaiement: (id, data) => update(`paiements/${id}`, data),
    deletePaiement: (id) => supprimer("paiements", id),
    //Operations sur Retour
    getRetour: () => fetchAll("retours"),
    createRetour: (data) => create("retours", data),
    updateRetour: (id, data) => update(`retours/${id}`, data),
    deleteRetour: (id) => supprimer("retours", id),
    //Operations sur les vehicules
    getVehicules: () => fetchAll("vehicules"),
    createVehicules : (data) => create("vehicules", data),
    updateVehicules: (id, data) => update(`vehicules/${id}`, data),
    deleteVehicules: (id) => supprimer("vehicules", id),


}
