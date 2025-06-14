import {post} from "@api/fetcher.js";
import Input from "@components/inputs/Input.jsx";
import Button from "@components/Button.jsx";
import {NavLink} from "react-router";
import {registerFields, registerValidator} from "@forms/registerValidator.js";
import {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import AloneSection from "@partials/AloneSection.jsx";
import {Stepper} from "react-form-stepper";
import SignUpFormTitle from "@components/SignUpFormTitle.jsx";
import TitleWithReturn from "@components/TitleWithReturn.jsx";
import DownloadButton from "@components/DownloadButton.jsx";
import {inputFile} from "@data/signUpData.js";
import FileInput from "@components/inputs/FileInput.jsx";
import AgendaSelector from "@components/AgendaSelector.jsx";

export default function RegisterPage() {
    const [step, setStep] = useState(0);
    const [serverError, setServerError] = useState(null);
    const agendaRef = useRef(null);

    const {
        register,
        getValues,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: yupResolver(registerValidator),
    });

    const onSubmit = async (data) => {
        console.log(data);
        const res = await post("auth/register", data);
        if (!res.ok) setServerError(res.message)
        reset();
    }

    const nextStep = () => {
        if (step < 2) setStep((prev) => prev + 1);
    }

    const previousStep = () => {
        if (step <= 2 && step > 0) setStep((prev) => prev - 1);
    }

    return (
        <main className={"flex justify-center items-center md:p-3 overflow-hidden"}>
            <AloneSection className={"w-2xl max-w-screen py-8"}>
                <Stepper
                    steps={[
                        {label: "Informations"},
                        {label: "Document"},
                        {label: "Prendre RDV"},
                    ]}
                    activeStep={step}
                    styleConfig={{
                        activeBgColor: "#35C0F7",
                        activeTextColor: "#ffffff",
                        completedBgColor: "#35C0F7",
                        inactiveBgColor: "#E0E0E0",
                        inactiveTextColor: "#757575",
                    }}
                />
                {/* TODO CLEANUP SIGNUP TITLE */}
                {step > 0 ?
                    (<SignUpFormTitle
                        className="md:col-span-2"
                        label={"Inscription"}
                        onClick={previousStep}
                        step={step}
                    />)
                    :
                    (<TitleWithReturn link={"/"} className="px-8">Inscription</TitleWithReturn>)
                }
                <form onSubmit={handleSubmit(onSubmit)}
                      className={"flex flex-col justify-between gap-5 overflow-hidden"}>
                    <div className="flex w-[300%] transition-transform duration-500 ease-in-out"
                         style={{transform: `translateX(-${step * 33.33}%)`}}>
                        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 w-full p-3 md:p-8">
                            {registerFields.map(field => (
                                <div className={field.className} key={field.name}>
                                    <Input type={field.type}
                                           label={field.label} {...register(field.name, field.rules)} />
                                    {errors[field.name] && (
                                        <p className="text-red-500 text-sm ml-1">{errors[field.name].message}</p>)}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-5 w-full p-3 md:p-8 justify-center items-center">
                            <DownloadButton/>
                            {inputFile.map((el) => (
                                <FileInput key={el.id} label={el.label} placeholder={el.placeholder} id={el.id}/>
                            ))}
                        </div>
                        <div className="flex gap-3 w-full p-3 md:p-8 justify-center items-center">
                            <AgendaSelector

                                ref={agendaRef}
                                attendees={[
                                    {
                                        emailAddress: {
                                            address: getValues("email"),
                                            name: `${getValues('first_name')} ${getValues('last_name')}`,
                                        },
                                        type: "required",
                                    },
                                ]}
                            />
                        </div>

                    </div>
                    <div className="flex flex-col gap-3 px-5">
                        {serverError && <p className={"text-red-500"}>{serverError}</p>}
                        <Button onClick={nextStep} className="bg-cyan-500 text-white">Suivant</Button>
                        <NavLink to={"/login"} label="S'inscrire"
                                 className={`w-[100%] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-orange-100 text-black text-center`}>Déjà
                            inscrit ?</NavLink>
                    </div>
                </form>
            </AloneSection>
        </main>
    )
}