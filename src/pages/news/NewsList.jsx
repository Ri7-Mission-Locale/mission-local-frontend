import { useEffect, useState } from "react";
import NewsCard from "@components/NewsCard";
import { get } from "@api/fetcher";

export default function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await get("news");
        setNews(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      <section className=" flex flex-col gap-10 md:w-[50%] m-auto">
        <h2 className="mx-auto font-extrabold text-3xl">Actualités</h2>
        {news?.map((el, i) => (
          <NewsCard
            key={i}
            tag={el.tag}
            title={el.title}
            img={el.imagePath}
            description={el.description}
            id={el.news_id}
          />
        ))}
      </section>
    </>
  );
}
