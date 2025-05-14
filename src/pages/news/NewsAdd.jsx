import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import FileInput from "../../components/FileInput";
import SignUpFormTitle from "../../components/SignUpFormTitle";
import { newsInput } from "../../data/newAddData";
import Input from "../../components/Input";
import { useState } from "react";

export default function NewsAdd() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //A la validation du formulaire , envoi les data du form et les datas de la prise de rdv
  const onSubmit = (data) => {
    console.log(data);
  };

  //useState du formulaire
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imagePath: "",
  });

  //Enregistre les modifcations du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputList = newsInput.map((el) => (
    <div key={el.id} className="flex flex-col ">
      <Input
        id={el.id}
        label={el.label}
        type={el.type}
        placeholder={el.placeholder}
        htmlFor={el.for}
        name={el.name}
        handleChange={handleChange}
        className={el.classes}
        {...register(el.name, el.rules)}
      />
      {errors[el.name] && (
        <p className="text-red-500 text-sm">{errors[el.name].message}</p>
      )}
    </div>
  ));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      action=""
      className=" w-4/5 mt-10 mx-auto  border border-gray-300 p-8 rounded-lg flex flex-col gap-5 md:grid md:grid-cols-2"
    >
      <SignUpFormTitle label={"Ajouter une actualité"} />
      {inputList}

      <FileInput htmlFor={"imagePath"} label={"Choisir une image"} />

      <label htmlFor="description">Contenu de l'actualité:</label>
      <textarea
        id="description"
        name="description"
        className="bg-gray-50 border font-thin
 border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
        rows="5"
        cols="33"
        handleChange={handleChange}
        placeholder="Entrez le contenu de l'actualité"
      >
      </textarea>
      

      <Button
        bgColor="bg-cyan-500"
        color="text-white"
        label="Ajouter une actualité"
      />
    </form>
  );
}
