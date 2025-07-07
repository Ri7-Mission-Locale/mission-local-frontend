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
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const newsCarrousel = news.map((el) => {
    return (
<div key={el.id} className="relative rounded-3xl overflow-hidden m-auto max-w-600 max-h-100 w-full">
  <img
    className="w-full h-full object-contain rounded-3xl"
    src={el.imagePath}
    alt="news picture"
  />
  <h3 className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 rounded">
    {el.title}
  </h3>
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
        {newsCarrousel}
      </Carousel>

    </>
  );
}
