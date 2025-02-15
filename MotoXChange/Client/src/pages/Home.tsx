import React from 'react';
import background from '../assets/homebackground.jpeg';
import logo from '../assets/logo.png';
import ServiceCard from '../components/ServiceCard.tsx';
import service1 from '../assets/service1.avif';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.avif';
import service4 from '../assets/service4.jpg';
import service5 from '../assets/service5.jpg';
function Home() {
  const services = [
    { title: "Buy Used Cars", description: "Browse and purchase pre-owned cars from various sellers.", image: service1 },
    { title: "Sell Your Car", description: "List your used car for free and connect with buyers.", image: service2},
    { title: "Wide Selection of Cars", description: "Explore different brands, models, and price ranges.", image: service3},
    { title: "Direct Communication", description: "Contact sellers directly without middlemen.", image: service4 },
    {
      title: "Reliable Customer Support",
      description: "Get assistance from our support team for a smooth buying and selling experience.",
      image: service5
    },
  ];
  return (
    <div>
      <div
        className="h-90 md:h-110 w-full bg-cover md:bg-center py-5 md:py-8 px-3 opacity-100"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className='flex items-center text-4xl md:text-5xl lg:text-6xl text-gray-400 font-bold'>
          <span>Welcome to</span> <img src={logo} alt="" className='h-30 w-30 md:h-40 md:w-40' />
        </div>
        <div className='text-3xl  md:text-4xl lg:text-5xl text-gray-400 font-bold'>
          <div>Buy.</div>
          <div>Sell.</div>
          <div>Drive.</div>
          <div>Repeat</div>
        </div>
      </div>

      <div className="px-3 py-3 flex items-center gap-3">
        <div className="border-l-4 border-blue-500 pl-3">
          <span className="text-2xl md:text-3xl font-bold">Our Features</span>
        </div>
        <hr className="h-0.5 w-full bg-black border-0" />
      </div>

      <div className="px-5 py-3 gap-7 w-screen flex flex-col items-center flex-wrap md:h-120 overflow-scroll" style={{scrollbarWidth: 'none'}}>
  {services &&
    services.map((service) => (
      <ServiceCard title={service.title} description={service.description} image={service.image} key={service.title} />
    ))}
</div>

    </div>
  );
}

export default Home;
