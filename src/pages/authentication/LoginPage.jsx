import AloneSection from "@partials/AloneSection.jsx";
import {useForm} from "react-hook-form";
import {loginValidator, signupFields} from "@forms/loginValidator.js";
import Input from "@components/inputs/Input.jsx";
import Button from "@components/Button.jsx";
import {NavLink} from "react-router";
import {yupResolver} from "@hookform/resolvers/yup";
import TitleWithReturn from "@components/TitleWithReturn.jsx";
import {post} from "@api/fetcher.js";
import {useState} from "react";

export default function LoginPage() {
    const [serverError, setServerError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(loginValidator),
    });

    const onSubmit = async (data) => {
        const res = await post("auth/login", data);
        if (!res.ok) setServerError(res.message)
        reset();
    }

    return (
        <main className={"h-screen flex justify-center items-center p-3"}>
            <AloneSection className={"w-2xl max-w-screen"}>
                <TitleWithReturn link={"/"} className={"p-8"}>Connexion</TitleWithReturn>
                <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col justify-between h-100"}>
                    <div className="flex flex-col gap-3 my-auto p-3 md:p-8">
                        {signupFields.map(field => (
                            <div className={"flex flex-col"} key={field.name}>
                                <Input type={field.type} className={field.className} label={field.label} {...register(field.name, field.rules)} />
                                {errors[field.name] && (<p className="text-red-500 text-sm ml-1">{errors[field.name].message}</p>)}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3 p-3 md:p-8">
                        { serverError && <p className={"text-red-500"}>{serverError}</p> }
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