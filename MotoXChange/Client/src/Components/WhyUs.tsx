import { FaShippingFast, FaUsers } from "react-icons/fa";
import { SiWebmoney } from "react-icons/si";
import WhyUsCard from "./WhyUsCard";

function WhyUs() {
  const icon1 = <SiWebmoney className="mx-auto" />;
  const icon2 = <FaUsers className="mx-auto" />;
  const icon3 = <FaShippingFast className="mx-auto" />;

  return (
    <div className="flex flex-col justify-center container py-10 md:mt-16">
      <div className="text-center mb-10">
        <h1 className="font-bold text-4xl">
          Why Choose <span className="text-[#FFB300]">MotoXChange</span>?
        </h1>
        <p className="text-gray-600 mt-4 px-4 md:px-20 lg:px-40">
          Discover why MotoXChange is the trusted choice for thousands of
          customers. From flexible financing options to seamless booking
          processes, we ensure your car-buying experience is unparalleled.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <WhyUsCard
          icon={icon1}
          title="Financing Options"
          message="We provide flexible financing solutions designed to suit every budget, ensuring you can drive home your dream car without financial stress. Explore a range of plans and get personalized assistance every step of the way."
        />
        <WhyUsCard
          icon={icon2}
          title="Satisfied Customers"
          message="With thousands of happy customers and glowing reviews, our commitment to excellence speaks for itself. Experience unmatched service, quality assurance, and support that makes your journey with us unforgettable."
        />
        <WhyUsCard
          icon={icon3}
          title="Fast & Easy Booking"
          message="Say goodbye to long waiting times and complicated procedures. Our streamlined booking process ensures you can find, reserve, and drive your perfect car in no time, giving you more moments to enjoy the ride."
        />
      </div>
    </div>
  );
}

export default WhyUs;
