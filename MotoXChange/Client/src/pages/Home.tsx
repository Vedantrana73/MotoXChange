import React, { useState } from 'react';
import background from '../assets/homebackground.jpeg';
import logo from '../assets/logo.png';
import ServiceCard from '../components/ServiceCard.tsx';
import service1 from '../assets/service1.avif';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.avif';
import service4 from '../assets/service4.jpg';
import service5 from '../assets/service5.jpg';
import { Marquee } from "../components/ui/marquee.tsx";
import tatamotors from '../assets/tatamotors.png';
import suzuki from '../assets/suzuki.png';
import hyundai from '../assets/hyundai.png';
import bmw from '../assets/bmw.jpg';
import landrover from '../assets/landrover.png';
const reviews = [
  { name: "Amit Verma", location: "Mumbai, Maharashtra", review: "Bought a car at a great price. The process was smooth, and the seller was genuine.", img: "https://avatar.vercel.sh/amit", date: "2 days ago" },
  { name: "Pooja Sharma", location: "Delhi, India", review: "Great experience! Found the exact car I was looking for, and the seller was very cooperative.", img: "https://avatar.vercel.sh/pooja", date: "5 days ago" },
  { name: "Rahul Iyer", location: "Bangalore, Karnataka", review: "The car was in excellent condition, just as described. Highly recommended!", img: "https://avatar.vercel.sh/rahul", date: "1 week ago" },
  { name: "Neha Kapoor", location: "Pune, Maharashtra", review: "Quick and easy process. The seller provided all the necessary documents.", img: "https://avatar.vercel.sh/neha", date: "1 week ago" },
  { name: "Vikram Mehta", location: "Hyderabad, Telangana", review: "Trustworthy platform. Sold my car within a few days without any hassle.", img: "https://avatar.vercel.sh/vikram", date: "2 weeks ago" },
];

const services = [
  { title: "Buy Used Cars", description: "Browse and purchase pre-owned cars from various sellers.", image: service1 },
  { title: "Sell Your Car", description: "List your used car for free and connect with buyers.", image: service2 },
  { title: "Wide Selection of Cars", description: "Explore different brands, models, and price ranges.", image: service3 },
  { title: "Direct Communication", description: "Contact sellers directly without middlemen.", image: service4 },
  { title: "Reliable Customer Support", description: "Get assistance from our support team for a smooth buying and selling experience.", image: service5 },
];

const makes = [
  { name: "Tata Motors", image: tatamotors },
  { name: "Maruti Suzuki", image: suzuki },
  { name: "Hyundai", image: hyundai},
  { name: "BMW", image: bmw },
  { name: "Land Rover", image: landrover},
];

type Filter = 'make' | 'fuel' | 'price';

function Home() {
  const [filterCategory, setFilterCategory] = useState<Filter>('make');

  return (
    <div>
      <div className="h-90 md:h-110 w-full bg-cover md:bg-center py-5 md:py-8 px-3" style={{ backgroundImage: `url(${background})` }}>
        <div className='flex items-center text-4xl md:text-5xl lg:text-6xl text-gray-400 font-bold'>
          <span>Welcome to</span> <img src={logo} alt="Logo" className='h-30 w-30 md:h-40 md:w-40' />
        </div>
        <div className='text-3xl md:text-4xl lg:text-5xl text-white font-bold'>
          <div>Buy.</div>
          <div>Sell.</div>
          <div>Drive.</div>
          <div>Repeat</div>
        </div>
      </div>

      {/* <div className='px-3 pt-12 py-2 flex items-center gap-3'>
        <div className="border-l-4 border-blue-500 pl-3">
          <span className="text-2xl md:text-3xl font-bold">Find By Category</span>
        </div>
        <hr className="h-0.5 w-full bg-black dark:bg-white border-0" />
      </div>

      <div className='px-3 py-2'>
        <div className='flex gap-5'>
          {['make', 'fuel', 'price'].map(category => (
            <div key={category} onClick={() => setFilterCategory(category as Filter)} className ={`font-semibold text-2xl border-2 p-2 rounded-lg border-black dark:border-white cursor-pointer ${filterCategory === category ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 text-black dark:text-white'}`}>
              Find By {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>

        <div className='h-12 w-sceen'>
          {filterCategory === 'make' && (
            <div className='h-full w-full flex flex-row justify-start items-start flex-wrap py-1 gap-3'>
              {makes.map(make => (
                <div key={make.name}>
                  <img src={make.image} alt={make.name} className='h-25 w-25' />
                </div>
              ))}
            </div>
          )}
          { filterCategory === 'fuel' && (
            <div className='h-full w-full flex flex-row justify-start items-start flex-wrap py-3 gap-3'>
              {['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'].map(fuel => (
                <div key={fuel} className='font-semibold text-lg border-2 p-2 rounded-lg border-black dark:border-white cursor-pointer bg-white dark:bg-gray-800 text-black dark:text-white'>
                  {fuel}
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}

      <div className="px-3 pt-20 flex items-center gap-3">
        <div className="border-l-4 border-blue-500 pl-3">
          <span className="text-2xl md:text-3xl font-bold">Our Features</span>
        </div>
        <hr className="h-0.5 w-full bg-black dark:bg-white border-0" />
      </div>

      <div className="px-5 py-3 gap-7 w-screen flex flex-col items-center flex-wrap md:h-100 overflow-scroll" style={{ scrollbarWidth: 'none' }}>
        {services.map(service => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>

      <div className='px-3 pt-12 py-2 flex items-center gap-3'>
        <div className="border-l-4 border-blue-500 pl-3">
          <span className="text-2xl md:text-3xl font-bold">What Our Customers Say</span>
        </div>
        <hr className="h-0.5 w-full bg-black dark:bg-white border-0" />
      </div>
      <div className='font-bold text-2xl px-3 pt-2 pb-3'>
        Your Satisfaction is Our Motivation!
      </div>

      <div className="relative flex flex-row items-center justify-center overflow-hidden max-h-80">
        <Marquee pauseOnHover className="[--duration:60s]">
          {reviews.map((review, index) => (
            <div key={index} className="flex border p-2 rounded-lg shadow-sm">
              <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full mr-2 md:mr-4 box-border break-words" />
              <div className='w-50 md:w-full'>
                <h3 className="text-sm md:text-lg font-semibold">{review.name}</h3>
                <p className="text-sm md:text-lg">{review.location} • {review.date}</p>
                <p className="mt-2 text-xs md:text-sm">{review.review}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Home;