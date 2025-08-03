import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../css/TestimonialCarousel.css";

// Remplace ceci par le bon chemin si nécessaire
import projectVideo from "../assets/project.mp4";

const testimonials = [
    {
      id: 1,
      name: "John Doe",
      image: "/images/john.jpg",
      text: "Great service and amazing results!",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "/images/jane.jpg",
      text: "Professional and prompt support!",
    },
    // Ajoutez d'autres témoignages ici
  ];
  
  const TestimonialCarousel = () => {
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      setTimeout(() => setLoaded(true), 500); // Simule le chargement
    }, []);
  
    return (
      <div className={`testimonial-carousel ${loaded ? "loaded" : ""}`}>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          onSlideChange={() => {}}
          onSwiper={(swiper) => {}}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="slide-content">
                <img src={t.image} alt={t.name} />
                <div className="overlay" />
                <div className="cite">
                  <h3>{t.name}</h3>
                  <p>{t.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
  
  export default TestimonialCarousel;