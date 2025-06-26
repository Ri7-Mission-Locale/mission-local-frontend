import NewsCarousel from "../../components/NewsCarousel";
import WorkshopCarousel from "../../components/WorkshopCarousel";

export default function HomePage() {
  return (
    <>
      <section>
        <NewsCarousel />
      </section>
      <section className="pt-20">
        <h2 className="text-center font-bold text-2xl">ATELIERS</h2>
        <WorkshopCarousel/>
      </section>
    </>
  );
}
