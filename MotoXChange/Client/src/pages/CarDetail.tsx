import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCarCrash, FaCar, FaGasPump, FaRoad, FaCogs, FaChair, FaTag, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import { Button } from "../components/ui/button.tsx";
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card.tsx";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel.tsx";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import { Skeleton } from "../components/ui/skeleton.tsx";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../components/ui/dialog.tsx";
import { Checkbox } from "../components/ui/checkbox.tsx";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Popup state
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  const [showOwnerDetails, setShowOwnerDetails] = useState(false); // Show owner details

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
        console.log(response.data)
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className="p-6 w-96 text-center shadow-lg border border-gray-300">
          <CardContent>
            <FaCarCrash className="text-red-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Car Not Found</h2>
            <p className="text-gray-600 mb-4">
              The car you are looking for does not exist or has been removed.
            </p>
            <Button onClick={() => navigate("/")} className="bg-blue-600 text-white">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-screen flex p-6 px-5">
      {/* Left: Auto-Swiping Carousel */}
      <div className="w-4/6 h-[60vh]">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{car?.brand} {car?.model}</CardTitle>
            </CardHeader>
            <Carousel
              plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
              className="w-full h-full"
            >
              <CarouselContent className="w-full h-full">
                {car?.images?.map((src: any, index) => (
                  <CarouselItem key={index} className="w-full h-full">
                    <Card className="h-full w-full">
                      <CardContent className="flex items-center justify-center w-full h-full overflow-hidden p-0">
                        <img src={src} alt={`Car ${index + 1}`} className="w-full max-h-90 object-cover rounded-lg" />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </>
        )}

        {/* Car Specifications Table Below Image */}
        <Card className="bg-white p-4 mt-4 rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-900 text-center">Car Specifications </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 space-y-5 text-blue-900 font-bold text-xl">
            <div className="flex items-center gap-2 border-r-2 border-l-2 pl-2 border-blue-700 pr-2"><FaCar /> {car?.brand}</div>
            <div className="flex items-center gap-2 border-r-2 border-blue-700 pr-2"><FaTag /> {car?.model}</div>
            <div className="flex items-center gap-2"><FaCalendarAlt /> {car?.year}</div>
            <div className="flex items-center gap-2 border-r-2 border-blue-700 border-l-2 pl-2 pr-2"><FaMoneyBillWave /> ₹{car?.price?.toLocaleString()}</div>
            <div className="flex items-center gap-2 border-r-2 border-blue-700 pr-2"><FaGasPump /> {car?.fuelType}</div>
            <div className="flex items-center gap-2"><FaCogs /> {car?.transmission}</div>
            <div className="flex items-center gap-2 border-r-2 border-blue-700 pr-2 border-l-2 pl-2"><FaRoad /> {car?.mileage} km</div>
            <div className="flex items-center gap-2 border-r-2 border-blue-700 pr-2"><FaChair /> {car?.seats}</div>
            <div className="flex items-center gap-2"><FaMapMarkerAlt /> {car?.location?.city}, {car?.location?.state}</div>
            <div className="flex items-center gap-2 col-span-3 justify-center border-t pt-2"><FaInfoCircle /> {car?.status}</div>
          </CardContent>
        </Card>
      </div>

      {/* Right: Car Details */}
      <div className="w-2/6 px-6 flex flex-col justify-start">
        {loading ? (
          <Skeleton className="w-full h-32" />
        ) : (
          <>
            {/* Description */}
            <Card className="p-1 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-900">About this Car</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg">{car?.description}</p>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-blue-100 p-2 rounded-lg shadow-md mt-4 text-center">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-blue-900">🚗 Interested in this car?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">This amazing {car?.brand} {car?.model} is getting attention!  
                  Grab it before someone else does. ⏳🔥
                </p>
                <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-800" onClick={() => setIsDialogOpen(true)}>
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Contact Seller Dialog */}
      {/* Contact Seller Dialog */}
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogContent className="p-6 rounded-lg shadow-xl">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold text-blue-900 flex items-center gap-2">
        📞 Contact Seller
      </DialogTitle>
    </DialogHeader>

    {!showOwnerDetails ? (
      <>
        <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-md">
          <Checkbox
            id="terms"
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked === true)}
          />
          <label htmlFor="terms" className="text-md text-gray-700 cursor-pointer">
            I accept the <span className="text-blue-600 font-semibold">Terms and Conditions</span>
          </label>
        </div>
        <DialogFooter className="flex justify-end">
          <Button
            disabled={!isChecked}
            onClick={() => setShowOwnerDetails(true)}
            className={`mt-3 px-4 py-2 text-lg font-semibold transition ${
              isChecked ? "bg-blue-600 hover:bg-blue-800 text-white" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Proceed
          </Button>
        </DialogFooter>
      </>
    ) : (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <FaUser className="text-blue-600" /> {car?.owner?.name}
        </p>
        <p className="text-lg text-gray-700 flex items-center gap-2">
          <FaEnvelope className="text-blue-600" /> {car?.owner?.email}
        </p>
        <p className="text-lg text-gray-700 flex items-center gap-2 mt-2">
          <FaPhone className="text-blue-600" /> {car?.owner?.phone}
        </p>
      </div>
    )}
  </DialogContent>
</Dialog>

    </div>
  );
}

export default CarDetail;
