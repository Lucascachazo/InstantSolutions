import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Slide from './Slide';

const pics = [{
  src: '/assets/sliderImg/slide1.jpg',
  txt: "¿Qué servicio para tu casa necesitas hoy?"
}, {
  src: '/assets/sliderImg/slide2.jpg',
  txt: "Te ofrecemos el mejor servicio "
}, {
  src: '/assets/sliderImg/slide3.jpg',
  txt: "Tenemos a los mejores profesionales para vos"
}, {
  src: '/assets/sliderImg/slide4.jpg',
  txt: "Contratá con confianza y olvidate del chanta"
}, {
  src: '/assets/sliderImg/slide5.jpg',
  txt: "Comprendemos tu urgencia, pensamos en vos "
}, {
  src: '/assets/sliderImg/slide6.jpg',
  txt: "Podes elegir entre los mejores "
}, {
  src: '/assets/sliderImg/slide7.jpg',
  txt: "La decisión es tuya, hacé click y relajate"
}
]

const SlideShow = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false
  };

  return (
    <>
      <div>
        <Slider {...settings}>
          {pics.map((slide, idx) => {
            return (
              <Slide slide={slide} key={idx} />
            )
          })}

        </Slider>
      </div>
    </>
  )
}

export default SlideShow
