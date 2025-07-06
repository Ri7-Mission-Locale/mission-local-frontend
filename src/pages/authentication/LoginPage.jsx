import AloneSection from "@partials/AloneSection.jsx";
import { useForm } from "react-hook-form";
import { loginValidator, signupFields } from "@forms/loginValidator.js";
import Input from "@components/inputs/Input.jsx";
import Button from "@components/Button.jsx";
import { NavLink, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import TitleWithReturn from "@components/TitleWithReturn.jsx";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processLogin } from "../../api/impl/authentication";

export default function LoginPage() {
    const [serverError, setServerError] = useState(null);
    const navigate = useNavigate();
    const {
        register: login,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(loginValidator),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: processLogin,
        onSuccess: (data) => {
            sessionStorage.setItem("access_token", data.token);
            sessionStorage.setItem("role", data.role);
            queryClient.invalidateQueries(["profile"]);
            reset();
            setServerError(null);
            navigate("/");
        },

        onError: (error) => {
            console.log(error);
            setServerError(error.error || "Erreur serveur");
        }
    });

    const onSubmit = async (data) => {
        mutation.mutate(data);
    }

    return (
        <main className={"h-screen flex justify-center items-center p-3 bg-cover bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"}>
            <AloneSection className={"w-2xl max-w-screen"}>
                <TitleWithReturn link={"/"} className={"p-5"}>Connexion</TitleWithReturn>
                <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col justify-between h-100"}>
                    <div className="flex flex-col gap-3  p-3 md:p-8">
                        {signupFields.map(field => (
                            <div className={"flex flex-col"} key={field.name}>
                                <Input type={field.type} className={field.className} label={field.label} {...login(field.name, field.rules)} />
                                {errors[field.name] && (<p className="text-red-500 text-sm ml-1">{errors[field.name].message}</p>)}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3 p-3 md:p-8">
                        {serverError && <p className={"text-red-500"}>{serverError}</p>}
                        <Button className="bg-cyan-500 text-white">Se connecter</Button>
                        <NavLink to={"/register"} label="S'inscrire"
                            className={`w-[100%] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-orange-100 text-black text-center`}>Pas
                            encore inscrit ?</NavLink>
                    </div>
                </form>
            </AloneSection>
        </main>
    )
}