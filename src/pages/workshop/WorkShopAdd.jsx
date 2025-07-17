import { useForm } from "react-hook-form";
import Input from "@components/inputs/Input.jsx";
import { workshopInput } from "@data/workShopAddData.js";
import Button from "@components/Button";
import SignUpFormTitle from "@components/SignUpFormTitle";
import FileInput from "@components/inputs/FileInput.jsx";
import api from "../../api/fetcher";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router";
import DefaultLayout from "../../layouts/DefaultLayout";

export default function WorkShopAdd() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data) => {
    const formDataToSend = new FormData();

    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formDataToSend.append(key, data[key]);
      }
    }

    if (selectedFiles[0]) {
      formDataToSend.append("register_file", selectedFiles[0]);
    }

    api.post("workshops", formDataToSend)
      .then(() => {
        toast.success("Atelier ajouté avec succès !");
        setTimeout(() => {
          navigate("/workshop/list");
        }, 1500);
      })
      .catch((err) => {
        toast.error("Erreur lors de l'ajout de l'atelier :", err);
      });
  }

  const listItems = workshopInput.map((el) => (
    <div key={el.id} className="flex flex-col ">
      <Input
        id={el.id}
        label={el.label}
        type={el.type}
        placeholder={el.placeholder}
        htmlFor={el.for}
        name={el.name}
        className={el.classes}
        {...register(el.name, el.rules)}
      />
      {errors[el.name] && (
        <p className="text-red-500 text-sm">{errors[el.name].message}</p>
      )}
    </div>
  ));

  return (
    <DefaultLayout>
      <form
        onSubmit={handleSubmit(submit)}
        className=" mt-30 mx-auto border border-gray-300 p-8 rounded-lg flex flex-col gap-5 md:grid md:grid-cols-2 max-w-150 w-full"
      >
        <SignUpFormTitle label={"Ajouter un atelier"} className="md:col-span-2" />
        {listItems}
        <FileInput htmlFor={"imagePath"} label={"Choisir une image"} className="md:col-span-2" onChange={e => setSelectedFiles(e.target.files)} />
        <Button
          className="bg-primary hover:brightness-115 text-white md:col-span-2 "
        >Ajouter un atelier</Button>
      </form>
    </DefaultLayout>

  );
}
