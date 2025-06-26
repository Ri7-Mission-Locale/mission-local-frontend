import * as yup from "yup";

export const loginValidator = yup.object({
    email: yup.string().email("Email invalide").required("Email requis"),
    password: yup.string().required("Mot de passe requis"),
    keep_connected: yup.boolean().default(false)
});

export const signupFields = [
    {
        name: "email",
        label: "Email",
        type: "email",
        className: "",
        rules: { required: "L'addresse email est obligatoire" },
    },
    {
        name: "password",
        label: "Mot de passe",
        type: "password",
        className: "",
        rules: { required: "Le mot de passe est obligatoire" },
    },
    {
        name: "keep_connected",
        label: "Rester connecter",
        type: "checkbox",
        className: "flex items-center w-fit flex-row-reverse gap-3 [&_input]:w-fit [&_label]:m-0 m-0",
    }
]