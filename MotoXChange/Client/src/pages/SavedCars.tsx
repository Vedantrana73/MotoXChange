import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCarStore from "../store/carStore.ts";
import axios from "axios";
import { Button } from "../components/ui/button.tsx"; // Assuming you have a Button component
import useUserStore from "../store/userStore.ts";
import { toast } from "sonner"; // Import Sonner

const CarList = () => {
    const {user}  = useUserStore();
  const { cars, setCars, removeCar } = useCarStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/owner/${user.userId}`); // Replace with actual owner ID
        setCars(response.data.cars||[]);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Failed to fetch car listings. Please try again.");
      }
    };

    fetchCars();
  }, [setCars, user.userId]);

  // Handle Car Removal

  const handleRemoveCar = async (carId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/delete/${carId}`); // Fix API URL
      removeCar(carId);
  
      // Show success toast
      toast.success("Car deleted successfully!");
    } catch (error) {
      console.error("Error removing car:", error);
  
      // Show error toast
      toast.error("Failed to delete the car. Please try again.");
    }
  };
  

  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">Car Listings</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* No Cars Available */}
      {cars.length === 0 && !error ? (
        <p className="text-gray-500 text-lg">No cars available in this location.</p>
      ) : (
        <div className="flex flex-wrap gap-4 p-2 w-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {cars.map((car) => (
            <div
              key={car._id}
              className="w-[350px] border rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              {/* Car Image */}
              <div className="h-55 border-b overflow-hidden rounded-t-xl">
                <img src={car.images[0]} alt={car.brand} className="h-full w-full object-cover" />
              </div>

              {/* Car Details */}
              <div className="p-3">
                <h2 className="text-lg font-semibold">{car.brand} {car.model}</h2>
                <p className="text-xl font-bold text-green-600">₹{car.price.toLocaleString()}</p>
                <p className="text-lg">{car.seats} Seater</p>
                <div className="text-sm text-center">Tap to view details</div>

                {/* Buttons Section */}
                <div className="mt-3 flex justify-between">
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-800 px-4 py-2 rounded-lg"
                    onClick={() => navigate("/car/" + car._id)}
                  >
                    View Details
                  </Button>

                  <Button
                    className="bg-red-600 text-white hover:bg-red-800 px-4 py-2 rounded-lg"
                    onClick={() => handleRemoveCar(car._id)}
                  >
                    Remove Car
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
