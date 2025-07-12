import WorkshopCard from "@components/WorkshopCard.jsx";
import { useEffect, useState } from "react";
import api from "../../api/fetcher";
import DefaultLayout from "../../layouts/DefaultLayout";


export default function WorkShopList() {
  const [workshop, setWorkshop] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await api.get("workshops");
        console.log(data);

        setWorkshop(data.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchNews();
  }, []);


  return (
    <DefaultLayout>
      <section className=" flex flex-col gap-10" >
        <h2 className="mx-auto font-extrabold text-3xl mt-10">ATELIERS</h2>
        {workshop.map((el) => (
          <WorkshopCard
            key={el.id}
            tag={el.tag}
            title={el.title}
            img={import.meta.env.VITE_API_URL + "/" + el.imagePath}
            size={el.size}
            description={el.description}
            date={el.date}
            duration={el.duration}
            id={el.id}
          />
        ))}
      </section>
    </DefaultLayout>
  );
}
