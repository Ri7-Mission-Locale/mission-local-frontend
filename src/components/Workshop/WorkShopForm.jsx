import React, { useState } from 'react';
import Input from './input';
import ButtonWorkshop from './ButtonWorkshop';
import WorkshopService from '../../route/WorkshopService';
import { inputWorkshop } from '../../data/inputWorkshop';

const WorkshopForm = () => {
  const [workshopData, setWorkshopData] = useState({
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    tags: [],
  });

  // État pour gérer la valeur du tag en cours de saisie
  const [currentTag, setCurrentTag] = useState('');

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workshopData.title || !workshopData.startDate || !workshopData.endDate) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    try {
      await WorkshopService.createWorkshop(workshopData);
      setWorkshopData({
        title: '',
        content: '',
        startDate: '',
        endDate: '',
        tags: [],
      });
      setCurrentTag('');
      alert('Atelier créé avec succès !');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la création de l’atelier.');
    }
  };

  // Mise à jour de n'importe quel champ (title, content, startDate, endDate)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkshopData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gestion de la saisie du tag en cours
  const handleTagInputChange = (e) => {
    setCurrentTag(e.target.value);
  };

  // Ajoute le tag saisi dans le tableau de tags
  const handleAddTag = (e) => {
    e.preventDefault();
    const trimmedTag = currentTag.trim();
    if (!trimmedTag) return;

    setWorkshopData((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, trimmedTag],
    }));
    setCurrentTag(''); // Réinitialise la saisie
  };

  // Supprime un tag du tableau
  const handleRemoveTag = (indexToRemove) => {
    setWorkshopData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, index) => index !== indexToRemove),
    }));
  };




  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg">
      {inputWorkshop.map((field) => (
        <div className="mb-4" key={field.name}>
          <Input
            label={field.label}
            type={field.type}
            name={field.name}
            value={workshopData[field.name]}
            placeholder={field.placeholder || ''}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block mb-1">Tags</label>
        <div className="flex items-center mb-2">
          <Input
            type="text"
            placeholder="Entrez un tag"
            value={currentTag}
            onChange={handleTagInputChange}
            className="flex-grow mr-2"
          />
          <button
            onClick={handleAddTag}
            className="px-4 py-2 border rounded-md"
          >
            +
          </button>
        </div>

        
        <div>
          {workshopData.tags.map((tag, index) => (
            <div
              key={`${tag}-${index}`}
              className="inline-block border rounded-md px-2 py-1 mr-2 mb-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="ml-2"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      <ButtonWorkshop type="submit" title="Ajouter un Atelier" />
    </form>
  );
};

export default WorkshopForm;
