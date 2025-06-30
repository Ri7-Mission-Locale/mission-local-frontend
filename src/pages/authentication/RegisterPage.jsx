
import Input from "@components/inputs/Input.jsx";
import Button from "@components/Button.jsx";
import { NavLink, useNavigate } from "react-router";
import { registerFields, registerValidator, inputFileFields } from "@forms/registerValidator.js";
import { useState } from "react";
import AloneSection from "@partials/AloneSection.jsx";
import { Stepper } from "react-form-stepper";
import SignUpFormTitle from "@components/SignUpFormTitle.jsx";
import TitleWithReturn from "@components/TitleWithReturn.jsx";
import DownloadButton from "@components/DownloadButton.jsx";
import FileInput from "@components/inputs/FileInput.jsx";
import Agenda from "@components/agenda/Agenda.jsx";
import AgendaHours from "@components/agenda/AgendaHours.jsx";
import { date } from "yup";

const defaultFormData = Object.fromEntries(
    registerFields.map((field) => [field.name, ""])
);

export default function RegisterPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [serverError, setServerError] = useState(null);


    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const handleSelectDate = (date) => {
        setSelectedDate(date);
    }
    const handleSelectHour = (hour) => {
        setSelectedHour(hour);
    }

    const [formData, setFormData] = useState(defaultFormData);
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        nextStep(formData);
    }

    const nextStep = async () => {
        const validator = registerValidator[step];
        if (validator) {
            try {
                await validator.validate(formData, { abortEarly: false });
                setFormErrors({});
                if (step < 2) {
                    setStep((prev) => prev + 1);
                } else if (step === 2) {
                    submit(formData);
                }
            } catch (error) {
                const errors = {};
                if (error.inner) {
                    error.inner.forEach((e) => errors[e.path] = e.message);
                }
                setFormErrors(errors);
            }
        } else {
            if (step < 2) setStep((prev) => prev + 1);
        }
    };
    const previousStep = () => {
        if (step <= 2 && step > 0) setStep((prev) => prev - 1);
    }

    const clearDate = () => {
        setSelectedHour(null);
        setSelectedDate(null);
    }

    const submit = async (data) => {
        let sendedDate = null;
        if (selectedDate && selectedHour) {
            const [hours, minutes] = selectedHour.split(":");
            sendedDate = new Date(selectedDate);
            sendedDate.setHours(Number(hours), Number(minutes), 0, 0);
        }

        const formDataToSend = new FormData();
        Object.entries(data).forEach(([key, value]) => formDataToSend.append(key, value));
        formDataToSend.append("date", sendedDate ? sendedDate.toISOString() : "");

        selectedFiles.forEach((file, idx) => {
            if (file) formDataToSend.append(`file${idx}`, file);
        });

        const res = await post("auth/register", formDataToSend);
        if (res.error) {
            setServerError(res.message);
        }
        else {
            setServerError(null);
            setFormData(defaultFormData);
            setFormErrors({});
            navigate("/login");
        }
    }

    return (
        <main className={"h-screen flex justify-center items-center md:p-3 overflow-hidden bg-cover bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"}>
            <AloneSection className={"w-2xl max-w-screen py-8"}>
                <Stepper
                    steps={[
                        { label: "Informations" },
                        { label: "Document" },
                        { label: "Prendre RDV" },
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
                <form onSubmit={handleSubmit} className={"flex flex-col justify-between gap-5 overflow-hidden"}>
                    <div className="flex w-[300%] transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${step * 33.33}%)` }}>

                        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 w-full p-3 md:p-8">
                            {registerFields.map(field => (
                                <div className={field.className} key={field.name}>
                                    <Input
                                        type={field.type}
                                        label={field.label}
                                        value={formData[field.name]}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                [field.name]: e.target.value,
                                            })
                                        }
                                        name={field.name}
                                    />
                                    {formErrors[field.name] && (
                                        <p className="text-red-500 text-sm ml-1">{formErrors[field.name]}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-5 w-full p-3 md:p-8 justify-center items-center">
                            <DownloadButton link={"http://127.0.0.1:3000/dossier_inscription.pdf"} />
                            {inputFileFields.map((el, i) => (
                                <FileInput
                                    key={el.id}
                                    label={el.label}
                                    placeholder={el.placeholder}
                                    id={el.id}
                                    onChange={e => {
                                        const files = [...selectedFiles];
                                        files[i] = e.target.files[0] || null;
                                        setSelectedFiles(files);
                                    }}
                                />
                            ))}
                        </div>



                        <div className="flex gap-3 w-full p-3 md:p-8 justify-center items-center">
                            <Agenda onSelect={handleSelectDate} selectedDate={selectedDate} />
                            {selectedDate && (
                                <AgendaHours date={selectedDate} onSelect={handleSelectHour} />
                            )}
                            <button type="button" onClick={clearDate}>Annuler</button>
                        </div>

                    </div>
                    <div className="flex flex-col gap-3 px-5">
                        {serverError && <p className={"text-red-500"}>{serverError}</p>}
                        <Button className="bg-cyan-500 text-white">Suivant</Button>
                        <NavLink to={"/login"} label="S'inscrire"
                            className={`w-[100%] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-orange-100 text-black text-center`}>Déjà
                            inscrit ?</NavLink>
                    </div>
                </form>
            </AloneSection>
        </main>
    )
}

