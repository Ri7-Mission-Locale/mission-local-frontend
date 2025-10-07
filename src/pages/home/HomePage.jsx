
import NewsCarousel from "../../components/NewsCarousel";
import WorkshopCarousel from "../../components/WorkshopCarousel";
import DefaultLayout from "../../layouts/DefaultLayout";

export default function HomePage() {
  return (
    <DefaultLayout>
      <section>
        <NewsCarousel />
      </section>
      <section className="pt-20">
        <h2 className="text-center font-bold text-2xl">ATELIERS</h2>
        <WorkshopCarousel />
      </section>
    </DefaultLayout>
  );
}

