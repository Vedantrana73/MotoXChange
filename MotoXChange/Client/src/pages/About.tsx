import React from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Avatar } from "../components/ui/avatar.tsx";
import { FaReact, FaNodeJs, FaDatabase, FaCar, FaHeadset } from "react-icons/fa";
import { SiExpress, SiMongodb, SiShadcnui, SiTailwindcss } from "react-icons/si";
import ved from '../assets/pfpnew.jpg';
import akshat from '../assets/image.png';

function AboutUs() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        Welcome to <span className="font-bold">MotoXChange</span> – a platform designed to make car buying and selling 
        faster, smarter, and more transparent. Whether you're looking to sell your vehicle 
        effortlessly or find the perfect ride, we provide a seamless and reliable experience.
      </p>

      {/* Website Mission */}
      <div className="bg-gray-100 p-6 rounded-lg mb-8 shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Our Mission</h2>
        <p className="text-gray-700 text-center">
          At <span className="font-bold">MotoXChange</span>, our goal is to bridge the gap between car buyers and sellers
          by leveraging modern technology. We ensure secure transactions, verified listings,
          and a smooth user experience to redefine how people buy and sell vehicles online.
        </p>
      </div>

      {/* Key Features */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Why Choose MotoXChange?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <FaCar className="text-blue-500 text-4xl" />, title: "Verified Listings", desc: "All cars are verified to ensure authenticity and reliability." },
            { icon: <FaHeadset className="text-purple-500 text-4xl" />, title: "24/7 Customer Support", desc: "Our support team is available 24/7 to assist you with any queries." },
            { icon: <SiTailwindcss className="text-purple-500 text-4xl" />, title: "Modern UI/UX", desc: "A clean, responsive, and intuitive design for the best experience." },
          ].map((feature, index) => (
            <Card key={index} className="flex flex-col items-center p-6 hover:shadow-lg transition-shadow">
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <h2 className="text-2xl font-semibold text-center mb-6">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {[
          { name: "Vedant Rana", role: "Full Stack Developer", class: "SY BSC IT B-Division", sap: "53003230064", image: ved },
          { name: "Akshat Gohil", role: "Full Stack Developer", class: "SY BSC IT B-Division", sap: "53003230068", image: akshat },
        ].map((member, index) => (
          <Card key={index} className="flex flex-col items-center p-6 hover:shadow-lg transition-shadow">
            <Avatar className="w-24 h-24 mb-4">
              <img src={member.image} alt={`${member.name} - ${member.role}`} className="rounded-full" />
            </Avatar>
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
            <p className="text-gray-600">{member.class}</p>
            <p className="font-bold">{member.sap}</p>
          </Card>
        ))}
      </div>

      {/* Tech Stack Section */}
      <h2 className="text-2xl font-semibold text-center mb-4">Our Tech Stack</h2>
      <p className="text-center text-gray-700 mb-4">
        Built using cutting-edge technologies to ensure  performance, scalability, and security .
      </p>
      <div className="flex justify-center gap-6 text-4xl text-gray-700">
        {[
          { icon: <FaReact className="text-blue-500" />, name: "React" },
          { icon: <FaNodeJs className="text-green-600" />, name: "Node.js" },
          { icon: <SiExpress className="text-gray-900" />, name: "Express.js" },
          { icon: <SiMongodb className="text-green-700" />, name: "MongoDB" },
          { icon: <SiShadcnui className="text-purple-500" />, name: "ShadCN" },
          { icon: <SiTailwindcss className="text-blue-400" />, name: "Tailwind CSS" },
        ].map((tech, index) => (
          <div key={index} className="flex flex-col items-center group">
            {tech.icon}
            <span className="text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      {/* Vision & Future Plans */}
      <div className="bg-gray-100 p-6 rounded-lg mt-10 shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Our Vision</h2>
        <p className="text-gray-700 text-center">
          We believe that buying or selling a car should be  easy, transparent, and hassle-free .
          Our team is constantly working to integrate new features like  AI-powered price estimates, 
          instant verification, and more  to make MotoXChange the ultimate platform for automotive transactions.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
