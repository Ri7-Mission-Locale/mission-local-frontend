import { Stepper } from "react-form-stepper";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { input, inputFile } from "@data/signUpData.js";
import Input from "@components/Input.jsx";
import FileInput from "@components/FileInput.jsx";
import SignUpFormTitle from "@components/SignUpFormTitle.jsx";
import DownloadButton from "@components/DownloadButton.jsx";
import AloneSection from "@components/AloneSection.jsx";
import AgendaSelector from "@components/AgendaSelector.jsx";
import Button from "@components/Button.jsx";

export default function SignUpPage() {
  const [signUpStep, setsignUpStep] = useState(0);
  const agendaRef = useRef();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  //A la validation du formulaire , envoi les data du form et les datas de la prise de rdv
  const onSubmit = (data) => {
    if (signUpStep < 2) {
      nextStep();
    } else {
      if (agendaRef.current) {
        const events = agendaRef.current.getEventsToSend();
        console.log(events, data);
      }
    }
  };
  //useState du formulaire
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    birthDate: "",
    phone: "",
    password: "",
    repeatPassword: "",
  });

  //Enregistre les modifcations du formulaires
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Permet d'aller à l'étape suivante du formulaire et met à jour le stepper
  function nextStep() {
    if (signUpStep < 2) setsignUpStep((prev) => prev + 1);
  }

  //Permet d'aller à l'étape précédente du formulaire et met à jour le stepper
  function previousStep() {
    if (signUpStep <= 2 && signUpStep > 0) setsignUpStep((prev) => prev - 1);
  }

  //Génère les inputs du formulaire
  const listItems = input.map((el) => (
    <div key={el.id} className={"flex flex-col " + el.classes}>
      <Input
        id={el.id}
        label={el.label}
        type={el.type}
        placeholder={el.placeholder}
        htmlFor={el.for}
        name={el.name}
        handleChange={handleChange}
        {...register(el.name, el.rules)}
      />
      {errors[el.name] && (
        <p className="text-red-500 text-sm">{errors[el.name].message}</p>
      )}
    </div>
  ));

  //Génère le file input du formulaire
  const InputFileList = inputFile.map((el) => (
    <FileInput
      label={el.label}
      placeholder={el.placeholder}
      id={el.id}
      className={el.className}
    />
  ));

  return (
    <main>
      <AloneSection className="h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-4/5 border bg-white border-gray-300 p-8 rounded-lg flex flex-col gap-5 md:grid md:grid-cols-2 max-w-3xl"
        >
          <Stepper
            className="md:col-span-2"
            steps={[
              { label: "Informations" },
              { label: "Document" },
              { label: "Prendre RDV" },
            ]}
            activeStep={signUpStep}
            styleConfig={{
              activeBgColor: "#35C0F7",
              activeTextColor: "#ffffff",
              completedBgColor: "#35C0F7",
              inactiveBgColor: "#E0E0E0",
              inactiveTextColor: "#757575",
            }}
          />
          <SignUpFormTitle
            className="md:col-span-2 "
            label={"INSCRIPTION"}
            onClick={previousStep}
            step={signUpStep}
          />
          {signUpStep === 0 && listItems}
          {signUpStep === 1 && <DownloadButton />}
          {signUpStep === 1 && InputFileList}
          {signUpStep === 2 && (
            <AgendaSelector
              ref={agendaRef}
              attendees={[
                {
                  emailAddress: {
                    address: getValues("email"),
                    name: `${getValues("firstName")} ${getValues("lastName")}`,
                  },
                  type: "required",
                },
              ]}
            />
          )}

          <div className="flex flex-col items-center gap-5 col-span-2">
            <Button
              className="bg-cyan-500 text-white md:w-[30%]"
              onClick={
                signUpStep < 2 ? handleSubmit(() => nextStep()) : undefined
              }
              type={signUpStep < 2 ? "button" : "submit"}
            >
              {signUpStep < 2 ? "Suivant" : "Prendre RDV"}
            </Button>

            {signUpStep === 0 && (
              <NavLink
                to={"/signin"}
                className={`w-[100%] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-orange-100 text-black text-center md:w-[30%]`}
              >
                Déjà inscrit ?
              </NavLink>
            )}
          </div>
        </form>
      </AloneSection>
    </main>
  );
}
