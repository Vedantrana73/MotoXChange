import React from 'react';
import background from '../assets/homebackground.jpeg';
import logo from '../assets/logo.png';
import ServiceCard from '../components/ServiceCard.tsx';
import service1 from '../assets/service1.avif';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.avif';
import service4 from '../assets/service4.jpg';
import service5 from '../assets/service5.jpg';
import { cn } from "../lib/utils.ts";
import { Marquee } from "../components/ui/marquee.tsx";

const reviews = [
  {
    name: "Amit Verma",
    location: "Mumbai, Maharashtra",
    review: "Bought a car at a great price. The process was smooth, and the seller was genuine.",
    img: "https://avatar.vercel.sh/amit",
    date: "2 days ago",
  },
  {
    name: "Pooja Sharma",
    location: "Delhi, India",
    review: "Great experience! Found the exact car I was looking for, and the seller was very cooperative.",
    img: "https://avatar.vercel.sh/pooja",
    date: "5 days ago",
  },
  {
    name: "Rahul Iyer",
    location: "Bangalore, Karnataka",
    review: "The car was in excellent condition, just as described. Highly recommended!",
    img: "https://avatar.vercel.sh/rahul",
    date: "1 week ago",
  },
  {
    name: "Neha Kapoor",
    location: "Pune, Maharashtra",
    review: "Quick and easy process. The seller provided all the necessary documents.",
    img: "https://avatar.vercel.sh/neha",
    date: "1 week ago",
  },
  {
    name: "Vikram Mehta",
    location: "Hyderabad, Telangana",
    review: "Trustworthy platform. Sold my car within a few days without any hassle.",
    img: "https://avatar.vercel.sh/vikram",
    date: "2 weeks ago",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure className={cn("relative h-full min-w-48 cursor-pointer overflow-hidden rounded-xl border p-4", "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]", "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]")}> 
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

function Home() {
  const services = [
    { title: "Buy Used Cars", description: "Browse and purchase pre-owned cars from various sellers.", image: service1 },
    { title: "Sell Your Car", description: "List your used car for free and connect with buyers.", image: service2},
    { title: "Wide Selection of Cars", description: "Explore different brands, models, and price ranges.", image: service3},
    { title: "Direct Communication", description: "Contact sellers directly without middlemen.", image: service4 },
    { title: "Reliable Customer Support", description: "Get assistance from our support team for a smooth buying and selling experience.", image: service5 },
  ];
  return (
    <div>
      <div className="h-90 md:h-110 w-full bg-cover md:bg-center py-5 md:py-8 px-3 opacity-100" style={{ backgroundImage: `url(${background})` }}>
        <div className='flex items-center text-4xl md:text-5xl lg:text-6xl text-gray-400 font-bold'>
          <span>Welcome to</span> <img src={logo} alt="" className='h-30 w-30 md:h-40 md:w-40' />
        </div>
        <div className='text-3xl md:text-4xl lg:text-5xl text-white font-bold'>
          <div>Buy.</div>
          <div>Sell.</div>
          <div>Drive.</div>
          <div>Repeat</div>
        </div>
      </div>
      <div className='px-3 pt-12 py-2 flex items-center gap-3'>
      <div className="border-l-4 border-blue-500 pl-3">
          <span className="text-2xl md:text-3xl font-bold">Find By Category</span>
        </div>
        <hr className="h-0.5 w-full bg-black dark:bg-white border-0" />
      </div>

      <div>
        <div></div>
      </div>

      <div className="px-3 pt-10 flex items-center gap-3">
        <div className="border-l-4 border-blue-500 pl-3">
          <span className="text-2xl md:text-3xl font-bold">Our Features</span>
        </div>
        <hr className="h-0.5 w-full bg-black dark:bg-white border-0" />
      </div>
      <div className="px-5 py-3 gap-7 w-screen flex flex-col items-center flex-wrap md:h-100 overflow-scroll" style={{scrollbarWidth: 'none'}}>
        {services.map((service) => (
          <ServiceCard title={service.title} description={service.description} image={service.image} key={service.title} />
        ))}
      </div>
      
      {/* Marquee Section */}
      <div className='px-3 pt-12 py-2 flex items-center gap-3'>
      <div className="border-l-4 border-blue-500 pl-3">
          <span className="text-2xl md:text-3xl font-bold">What Our Customers Say</span>
        </div>
        <hr className="h-0.5 w-full bg-black dark:bg-white border-0" />
        
      </div>
      <div className='font-bold text-2xl px-3 pt-2 pb-3'>
        Your Satisfaction is Our Motivation!
      </div>
      <div className="md:hidden relative flex flex-row items-center justify-center overflow-hidden max-h-80">
        <Marquee pauseOnHover vertical className="[--duration:60s]">
        {reviews.map((review, index) => (
          <div key={index} className="flex border p-4 rounded-lg shadow-sm bg-white">
            <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-500">{review.location} • {review.date}</p>
              <p className="mt-2 text-gray-700">{review.review}</p>
            </div>
          </div>
        ))}
        </Marquee>
      </div>
      <div className="hidden lg:flex relative flex-row items-center justify-center overflow-hidden max-h-80">
        <Marquee pauseOnHover className="[--duration:60s]">
        {reviews.map((review, index) => (
          <div key={index} className="flex border p-4 rounded-lg shadow-sm">
            <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <p className="text-sm">{review.location} • {review.date}</p>
              <p className="mt-2">{review.review}</p>
            </div>
          </div>
        ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Home;