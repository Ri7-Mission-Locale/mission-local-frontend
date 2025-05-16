import Button from "../../components/Button";
import Tag from "../../components/tag";
import { workshopMock } from "../../data/workshopMockData";

export default function WorkShopDetail() {
  const workshop = workshopMock[0];
  return (
    <article className=" rounded-xl w-4/5 m-auto border border-gray-300 flex flex-col gap-5 shadow-gray-400 shadow-md pt-5">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-4xl text-center">{workshop.title}</h2>
        <img  className="w-[90%] m-auto" src={workshop.img} alt="" />
        <label htmlFor="queue"></label>
        <progress
          id="queue"
          value="50"
          max="100"
          className="w-[90%] h-3 rounded-full m-auto overflow-hidden  "
          style={{ WebkitAppearance: "none", appearance: "none" }}
        ></progress>
      </div>

      <div className="w-[90%] m-auto border-b-1 pb-5">
        <p className="text-2xl font-bold pb-3">A propos de ce cours</p>
        <p>{workshop.description}</p>
      </div>

      <div className="w-[90%] m-auto">
        <h2 className="text-2xl font-bold pb-3">Détails</h2>
        <div>
          <ul >
            <li>Durée : {workshop.duration}h </li>
            <li>Date : {workshop.date} </li>
            <li>Nombre de places :   / {workshop.size}</li>
          </ul>
          <div className="tags pt-4  ">
            {workshop.tag.map((t, index) => (
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
  );
}
