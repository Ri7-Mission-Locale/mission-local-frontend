import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { workshopMock } from "../data/workshopMockData";
import Button from "./Button";

export default function WorkshopCarousel() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const workShopTest = workshopMock.map((el) => {
    return (
      <article className="p-3 flex flex-col gap-3  ">
        <img
          className="m-auto rounded-2xl w-[430px] h-[285px] md:w-[800px] md:h-[532px] "
          src={el.img}
          alt="workshop picture"
        />{" "}
        <h3 className="font-bold text-center">{el.title}</h3>
        <Button className="bg-cyan-500 text-white ">Plus d'infos</Button>
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
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className="md:w-[50%] m-auto"
      >
        {workShopTest}
      </Carousel>
    </>
  );
}
