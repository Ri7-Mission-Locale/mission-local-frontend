import { useEffect, useState } from "react";
import Button from "@components/Button";
import Tag from "@components/Tag";
import api from "@api/fetcher";
import { data, useNavigate, useParams } from "react-router";
import Input from "@components/inputs/Input.jsx";
import { ToastContainer, toast } from "react-toastify";

export default function NewsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  //// Fetch la news par ID

const fetchNews = async () => {
  try {
    const data = await api.get(`news/${id}`);
    setNews(data.data);

    setFormData({
      title: data.title,
      description: data.description,
    });
  } catch (err) {
    setError(err.message);
    console.log(err);
  }
};


 useEffect(() => {
  fetchNews();
}, []);


  //// Supprime la news selectionné
  const handleDelete = async () => {
    try {

      await api.delete(`news/${id}`);
      toast.success("Actualité supprimée !");
      setTimeout(() => {
        navigate("/news/list");
      }, 1500);
    } catch (err) {
      toast.error("Erreur lors de la suppression");
      console.log("Erreur lors de la suppression :", err);
    }
  };

  //Modifie la news

const handlePatch = async () => {
  try {
    await api.patch(`news/${id}`, formData);
    toast.success("Actualité mise à jour !");
    fetchNews(); 
  } catch (err) {
    toast.error("Erreur lors de la modification !");
    console.log("Erreur lors de la mise à jour :", err);
  }
};

  //Passe en mode modification
  function handleClick() {
    if (isEditing) {
      console.log("Data : ", formData);
      handlePatch();
    }
    setIsEditing(!isEditing);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <article className=" rounded-xl w-4/5 m-auto  flex flex-col gap-5  pt-5 md:w-[50%] border   ">
        <div className="flex flex-col gap-2 w-[80%] m-auto ">
          {isEditing ? (
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          ) : (
            <h2 className="font-bold text-4xl text-center pb-5">
              {news.title}
            </h2>
          )}

          <img className="pb-3" src={news.imagePath} alt="image actualité" />
          {Array.isArray(news.tag) && news.tag.length > 0 && (
            <div className="tags w-[80%]">
              {news.tag.map((t, index) => (
                <Tag key={index} text={t.tag_name} color={t.color} />
              ))}
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="w-[80%] m-auto flex flex-col gap-1">
            <label
              htmlFor="description"
              className="font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="rounded-md border border-gray-300 p-3 resize-y min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ) : (
          <div className="w-[80%] m-auto border-b-2 pb-5 ">
            <p>{news.description}</p>
          </div>
        )}

        <p className="w-[80%] m-auto">
          Rédigé le {news.createdAt?.split("T")[0]}{" "}
        </p>

        <div className="m-auto flex gap-10 pb-5">
          <Button
            className={
              isEditing ? "bg-green-500 text-white" : "bg-orange-500 text-white"
            }
            onClick={handleClick}
          >
            {isEditing ? "Valider" : "Modifier"}
          </Button>

          <Button className={"bg-red-500 text-white"} onClick={handleDelete}>
            Supprimer
          </Button>
        </div>
        <ToastContainer
        hideProgressBar={true} />
      </article>
    </div>
  );
}
