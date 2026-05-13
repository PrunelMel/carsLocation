
function VehiculeModal({ 
    isOpen, 
    onClose, 
    modeEdition, 
    vehicule, 
    onChange, 
    onSubmit, 
    saving, 
    erreur, 
    succes 
}) {
    // Si showModal est false, on ne renvoie rien
    if (!isOpen) return null;

    //Sinon on renvoie le formulaire d'ajout ou de modification selon le modeEdition(Si true alors modification)
    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='bg-white rounded-2xl shadow-xl w-full max-w-lg p-8'>
                <h2 className='text-xl font-bold mb-6'>
                    {modeEdition ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
                </h2>

                {erreur && <div className='bg-red-50 text-red-600 p-3 rounded-lg mb-4'>{erreur}</div>}
                {succes && <div className='bg-green-50 text-green-600 p-3 rounded-lg mb-4'>{succes}</div>}

                <form onSubmit={onSubmit} className='grid grid-cols-2 gap-4'>
                    {/* Champ ID (Nécessaire pour la création d'un vehicule et s'affiche que si on fait la création) */}
                    {!modeEdition && (
                        <div className='flex flex-col gap-1 col-span-2'>
                            <label className='text-sm font-semibold'>Identifiant Véhicule (ID)</label>
                            <input
                                type="text" required
                                className='border rounded-lg px-3 h-10'
                                value={vehicule.id_vehicule}
                                onChange={e => onChange({ ...vehicule, id_vehicule: e.target.value })}
                            />
                        </div>
                    )}

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold'>Marque</label>
                        <input
                            type="text" required
                            className='border rounded-lg px-3 h-10'
                            value={vehicule.marque}
                            onChange={e => onChange({ ...vehicule, marque: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold'>Modèle</label>
                        <input
                            type="text" required
                            className='border rounded-lg px-3 h-10'
                            value={vehicule.modele}
                            onChange={e => onChange({ ...vehicule, modele: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold'>Carburant</label>
                        <select 
                            className='border rounded-lg px-3 h-10 bg-white'
                            value={vehicule.carburant}
                            onChange={e => onChange({ ...vehicule, carburant: e.target.value })}
                        >
                            <option value="">Sélectionner</option>
                            <option value="essence">Essence</option>
                            <option value="diesel">Diesel</option>
                            <option value="hybride">Hybride</option>
                            <option value="electrique">Electrique</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold'>Prix/Jour (DH)</label>
                        <input
                            type="number" required
                            className='border rounded-lg px-3 h-10'
                            value={vehicule.prix_par_jour}
                            onChange={e => onChange({ ...vehicule, prix_par_jour: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold'>Statut</label>
                        <select
                            className='border rounded-lg px-3 h-10 bg-white'
                            value={vehicule.status}
                            onChange={e => onChange({ ...vehicule, status: e.target.value })}
                        >
                            <option value="disponible">Disponible</option>
                            <option value="louer">Loué</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>

                    <div className='col-span-2 flex justify-end gap-3 mt-4'>
                        <button type="button" onClick={onClose} className='px-5 py-2 border rounded-lg'>
                            Annuler
                        </button>
                        <button 
                            type="submit" 
                            disabled={saving}
                            className='px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50'
                        >
                            {saving ? '...' : modeEdition ? 'Mettre à jour' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VehiculeModal;