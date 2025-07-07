import { useForm } from "react-hook-form";
import Button from "@components/Button";
import FileInput from "@components/inputs/FileInput.jsx";
import SignUpFormTitle from "@components/SignUpFormTitle";
import { newsInput } from "@data/newAddData.js";
import Input from "@components/inputs/Input.jsx";
import api from "@api/fetcher.js";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function NewsAdd() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [tags, setTags] = useState([]);

  const onError = (errors) => {
    console.log("Erreurs dans le formulaire :", errors);
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("tags");
        setTags(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des tags :", error);
      }
    };
    fetchTags();
  }, []);

  const onSubmit = (data) => {
    // TODO TAG NOT PARSED IN TABLE
    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(data));
    formDataToSend.append("register_file", selectedFiles[0] || undefined);
    api.post(`news`, formDataToSend)
      .then(() => {
        toast.success("Actualité ajoutée !");
        setTimeout(() => {
          navigate("/news/list");
        }, 1500);
      })
      .catch((err) => {
        toast.error("Erreur lors de l'ajout !");
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

      <FileInput
        htmlFor={"imagePath"}
        label={"Choisir une image"}
        onChange={e => setSelectedFiles(e.target.files)}
      />

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

      {/*  Permet de simuler une image , à supprimer  */}
      <input
        type="hidden"
        value="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?cs=srgb&dl=pexels-fauxels-3183197.jpg&fm=jpg"
        {...register("imagePath", { required: true })}
      />
      {/*  Permet de simuler une image , à supprimer  */}

      {tags && tags.length > 0 && (
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
      )}

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
