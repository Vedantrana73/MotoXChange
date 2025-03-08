import { create } from "zustand";

interface ICar {
  _id?: string;
  description: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid" | "CNG";
  transmission: "Manual" | "Automatic";
  mileage: number;
  location: {
      state: string;
      city: string;
  };
  images: string[];
  owner: string; // Assuming it's a User ID
  seats: number;
  features?: string[];
  views?: number;
  status: "Available" | "Sold";
  createdAt?: string;
  updatedAt?: string;
}

interface CarStore {
  cars: ICar[];
  setCars: (newCars: ICar[]) => void;
  addCar: (car: ICar) => void;
  removeCar: (carId: string) => void;
}

const useCarStore = create<CarStore>((set) => ({
  cars: [],

  setCars: (newCars) => set({ cars: newCars }),

  addCar: (car) => set((state) => ({ cars: [...state.cars, car] })),

  removeCar: (carId) =>
    set((state) => ({ cars: state.cars.filter((car) => car._id !== carId) })),
}));

export default useCarStore;
