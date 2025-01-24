import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeatureCard from "./FeatureCard";

function Featured() {
  const carsData = [
    {
      id: 0,
      img: "src/assets/HeroImage.jpg", 
      name: "BMW",
      price: "4,24,269",
    },
    {
      id: 1,
      img: "src/assets/HeroImage.jpg",
      name: "Audi",
      price: "5,50,000",
    },
    {
      id: 2,
      img: "src/assets/HeroImage.jpg",
      name: "Mercedes",
      price: "7,00,000",
    },
    {
      id: 3,
      img: "src/assets/HeroImage.jpg",
      name: "Tesla",
      price: "8,50,000",
    },
    {
      id: 4,
      img: "src/assets/HeroImage.jpg",
      name: "Ford",
      price: "3,00,000",
    },
    {
      id: 5,
      img: "src/assets/HeroImage.jpg",
      name: "Chevrolet",
      price: "2,75,000",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mt-14">
      <h1 className="font-bold text-4xl text-center mb-4">
        Featured <span className="text-[#FFB300]">Cars</span>
      </h1>

      <p className="text-center text-gray-600 mb-8 px-4">
        Discover the best deals on top-quality cars. Whether you're looking for
        luxury, performance, or affordability, we've got you covered.
      </p>

      <div className="w-auto">
        <Slider {...settings}>
          {carsData.map((car) => (
            <FeatureCard
              key={car.id}
              img={car.img}
              name={car.name}
              price={car.price}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Featured;
