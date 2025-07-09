import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { workshopMock } from "../data/workshopMockData";
import Button from "./Button";
import { useEffect, useState } from "react";
import api from "../api/fetcher";

export default function WorkshopCarousel() {

  const [workshop, setWorkshop] = useState([]);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const data = await api.get("/workshops");
        console.log(data);

        setWorkshop(data.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchWorkshop();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.

    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
      partialVisibilityGutter: 100,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 100,
    },
  };



  const workShopTest = workshop.map((el) => {
    return (
      <article className="p-3 flex flex-col gap-3  ">
        <img
          className="m-auto rounded-t-2xl w-[430px] h-[285px] md:w-[400px] md:h-[200px] object-cover"
          src={import.meta.env.VITE_API_URL + "/" + el.imagePath}
          alt="workshop picture"
        />{" "}
        <h3 className="font-bold text-center">{el.title}</h3>
        <Button className="bg-primary hover:brightness-115 text-white max-w-[430px] m-auto">Plus d'infos</Button>
      </article>
    );
  });

  return (
    <>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlaySpeed={10000}
        autoPlay={true}
        renderDotsOutside={false}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={[]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className="m-auto max-w-[1040px]"
      >
        {workShopTest}
      </Carousel>
    </>
  );
}
