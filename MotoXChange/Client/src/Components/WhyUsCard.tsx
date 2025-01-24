import React from "react";

function WhyUsCard({
  icon,
  title,
  message
}: {
  icon: React.ReactNode; 
  title: string;
  message: string;
}) {
  return (
    <div className="text-center p-8 space-y-4 bg-slate-300 hover:bg-gray-900 cursor-pointer hover:text-white transition duration-200 ease-in-out rounded-md">
      <p className="text-[#FFB300] text-3xl font-bold">{icon}</p>
      <h1>{title}</h1>
      <p className="text-sm">
        {message}
      </p>
    </div>
  );
}

export default WhyUsCard;
