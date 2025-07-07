import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { carouselItems } from "../data/carouselTest";
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
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const newsTest = news.map((el) => {
    return (
      <div>
        <img className="m-auto rounded-3xl w-[430px] h-[285px] md:w-[100%] md:h-[532px] " src={el.imagePath} alt="news picture" />{" "}
      </div>
    );
  });

  return (
    <>

      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        infinite={true}
        autoPlaySpeed={10000}
        autoPlay={true}
        renderDotsOutside={false}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className="md:w-full m-auto"
        arrows={false}

      >
        {newsTest}
      </Carousel>

    </>
  );
}
