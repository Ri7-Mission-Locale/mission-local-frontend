import Button from "./Button";
import Tag from "./tag";



export default function NewsCard( { title,
    img,
    tag,
    description,
    key} ){
    return(
<>
      <article
        key={key}
        className=" rounded-xl w-4/5 m-auto border border-gray-300 flex flex-col gap-5 shadow-gray-400 shadow-md"
      >
        <div className="flex flex-col gap-2">
          <img className="rounded-t-xl" src={img} alt="" />
          <div className="tags w-[80%] m-auto ">
            {tag.map((t, index) => (
              <Tag key={index} text={t.tag_name} color={t.color} />
            ))}
          </div>
        </div>

        <div className="w-[80%] m-auto">
          <h2 className="font-bold text-2xl">{title}</h2>
          <p>{description}</p>
        </div>

        <div className="flex justify-end p-4 mt-auto">
          <Button
            bgColor="bg-cyan-500"
            color="text-white"
            label="Plus d'infos"
            size="w-35"
          />
        </div>
      </article>
    </>
    )
}