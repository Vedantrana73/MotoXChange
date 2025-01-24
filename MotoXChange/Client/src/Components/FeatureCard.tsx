function FeatureCard({
  key,
  img,
  name,
  price,
}: {
  key: number;
  img: string;
  name: string;
  price: string;
}) {
  return (
    <div className="p-4 border border-black bg-black rounded-lg shadow-md cursor-pointer hover:scale-95 transition duration-200 ease-linear mx-1">
      <img
        src={img}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl text-[#FFB300] font-semibold mt-2">
        {name}
        {key}
      </h2>
      <p className="text-[#FFB300] mt-1">Price: ₹{price}</p>
    </div>
  );
}

export default FeatureCard;
