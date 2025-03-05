import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { brands } from "../lib/brands.ts";
import { cities } from "../lib/cities.ts";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button.tsx";

const CenteredCard: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [seats, setSeats] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");


  const toggleFeature = (feature: string) => {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setError("");
    }
  };

  const goNext = () => {
    if (step === 0 && !selectedBrand) {
      setError("Please select a brand");
      return;
    } else if (step === 1 && !selectedModel) {
      setError("Please select a model");
      return;
    } else if (step === 2 && !selectedFuelType) {
      setError("Please select a fuel type");
      return;
    } else if (step === 3 && (!selectedTransmission || !mileage)) {
      setError("Please select transmission type and enter mileage");
      return;
    } else if (step === 4 && !seats) {
      setError("Please select the number of seats");
      return;
    } else if (step === 5 && (!year || !selectedState || !selectedCity)) {
      setError("Please enter year and location");
      return;
    } else if (step === 6 && !images) {
      setError("Please enter the price");
      return;
      
    }
    else if(step === 7 && !description)
    {
      setError("Please Enter Valid Description")
    }

    setStep(step + 1);
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages([...images, ...newImages]);

      // Generate preview URLs
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const uploadImagesToCloudinary = async () => {
    setUploading(true);
    const uploadedUrls: string[] = [];


    for (let image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ResumeBuilder"); // Replace with your Cloudinary upload preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dv4lnqsm5/image/upload", // Replace with your Cloudinary cloud name
          formData
        );
        uploadedUrls.push(response.data.secure_url);
        setUploadedUrls(uploadedUrls);
      } catch (error) {
        console.error("Upload failed", error);
      }
    }

    setUploading(false);
    return uploadedUrls;
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
        toast.warning("Please select at least one image before submitting.");
        return;
    }

    setUploading(true);
    try {
        // Step 1: Upload images to Cloudinary
        const uploadedUrls = await uploadImagesToCloudinary();

        // Step 2: Prepare form data for backend
        const formData = {
            images: uploadedUrls, // Cloudinary URLs
            brand: selectedBrand,
            model: selectedModel,
            fuelType: selectedFuelType,
            transmission: selectedTransmission,
            mileage,
            seats,
            features,
            year,
            owner: "65a9f8c3d4e6a1b2c3d4e5f6",
            price,
            description,
            location: {
                state: selectedState,
                city: selectedCity,
            },
        };

        // Step 3: Send data to backend
        await axios.post("http://localhost:5000/api/cars/add", formData);

        // Success toast
        toast.success("Car listing created successfully!", {
            description: "Your car has been listed.",
            duration: 4000, // Optional: sets toast visibility duration
        });
      
    } catch (error) {
        toast.error("Error submitting form. Please try again.");
    } finally {
        setUploading(false);
    }
};
  
  
  return (
    <div className="flex justify-center">
      <Card className="w-full lg:max-w-5xl p-3 md:p-10 md:shadow-lg rounded-lg min-h-120">
        {step > 0 && (
          <button className="mb-4 p-2 border rounded-lg bg-gray-300 hover:bg-gray-400" onClick={goBack}>
            ← Back
          </button>
        )}
        <CardContent>
          <h1 className="text-2xl font-bold text-center">
            {step === 0
              ? "Select a Brand"
              : step === 1
                ? "Select a Model"
                : step === 2
                  ? "Select Fuel Type"
                  : step === 3
                    ? "Select Transmission & Mileage"
                    : step === 4
                      ? "Enter Number of Seats and Features of Car"
                      : step === 5
                        ? "Enter Year & Location"
                        : step === 6
                          ? "Upload Car Images(Maximum 5)"
                          : step === 7
                          ? "Enter Description for Car"
                          : "Enter Offer Price(Rationally)"}
          </h1>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          {step === 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.keys(brands).map((brand) => (
                <button
                  key={brand}
                  className={`border p-2 w-1/4 rounded-lg font-bold transition-colors ${selectedBrand === brand
                      ? "bg-blue-500 text-white dark:bg-blue-400"
                      : "bg-gray-200 dark:bg-gray-800"
                    }`}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {brands[selectedBrand]?.map((car) => (
                <button
                  key={car.model}
                  className={`border w-1/5 p-2 rounded-lg font-bold transition-colors ${selectedModel === car.model
                      ? "bg-blue-500 text-white dark:bg-blue-400"
                      : "bg-gray-200 dark:bg-gray-800"
                    }`}
                  onClick={() => setSelectedModel(car.model)}
                >
                  {car.model}
                </button>
              ))}
            </div>
          )}


          {step === 2 && (
            <div className="flex gap-2 mt-4">
              {brands[selectedBrand]?.find(car => car.model === selectedModel)?.fuel_types.map(fuel => (
                <button
                  key={fuel}
                  className={`border w-1/4 p-2 rounded-lg font-bold transition-colors ${selectedFuelType === fuel
                      ? "bg-blue-500 text-white dark:bg-blue-400"
                      : "bg-gray-200 dark:bg-gray-800"
                    }`}
                  onClick={() => setSelectedFuelType(fuel)}
                >
                  {fuel}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-wrap gap-2">
                {["Automatic", "Manual"].map((transmission) => (
                  <button
                    key={transmission}
                    className={`p-2 border-2 min-w-1/5 text-center rounded-lg font-bold transition-colors ${selectedTransmission === transmission
                        ? "bg-blue-500 text-white dark:bg-blue-400"
                        : "bg-gray-200 dark:bg-gray-800"
                      }`}
                    onClick={() => setSelectedTransmission(transmission)}
                  >
                    {transmission}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Enter Mileage"
                className="border p-2 rounded-lg w-full"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
              />
            </div>
          )}


          {step === 4 && (
            <div className="flex flex-col gap-4 mt-4">
              {/* Seat Selection */}
              <div className="flex flex-wrap gap-2">
                {[2, 4, 5, 6, 7].map((seat) => (
                  <button
                    key={seat}
                    className={`border-2 p-3 md:w-1/5 rounded-lg font-bold transition-colors ${seats === seat.toString()
                        ? "bg-blue-500 text-white dark:bg-blue-400"
                        : "bg-gray-200 dark:bg-gray-800"
                      }`}
                    onClick={() => setSeats(seat.toString())}
                  >
                    {seat} Seats
                  </button>
                ))}
              </div>

              {/* Feature Selection */}
              <div className="flex flex-wrap gap-2">
                {["Sunroof", "Bluetooth", "Backup Camera", "Leather Seats", "Heated Seats"].map((feature) => (
                  <label
                    key={feature}
                    className={`flex items-center gap-2 p-2 border-2 rounded-lg transition-colors cursor-pointer ${features.includes(feature)
                        ? "bg-green-500 text-white dark:bg-green-400"
                        : "bg-gray-200 dark:bg-gray-800"
                      }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={features.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col gap-4 mt-4">
              <input
                type="number"
                placeholder="Enter Year"
                className="border p-2 rounded-lg w-full"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />

              <select
                className="border p-2 rounded-lg w-full"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="" disabled>Select a State</option>
                {Object.keys(cities).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              {selectedState && (
                <select
                  className="border p-2 rounded-lg w-full"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="" disabled>Select a City</option>
                  {cities[selectedState].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {step === 6 && (
            <div className="space-y-2 mt-2">

            {/* File input */ }
            < input type="file" multiple accept="image/*" onChange={handleFileChange} className="border p-2 rounded-lg"/>

          {/* Image previews */}
          <div className="flex flex-wrap gap-2">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative w-24 h-24">
                <img src={preview} alt="preview" className="w-full h-full object-cover rounded" />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => removeImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Submit button */}
            </div>
          )}
          {step === 8 && (
            <div className="flex flex-col gap-4 mt-4">
              <input type="number" placeholder="Enter Price" className="border p-2 rounded-lg w-full" value={price} onChange={(e) => setPrice(e.target.value)} />
              <Button type="submit" className="w-full" disabled={uploading} onClick={handleSubmit}>
    {uploading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Submit"}
</Button>


            </div>
          )}

{step === 7 && (
  <div className="flex flex-col gap-4 mt-4">
    <label className="font-bold text-lg">Enter Car Description</label>
    <textarea
      className="border p-2 rounded-lg w-full h-24 resize-none"
      placeholder="Enter a detailed description of the car..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>
)}

        </CardContent>
        <button className="mt-4 p-2 border rounded-lg bg-blue-300 hover:bg-blue-400" onClick={goNext}>
          Next →
        </button>
      </Card>
    </div>
  );
};

export default CenteredCard;
