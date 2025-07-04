import { useForm } from "react-hook-form";
import Button from "@components/Button";
import FileInput from "@components/inputs/FileInput.jsx";
import SignUpFormTitle from "@components/SignUpFormTitle";
import { newsInput } from "@data/newAddData.js";
import { get } from "@api/fetcher";
import Input from "@components/inputs/Input.jsx";
import { post } from "@api/fetcher.js";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function NewsAdd() {
  const navigate = useNavigate(); //
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await get("tags"); // GET /tags
        setTags(response);
      } catch (error) {
        console.error("Erreur lors du chargement des tags :", error);
      }
    };
    fetchTags();
  }, []);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      tags: data.tags, 
    };
    handlePost(formattedData);
  };

  //Ajoute la news
  const handlePost = async (formData) => {
    try {
      await post(`news`, formData);
      toast.success("Actualité ajoutée !");
      setTimeout(() => {
        navigate("/news/list");
      }, 1500);
    } catch (err) {
      toast.error("Erreur lors de l'ajout !");
      console.log("Erreur lors de l'ajout :", err);
    }
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
      className=" w-4/5 mt-10 mx-auto  border border-gray-300 p-8 rounded-lg flex flex-col gap-5 md:w-[40%]"
    >
      <SignUpFormTitle label={"Ajouter une actualité"} />
      {inputList}

      <FileInput htmlFor={"imagePath"} label={"Choisir une image"} />

      <label htmlFor="description">Contenu de l'actualité:</label>
      <textarea
        id="description"
        {...register("description", { required: "La description est requise" })}
        name="description"
        className="bg-gray-50 border font-thin border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
        rows="5"
        cols="33"
        placeholder="Entrez le contenu de l'actualité"
      ></textarea>

      <div>
        <label className="block mb-2 font-semibold">Tags :</label>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={tag.tag_name}
                {...register("tags", {
                  validate: (value) =>
                    value?.length > 0 ||
                    "Au moins un tag doit être sélectionné",
                })}
              />
              {tag.tag_name}
            </label>
          ))}
        </div>
        {errors.tags && (
          <p className="text-red-500 text-sm">{errors.tags.message}</p>
        )}
      </div>

      {/*  Permet de simuler une image , à supprimer  */}
      <input
        type="hidden"
        value="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?cs=srgb&dl=pexels-fauxels-3183197.jpg&fm=jpg"
        {...register("imagePath", { required: true })}
      />
      {/*  Permet de simuler une image , à supprimer  */}

      <Button
        className="bg-cyan-500 text-white md:w-[40%] m-auto"
        type={"submit"}
      >
        Ajouter une actualité
      </Button>
      <ToastContainer hideProgressBar={true} />
    </form>
  );
}
