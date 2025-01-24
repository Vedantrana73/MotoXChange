
import HeroImage from '../assets/HeroImage.jpg'
// import Featured from '../Components/Featured';

function Hero() {
  return (
    <div className="bg-black text-white">
      <div className="h-screen container flex flex-col justify-center md:flex-row items-center ">
        <div className="w-full md:w-2/4 space-y-5 mt-10 ml-2">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">Find Your Favorite Car With Us Today</h1>
          <p className="text-lg lg:text-2xl font-medium">Over 1000+ New Cars Available</p>
          <p className="text-sm lg:text-base">
          Explore a wide range of top-quality vehicles tailored to fit your needs. Whether you're looking for luxury, performance, or affordability, we’ve got you covered. Our curated collection ensures you’ll find the perfect car to match your lifestyle. Start your journey today and drive home your dream car with ease!
          </p>
          <div className="flex gap-8">
            <button className="btn text-base text-black bg-[#FFB300] border-2 border-yellow-600  rounded-md px-6 py-2 hover:scale-95 transition duration-150 ease-linear">
              Explore More
            </button>
            <button className="btn text-black bg-[#FFB300] border-2 border-yellow-600  rounded-md text-base px-6 py-2 hover:scale-95 transition duration-150 ease-linear">
              Buy Cars
            </button>
          </div>
        </div>
        <div className="w-full md:w-2/4 mt-4">
            <img src={HeroImage} alt="img" />
        </div>
      </div>
      {/* <Featured /> */}
    </div>
  );
}

export default Hero;
