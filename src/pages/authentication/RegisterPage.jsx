import Input from "@components/inputs/Input.jsx";
import Button from "@components/Button.jsx";
import { NavLink, useNavigate } from "react-router";
import { registerFields, registerValidator, inputFileFields } from "@forms/registerValidator.js";
import { useEffect, useState } from "react";
import AloneSection from "@partials/AloneSection.jsx";
import { Stepper } from "react-form-stepper";
import SignUpFormTitle from "@components/SignUpFormTitle.jsx";
import TitleWithReturn from "@components/TitleWithReturn.jsx";
import DownloadButton from "@components/DownloadButton.jsx";
import FileInput from "@components/inputs/FileInput.jsx";
import Agenda from "@components/agenda/Agenda.jsx";
import AgendaHours from "@components/agenda/AgendaHours.jsx";
import api from "../../api/fetcher";
import { toast } from "react-toastify";

const defaultFormData = Object.fromEntries(
    registerFields.map((field) => [field.name, ""])
);

export default function RegisterPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [hours, setHours] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);
    const [formData, setFormData] = useState(defaultFormData);
    const [formErrors, setFormErrors] = useState({});

    const handleSelectDate = (date) => {
        setSelectedDate(date);
    }

    const handleSelectHour = (hour) => {
        setSelectedHour(hour);
    }

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

        if (sendedDate) {
            data.date = sendedDate.toISOString();
        }

        const formDataToSend = new FormData();

        for (const key in data) {
            if (data[key] !== undefined && data[key] !== null) {
                formDataToSend.append(key, data[key]);
            }
        }

        if (selectedFiles[0]) {
            formDataToSend.append("register_file", selectedFiles[0]);
        }

        try {
            await api.post("/auth/register", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Vous etes inscrit !");
            setFormData(defaultFormData);
            setFormErrors({});
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
        }
    };

    useEffect(() => {
        if (!selectedDate) return;

        api.get("/free-appointments", {
            params: {
                start: selectedDate.toISOString().split("T")[0],
                end: new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).toISOString(),
                duration: 60
            }
        }).then((response) => {
            //console.log(selectedDate);

            const grouped = response.data.data.reduce((acc, slot) => {
                if (!acc[slot.date]) acc[slot.date] = [];
                acc[slot.date].push(slot.hour);
                return acc;
            }, {});
            setHours(grouped[selectedDate.toISOString().split('T')[0]] || []);
            //console.log(grouped);
        })
    }, [selectedDate])

    return (
        <main className={"h-dvh flex justify-center items-center md:p-3 bg-cover bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"}>
            <AloneSection className={"w-2xl max-w-screen max-h-dvh py-8 overflow-hidden"}>
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
                <form onSubmit={handleSubmit} className={"flex flex-col justify-between gap-5 overflow-y-scroll overflow-x-hidden"}>
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

                        <div className="flex flex-col md:flex-row w-full p-3 md:p-8 justify-center">
                            <Agenda onSelect={handleSelectDate} selectedDate={selectedDate} onSelectMonth={() => { }} />
                            {selectedDate && (
                                <AgendaHours date={selectedDate} onSelect={handleSelectHour} className="mx-auto md:m-0" hours={hours} />
                            )}
                            <button type="button" onClick={clearDate}>Annuler</button>
                        </div>

                    </div>
                    <div className="flex flex-col gap-3 px-5">
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

