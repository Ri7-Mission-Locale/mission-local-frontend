import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import api from "../api/fetcher";

export default function NewsCarousel() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await api.get("news");
        console.log(data);

        setNews(data.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchNews();
  }, []);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.

    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const newsCarrousel = news.map((el) => {
    return (
      <div key={el.id} className="relative m-auto max-w-600 h-120 w-full">
        <img
          className="h-full w-full object-cover object-center"
          src={import.meta.env.VITE_API_URL + "/" + el.imagePath}
          alt="news picture"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-slate-900 to-transparent p-10">
          <h3 className="text-white text-3xl font-bold">
            {el.title}
          </h3>
        </div>

      </div>

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
        containerClass="carousel-container m-5"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className="md:w-full m-auto rounded-b-3xl overflow-hidden"
        arrows={true}

      >
        {newsCarrousel}
      </Carousel>

    </>
  );
}
