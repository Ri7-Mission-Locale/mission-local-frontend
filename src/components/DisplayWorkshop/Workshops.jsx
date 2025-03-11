import React, { useEffect, useState } from "react";
import WorkshopService from '../../route/WorkshopService';
import defaultImage from "../../assets/image/gettyimages-1439945611-612x612.jpg";

export default function AtelierList() {
    const [ateliers, setAteliers] = useState([]);

    // Récupération des ateliers à l'initialisation
    useEffect(() => {
        async function fetchAteliers() {
            try {
                const data = await WorkshopService.getAllWorkshop();
                if (data) {
                    setAteliers(data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des ateliers :", error);
            }
        }
        fetchAteliers();
    }, []);

    // Exemple de fonction pour le bouton Annuler
    const handleAnnuler = (atelierId) => {
        console.log("Annuler l'atelier :", atelierId);
        // Ici, vous pourriez appeler une fonction pour annuler/supprimer l'atelier
        // Ex: WorkshopService.deleteWorkshop(atelierId) puis setAteliers(...) pour mettre à jour la liste
    };

    // Exemple de fonction pour le bouton Plus d'info
    const handleMoreInfo = (atelierId) => {
        console.log("Plus d'info sur l'atelier :", atelierId);
        // Par exemple, vous pourriez naviguer vers un écran de détails
        // Ex: navigate(`/atelier/${atelierId}`)
    };

    return (
        <div className="px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Mes Ateliers</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ateliers.map((atelier) => (
                    <div key={atelier.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300" >
                        <img src={atelier.imageUrl || defaultImage} alt="Aperçu atelier" className="w-full h-40 object-cover"/>

                        <div className="p-4 flex flex-col ">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{atelier.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {atelier.content}
                                </p>
                                <p>{atelier.startDate}</p>
                                <p>{atelier.endDate}</p>

                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <button
                                    onClick={() => handleAnnuler(atelier.id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded focus:outline-none hover:bg-red-600 transition-colors duration-200">
                                    Annuler
                                </button>

                                <button
                                    onClick={() => handleMoreInfo(atelier.id)}
                                    className="bg-blue-500 text-white py-1 px-3 rounded focus:outline-none hover:bg-blue-600 transition-colors duration-200">
                                    Plus d'info
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
