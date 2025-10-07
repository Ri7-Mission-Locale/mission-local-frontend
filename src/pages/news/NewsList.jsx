import { useEffect, useState } from "react";
import NewsCard from "@components/NewsCard";
import api from "@api/fetcher";
import DefaultLayout from "../../layouts/DefaultLayout";

export default function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await api.get("news");
        setNews(data.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchNews();
  }, []);

  return (
    <DefaultLayout>
      <section className=" flex flex-col gap-10 md:w-[50%] m-auto">
        <h2 className="mx-auto font-extrabold text-3xl mt-10">Actualités</h2>
        {news?.map((el, i) => (
          <NewsCard
            key={i}
            tag={el.tag}
            title={el.title}
            img={import.meta.env.VITE_API_URL + "/" + el.imagePath}
            description={el.description}
            id={el.news_id}
          />
        ))}
      </section>
    </DefaultLayout>
  );
}
