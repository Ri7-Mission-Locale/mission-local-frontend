class WorkshopService {
    static async createWorkshop(workshopData) {
      try {
        const response = await fetch('http://localhost:3000/workshop/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(workshopData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Atelier créé avec succès:', data);
          return data;
        } else {
          console.error('Erreur lors de la création de l\'atelier');
        }
      } catch (error) {
        console.error('Erreur réseau:', error);
      }
    }

    static async getAllWorkshop(){
        try {
            const response = await fetch('http://localhost:3000/workshop', {
              method: 'GET',
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log('Liste des ateliers récupérée:', data);
              return data;  
            } else {
              console.error("Erreur lors de la récupération des ateliers");
            }
          } catch (error) {
            console.error('Erreur réseau:', error);
          }

    }
  }


 
  
  export default WorkshopService;
  