import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { workshopInput } from "../../data/workShopAddData";
import Button from "../../components/Button";
import SignUpFormTitle from "../../components/SignUpFormTitle";
import FileInput from "../../components/FileInput";

export default function WorkShopAdd() {
  const {
    register,
    formState: { errors },
  } = useForm();

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
      action=""
      className=" w-4/5 mt-10 mx-auto  border border-gray-300 p-8 rounded-lg flex flex-col gap-5 md:grid md:grid-cols-2"
    >
      <SignUpFormTitle label={"Ajouter un atelier"} />
      {listItems}
      <FileInput htmlFor={"img"} label={"Choisir une image"} />
      <Button
        bgColor="bg-cyan-500"
        color="text-white"
        label="Ajouter un atelier"
      />
    </form>
  );
}
