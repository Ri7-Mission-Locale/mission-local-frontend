import { useEffect, useState } from "react";
import Button from "@components/Button";
import Tag from "@components/Tag";
import { get, remove, patch } from "@api/fetcher";
import { useNavigate, useParams } from "react-router";
import Input from "@components/Input";

export default function NewsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  //// Fetch la news par ID
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await get(`news/${id}`);
        setNews(data);
        setFormData({
          title: data.title,
          description: data.description,
        });
        console.log(data);
      } catch (err) {
        setError(err.message);
        console.log(error);
      }
    };
    fetchNews();
  }, []);

  //// Supprime la news selectionné
  const handleDelete = async () => {
    try {
      await remove(`news/${id}`);
      alert("Actualité supprimée !");
      navigate("/news/list");
    } catch (err) {
      console.log("Erreur lors de la suppression :", err);
    }
  };


  //Modifie la news
  const handlePatch = async () => {
    try {
      await patch(`news/${id}`,formData);
      alert("Actualité mise à jour !");
    } catch (err) {
      console.log("Erreur lors de la mise à jour :", err);
    }
  };



  //Passe en mode modification
  function handleClick() {
    if (isEditing) {
      console.log("Data : ", formData);
      handlePatch()
    }
    setIsEditing(!isEditing);
  }

  //Met en mémoire les changements
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <article className=" rounded-xl w-4/5 m-auto border border-gray-300 flex flex-col gap-5 shadow-gray-400 shadow-md pt-5 md:w-[50%]">
      <div className="flex flex-col gap-2 w-[80%] m-auto ">

           {isEditing ? (
        <Input
        type = "text"
        id ="title"
        name ="title"
        value = {formData.title}
        onChange = {handleChange}
         />
      ) : (
               <h2 className="font-bold text-4xl">{news.title}</h2>

      )}

        <img className="" src={news.imagePath} alt="" />
        {Array.isArray(news.tag) && news.tag.length > 0 && (
          <div className="tags w-[80%]">
            {news.tag.map((t, index) => (
              <Tag key={index} text={t.tag_name} color={t.color} />
            ))}
          </div>
        )}
      </div>

      {isEditing ? (
        <Input
        type = "text"
        id ="description"
        name ="description"
        value = {formData.description}
        onChange = {handleChange}
         />
      ) : (
        <div className="w-[80%] m-auto  border-b-1  pb-5">
          <p>{news.description}</p>
        </div>
      )}

      <p className="w-[80%] m-auto">Rédigé le {news.createdAt} </p>

      <div className="m-auto flex gap-10 pb-5">
        <Button
          label={isEditing ? "Valider" : "Modifier"}
          className={
            isEditing ? "bg-green-500 text-white" : "bg-orange-500 text-white"
          }
          onClick={handleClick}
        />

        <Button
          label={"Supprimer"}
          className={"bg-red-500 text-white"}
          onClick={handleDelete}
        />
      </div>
    </article>
  );
}
