import { useForm } from "react-hook-form";
import Input from "@components/inputs/Input.jsx";
import { workshopInput } from "@data/workShopAddData.js";
import Button from "@components/Button";
import SignUpFormTitle from "@components/SignUpFormTitle";
import FileInput from "@components/inputs/FileInput.jsx";
import api from "../../api/fetcher";

export default function WorkShopAdd() {
  const {
    register,
    formState: { errors },
  } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    api.post("workshops", data)
      .then(() => {
        console.log("Atelier ajouté avec succès !");
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout de l'atelier :", err);
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
    <form
      onSubmit={handleSubmit}
      className=" mt-10 mx-auto  border border-gray-300 p-8 rounded-lg flex flex-col gap-5 md:grid md:grid-cols-2 max-w-200 w-full"
    >
      <SignUpFormTitle label={"Ajouter un atelier"} className="md:col-span-2" />
      {listItems}
      <FileInput htmlFor={"img"} label={"Choisir une image"} className="md:col-span-2" />
      <Button
        className="bg-cyan-500 text-white md:col-span-2 "
      >Ajouter un atelier</Button>
    </form>
  );
}
