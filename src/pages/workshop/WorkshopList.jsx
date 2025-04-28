import WorkshopCard from "../../components/workshopCard";
import {workshopMock} from "../../data/workshopMockData";


export default function WorkshopList() {
  const listWorkshop = workshopMock.map((el) => (
    <WorkshopCard
      key={el.id}
      tag={el.tag}
      title={el.title}
      img={el.img}
      size={el.size}
      description={el.description}
      date={el.date}
      duration={el.duration}
    />
  ));

  return (
    <>
      <section className=" flex flex-col gap-10" >
        <h2 className="mx-auto font-extrabold text-3xl">ATELIERS</h2>
        {listWorkshop}
      </section>
    </>
  );
}
