import Button from "../../components/Button";
import Tag from "../../components/tag";
import { mockNews } from "../../data/newsMockData";

export default function NewsDetail(){
const news = mockNews[0];
    return(
  <article className=" rounded-xl w-4/5 m-auto border border-gray-300 flex flex-col gap-5 shadow-gray-400 shadow-md pt-5">
      <div className="flex flex-col gap-2 w-[80%] m-auto ">
        <h2 className="font-bold text-4xl">{news.title}</h2>
        <img className="" src={news.img} alt="" />
           <div className="tags pt-4   ">
                    {news.tag.map((t, index) => (
                      <Tag key={index} text={t.tag_name} color={t.color} />
                    ))}
                  </div>
      </div>

      <div className="w-[80%] m-auto  border-b-1  pb-5">
        <p>{news.description}</p>
      </div>

      <p className="w-[80%] m-auto">Rédigé le {news.createdAt.split("T")[0]} </p>

     
    </article>

    )
}