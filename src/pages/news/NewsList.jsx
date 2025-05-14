import NewsCard from "../../components/NewsCard"
import { mockNews } from "../../data/newsMockData"




export default function NewsList(){
      const listNews = mockNews.map((el) => (
        <NewsCard
          key={el.id}
          tag={el.tag}
          title={el.title}
          img={el.img}
          description={el.description}
        />
      ));

    return(
        <>
         <section className=" flex flex-col gap-10" >
        <h2 className="mx-auto font-extrabold text-3xl">Actualités</h2>
        {listNews}
      </section>
        </>
    )
}