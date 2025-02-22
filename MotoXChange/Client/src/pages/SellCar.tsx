import React, { useState } from "react";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel.tsx";

const SellCar: React.FC = () => {
  const [carDetails, setCarDetails] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    fuelType: "",
    images: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarDetails({ ...carDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-lg p-10 shadow-lg rounded-lg">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-4">Sell Your Car</h1>

          {/* Carousel for Form Fields */}
          <Carousel className="px-6">
            <CarouselContent className="flex">
              {/* Step 1: Car Brand */}
              <CarouselItem className="w-full">
                <Label>Car Brand</Label>
                <Input type="text" name="brand" value={carDetails.brand} onChange={handleChange} placeholder="Enter car brand" />
              </CarouselItem>

              {/* Step 2: Car Model */}
              <CarouselItem className="w-full">
                <Label>Car Model</Label>
                <Input type="text" name="model" value={carDetails.model} onChange={handleChange} placeholder="Enter car model" />
              </CarouselItem>

              {/* Step 3: Year */}
              <CarouselItem className="w-full">
                <Label>Year of Manufacture</Label>
                <Input type="number" name="year" value={carDetails.year} onChange={handleChange} placeholder="Enter manufacturing year" />
              </CarouselItem>

              {/* Step 4: Price */}
              <CarouselItem className="w-full">
                <Label>Price</Label>
                <Input type="number" name="price" value={carDetails.price} onChange={handleChange} placeholder="Enter price" />
              </CarouselItem>

              {/* Step 5: Mileage */}
              <CarouselItem className="w-full">
                <Label>Mileage</Label>
                <Input type="number" name="mileage" value={carDetails.mileage} onChange={handleChange} placeholder="Enter mileage" />
              </CarouselItem>

              {/* Step 6: Fuel Type */}
              <CarouselItem className="w-full">
                <Label>Fuel Type</Label>
                <Input type="text" name="fuelType" value={carDetails.fuelType} onChange={handleChange} placeholder="Enter fuel type (Petrol/Diesel/EV)" />
              </CarouselItem>

              {/* Step 7: Car Images */}
              <CarouselItem className="w-full">
                <Label>Car Images</Label>
                <Input type="text" name="images" value={carDetails.images} onChange={handleChange} placeholder="Enter image URL" />
              </CarouselItem>

              {/* Step 8: Contact Information */}
              <CarouselItem className="w-full">
                <Label>Contact Number</Label>
                <Input type="text" name="contact" value={carDetails.contact} onChange={handleChange} placeholder="Enter your contact number" />
                <Button className="w-full mt-4 bg-green-500 hover:bg-green-600" onClick={() => alert("Car Listed Successfully!")}>
                  Submit
                </Button>
              </CarouselItem>
            </CarouselContent>

            {/* Previous & Next Buttons */}
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellCar;
