import Button from "@components/Button";
import Input from "@components/Input";
import SignUpFormTitle from "@components/SignUpFormTitle";
import { NavLink } from "react-router";
import { processLogin } from "@api/users/authentication.js";
import { useRef } from "react";

export default function SignInPage() {
    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());
        await processLogin(data);
    }

    return (
        <main className={"h-screen flex justify-center items-center"}>
            <form className="gap-4 flex flex-col w-4/5 border border-gray-300 p-8 rounded-lg max-w-3xl" ref={formRef} onSubmit={handleSubmit}>
                <SignUpFormTitle label={"CONNEXION"} />

                <Input
                    htmlFor={"email"}
                    label={"Email"}
                    name={"email"}
                    placeholder={"Entrez votre mail"}
                />
                <Input
                    htmlFor={"password"}
                    name={'password'}
                    label={"Mot de passe"}
                    placeholder={"Entrez votre mot de passe"}
                />
                <Button className="bg-cyan-500 text-white">Connexion</Button>
                <NavLink to={"/signup"} label="S'inscrire"
                    className={`w-[100%] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-orange-100 text-black text-center`}>Pas
                    encore inscrit ?</NavLink>
            </form>
        </main>
    );
}
