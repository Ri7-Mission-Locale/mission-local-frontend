import Button from "@components/Button";
import Tag from "@components/Tag";
import api from "../../api/fetcher";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DefaultLayout from "../../layouts/DefaultLayout.jsx"

export default function WorkShopDetail() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [workshop, setWorkshop] = useState([]);

  const fetchWorkshop = async () => {
    try {
      const data = await api.get(`workshops/detail/${id}`);
      console.log(data);

      setWorkshop(data.data);

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
    fetchWorkshop();
  }, []);

  return (
    <DefaultLayout>
      <article className="mt-20 rounded-xl w-4/5 m-auto max-w-[600px] border border-gray-300 flex flex-col gap-5 shadow-gray-400 shadow-md pt-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-4xl text-center">{workshop.title}</h2>
          <div className="w-[90%] m-auto max-w-md aspect-video">
            <img
              className="w-full h-full object-cover rounded-lg "
              src={import.meta.env.VITE_API_URL + "/" + workshop.imagePath}
              alt=""
            />
          </div>
          <label htmlFor="queue"></label>
          <progress
            id="queue"
            value="50"
            max="100"
            className="w-[90%] h-3 rounded-full m-auto overflow-hidden"
            style={{ WebkitAppearance: "none", appearance: "none" }}
          ></progress>
        </div>

        <div className="w-[90%] m-auto border-b-1 pb-5">
          <p className="text-2xl font-bold pb-3">A propos de cet atelier :</p>
          <p>{workshop.description}</p>
        </div>

        <div className="w-[90%] m-auto">
          <h2 className="text-2xl font-bold pb-3">Détails : </h2>
          <div>
            {/*
              <ul>
              <li>Durée : {workshop.duration}h </li>
              <li>Date : {workshop.date.split("T")[0]} </li>
              <li>Nombre de places : {workshop.events[0].size}</li>
            </ul>
            */}

            <div className="tags pt-4  ">
              {workshop.tag?.map((t, index) => (
                <Tag key={index} text={t.tag_name} color={t.color} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center p-4 mt-auto">
          <Button
            bgColor="bg-cyan-500"
            color="text-white"
            label="S'inscrire"
            size="w-35"
          />
        </div>
      </article>
    </DefaultLayout>

  );
}
