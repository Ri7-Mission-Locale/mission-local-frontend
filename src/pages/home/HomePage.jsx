
import NewsCarousel from "../../components/NewsCarousel";
import WorkshopCarousel from "../../components/WorkshopCarousel";
import Toppbar from "../../partials/Topbar";

export default function HomePage() {
  return (
    <>
      <Toppbar />
      <section>
        <NewsCarousel />
      </section>
      <section className="pt-20">
        <h2 className="text-center font-bold text-2xl">ATELIERS</h2>
        <WorkshopCarousel />
      </section>
    </>
  );
}

