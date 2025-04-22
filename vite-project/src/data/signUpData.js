export const input = [
  {
    label: "Nom",
    type: "text",
    for: "lastName",
    placeholder: "Entrez votre nom",
    id: "lastName",
    name: "lastName",
    rules: { required: "Le nom est obligatoire" },
  },
  {
    label: "Prénom",
    type: "text",
    for: "firstName",
    placeholder: "Entrez votre prénom",
    id: "firstName",
    name: "firstName",
    rules: { required: "Le prénom est obligatoire" },
  },
  {
    label: "Adresse mail",
    type: "text",
    for: "email",
    placeholder: "Entrez votre mail",
    id: "email",
    name: "email",
    rules: { required: "L'adresse mail est obligatoire" },
  },
  {
    label: "Date de naissance",
    type: "date",
    for: "birthDate",

    id: "birthDate",
    name: "birthDate",
    rules: {
      required: "La date de naissance est obligatoire",
      validate: (value) => {
        const birth = new Date(value);
        if (isNaN(birth)) {
          return "Date de naissance invalide";
        }

        const today = new Date();
        const age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        const isBeforeBirthday =
          m < 0 || (m === 0 && today.getDate() < birth.getDate());
        const finalAge = isBeforeBirthday ? age - 1 : age;

        return (
          finalAge <= 25 ||
          "Vous devez avoir moins de 25 ans pour vous inscrire"
        );
      },
    },
  },
  {
    label: "Téléphone",
    type: "number",
    for: "phone",
    placeholder: "Entrez votre numero de téléphone",
    id: "phone",
    name: "phone",
    rules: {
      required: "Le numéro de téléphone est obligatoire",
      validate: (value) => {
        const cleaned = value.toString().replace(/\D/g, ""); // enlève les caractères non numériques
        return (
          cleaned.length >= 8 || "Le numéro doit contenir au moins 8 chiffres"
        );
      },
    },
  },
  {
    label: "Mot de passe",
    type: "password",
    for: "password",
    placeholder: "Entrez votre mot de passe",
    id: "password",
    name: "password",
    rules: { required: "Le mot de passe est obligatoire" },
  },
  {
    label: "Confirmer mot de passe",
    type: "password",
    for: "repeatPassword",
    placeholder: "Confirmer votre mot de passe",
    id: "repeatPassword",
    name: "repeatPassword",
    rules: { required: "Vous devez confirmer le mot de passe" },
  },
];

export const inputFile = [
  {
    label: "Formulaire d'inscription",
    for: "signUpForm",
    placeholder: "Ajouter votre CNI",
    id: "signUpForm",
  },
];
