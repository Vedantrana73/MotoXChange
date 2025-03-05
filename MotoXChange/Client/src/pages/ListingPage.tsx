import { useEffect, useState } from "react";
import useUserStore from "../store/userStore.ts";
import axios from "axios";

function ListingPage() {
  const user = useUserStore((state) => state.user);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/fetch/Punjab/Phagwara`);
        setCars(response.data);
      } catch (error) {
        setError("Failed to fetch car listings. Please try again.");
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="px-4 py-6">
      {/* Title */}
      <h1 className="text-3xl font-bold border-b-4 pb-4">
        Cars in <span className="text-blue-600">{user.city}</span>, <span className="text-blue-600">{user.state}</span>
      </h1>

      {/* Layout Wrapper */}
      <div className="flex gap-6 mt-6">
        {/* Sidebar (Future Filters Section) */}
        <div className="w-1/4 border-r-2 min-h-[350px] p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Filters</h2>
          <p>Coming soon...</p>
        </div>

        {/* Cars List */}
        <div className="flex flex-wrap gap-4 p-2 w-full overflow-y-auto" style={{scrollbarWidth: "none"}}>
          {error && <p className="text-red-500">{error}</p>}
          {cars.length === 0 && !error ? (
            <p className="text-gray-500">No cars available in this location.</p>
          ) : (
            cars.map((car, index) => (
              <div
                key={index}
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
