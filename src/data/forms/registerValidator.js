import * as yup from "yup";

const today = new Date();
const minDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());

export const registerValidator = yup.object({
    first_name: yup.string().required("Prénom requis"),
    last_name: yup.string().required("Nom requis"),
    email: yup.string().email("Email invalide").required("Email requis"),
    phone: yup
        .string()
        .matches(/^\d{10}$/, "Le numéro de téléphone doit contenir 10 chiffres")
        .required("Téléphone requis"),
    birth_date: yup
        .date()
        .transform((value, originalValue) => originalValue === '' ? null : value)
        .min(minDate, "L'utilisateur ne doit pas avoir plus de 25 ans")
        .max(today, "La date de naissance ne peut pas être dans le futur")
        .required("Date de naissance requise"),
    password: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .matches(/[a-z]/, "Le mot de passe doit contenir une lettre minuscule")
        .matches(/[A-Z]/, "Le mot de passe doit contenir une lettre majuscule")
        .matches(/[0-9]/, "Le mot de passe doit contenir un chiffre")
        .required("Mot de passe requis"),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password')], "Les mots de passe ne correspondent pas")
        .required("Confirmation du mot de passe requise"),
});

export const registerFields = [
    {
        name: "last_name",
        label: "Nom",
        type: "text",
        className: "col-start-1",
        rules: { required: "Le nom est obligatioire" },
    },
    {
        name: "first_name",
        label: "Prenom",
        type: "text",
        className: "col-start-2",
        rules: { required: "Le prenom est obligatoire" },
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        className: "col-span-2",
        rules: { required: "Le mot de passe est obligatoire" },
    },
    {
        name: "birth_date",
        label: "Date de naissance",
        type: "date",
        className: "col-start-1",
        rules: { required: "La date de naissance est obligatoire" },
    },
    {
        name: "phone",
        label: "Téléphone",
        type: "number",
        className: "col-start-2",
        rules: { required: "Le numéro de téléphone est obligatoire" },
    },
    {
        name: "password",
        label: "Mot de passe",
        type: "password",
        className: "col-span-2",
        rules: { required: "Le mot de passe est obligatoire" },
    },
    {
        name: "confirm_password",
        label: "Confirmer mot de passe",
        type: "password",
        className: "col-span-2",
        rules: { required: "Vous devez confirmer le mot de passe" },
    },

]