import { useEffect, useState } from "react";
import useUserStore from "../store/userStore.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../components/ui/dialog.tsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select.tsx";
import { cities } from "../lib/cities.ts";
import { brands } from "../lib/brands.ts";
import { Checkbox } from "../components/ui/checkbox.tsx";
import useCarStore from "../store/carStore.ts";

function ListingPage() {
  const { cars, setCars } = useCarStore();
  const user = useUserStore((state) => state.user);
  const { setUserField } = useUserStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  // Filters State
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);

  // Location Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(user.state);
  const [selectedCity, setSelectedCity] = useState(user.city);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/fetch/${user.state}/${user.city}`);
        setCars(response.data || []);
      } catch (error) {
        setError("Failed to fetch car listings. Please try again.");
      }
    };
    fetchCars();
  }, [user.state, user.city]);

  // Filter Cars based on selected filters
  const filteredCars = cars.filter((car) => 
    (selectedBrand ? car.brand === selectedBrand : true) &&
    (selectedModel ? car.model === selectedModel : true) &&
    (selectedFuelTypes.length > 0 ? selectedFuelTypes.includes(car.fuelType) : true)
  );

  // Apply Location Change
  const handleLocationChange = () => {
    setUserField("state", selectedState);
    setUserField("city", selectedCity);
    setIsDialogOpen(false);
  };

  return (
    <div className="px-4 py-6">
      {/* Title Section */}
      <div className="flex justify-between items-center border-b-4 pb-4">
        <h1 className="text-3xl font-bold">
          Cars in <span className="text-blue-600">{user.city}</span>, <span className="text-blue-600">{user.state}</span>
        </h1>
        <Button className="bg-blue-600 text-white hover:bg-blue-800" onClick={() => setIsDialogOpen(true)}>
          Change Location
        </Button>
      </div>

      {/* Layout Wrapper */}
      <div className="flex gap-6 mt-6">
        {/* Sidebar (Filters Section) */}
        <div className="w-1/4 border-r-2 min-h-[350px] p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Filters</h2>

          {/* Brand Filter */}
          <div className="mt-3">
            <label className="block font-semibold">Brand:</label>
            <select
              className="border p-2 w-full rounded-lg"
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedModel(""); // Reset model when brand changes
              }}
            >
              <option value="">All Brands</option>
              {Object.keys(brands).map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Model Filter */}
          <div className="mt-3">
            <label className="block font-semibold">Model:</label>
            <select
              className="border p-2 w-full rounded-lg"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedBrand}
            >
              <option value="">All Models</option>
              {selectedBrand &&
                brands[selectedBrand].map((car) => (
                  <option key={car.model} value={car.model}>{car.model}</option>
                ))}
            </select>
          </div>

          {/* Fuel Type Filter */}
          <div className="mt-3">
            <label className="block font-semibold">Fuel Type:</label>
            {["Petrol", "Diesel", "Hybrid", "Electric"].map((fuel) => (
              <div key={fuel} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedFuelTypes.includes(fuel)}
                  onCheckedChange={() => {
                    setSelectedFuelTypes((prev) =>
                      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
                    );
                  }}
                />
                <span>{fuel}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cars List */}
        <div className="flex flex-wrap gap-4 p-2 w-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {error && <p className="text-red-500">{error}</p>}
          {cars.length === 0 && !error ? (
            <p className="text-gray-500 text-lg">No cars available in this location.</p>
          ) : filteredCars.length === 0 && !error ? (
            <p className="text-gray-500 text-lg">No cars available with selected filters.</p>
          ) : (
            filteredCars.map((car, index) => (
              <div
                onClick={() => navigate("/car/" + car._id)}
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

      {/* Change Location Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="p-6 rounded-lg shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-900">Change Location</DialogTitle>
          </DialogHeader>
          
          {/* State and City Select */}
          <Select onValueChange={setSelectedState} defaultValue={selectedState}>
            <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
            <SelectContent>{Object.keys(cities).map((state) => <SelectItem key={state} value={state}>{state}</SelectItem>)}</SelectContent>
          </Select>

          <Select onValueChange={setSelectedCity} value={selectedCity}>
            <SelectTrigger><SelectValue placeholder="Select City" /></SelectTrigger>
            <SelectContent>{cities[selectedState]?.map((city) => <SelectItem key={city} value={city}>{city}</SelectItem>)}</SelectContent>
          </Select>

          <DialogFooter><Button onClick={handleLocationChange}>Apply Changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ListingPage;
