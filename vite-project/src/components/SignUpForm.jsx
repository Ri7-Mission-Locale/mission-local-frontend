import FileInput from "./FileInput";
import Input from "./Input";
import { input, inputFile } from "../data/signUpData";
import SignUpFormTitle from "./SignUpFormTitle";
import Button from "./Button";
import { Stepper } from "react-form-stepper";
import { useState } from "react";
import DownloadButton from "./DownloadButton";

export default function SignUpForm() {
  const [signUpStep, setsignUpStep] = useState(0);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    adress: "",
    city: "",
    birthDate: "",
    birthPlace: "",
    phone: "",
    socialNumber: "",
    password: "",
    cPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  function nextStep() {
    if (signUpStep < 2) setsignUpStep((prev) => prev + 1);
  }

  function previousStep() {
    if (signUpStep <= 2 && signUpStep > 0) setsignUpStep((prev) => prev - 1);
  }

  const listItems = input.map((el) => (
    <Input
      key={el.id}
      id={el.id}
      label={el.label}
      type={el.type}
      placeholder={el.placeholder}
      htmlFor={el.for}
      name={el.name}
      handleChange={handleChange}
    />
  ));

  const InputFileList = inputFile.map((el) => (
    <FileInput label={el.label} placeholder={el.placeholder} id={el.id} />
  ));

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" w-4/5 mt-10 mx-auto  border border-gray-300 p-8 rounded-lg flex flex-col gap-5"
      >
        <Stepper
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
        <SignUpFormTitle label={"INSCRIPTION"} onClick={previousStep} step={signUpStep}/>
        {signUpStep === 0 && listItems}
        {signUpStep === 1 && <DownloadButton/>}
        {signUpStep === 1 && InputFileList}



        <div className="flex flex-col items-center gap-5">
          <Button
            bgColor="bg-cyan-500"
            color="text-white"
            label={signUpStep < 2 ? "Suivant" : "Prendre RDV"}
            onClick={signUpStep < 2 ? nextStep : undefined}
            type={signUpStep < 2 ? "button" : "submit"}
          />

          {signUpStep === 0 && (
            <Button label={"Déjà inscrit ? "} bgColor="bg-orange-100" />
          )}
        </div>
      </form>
    </>
  );
}
