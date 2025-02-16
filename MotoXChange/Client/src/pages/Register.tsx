import React, { useState, ChangeEvent, FormEvent } from "react";
import { cn } from "../lib/utils.ts";
import { Button } from "../components/ui/button.tsx";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { InputOTP, InputOTPSeparator, InputOTPSlot, InputOTPGroup } from "../components/ui/input-otp.tsx";
import { cities } from '../lib/cities.ts';
import { Marquee } from "../components/ui/marquee.tsx";

const carImages = [
    "https://img.freepik.com/free-photo/car-headlight-couple-making-deal-with-car-dealer_651396-1187.jpg",
    "https://media.istockphoto.com/id/1135541222/photo/test-drive-concept.jpg?s=612x612&w=0&k=20&c=CZudjgDGPJ89sx8v2_whh1G5JuYxtLzsEizICrO4oZs=",
    "https://plus.unsplash.com/premium_photo-1661397010754-47598bf606d6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyJTIwZGVhbGVyfGVufDB8fDB8fHww",
    "https://www.shutterstock.com/image-photo/man-signing-car-insurance-document-600nw-2175244659.jpg",
    "https://pictures.dealer.com/c/chrishausautosalesllc/1154/267403a467f02c947362a7844101e5efx.jpg?impolicy=downsize_bkpt&w=410",
  ];
const Register: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(1);
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [selectedState, setSelectedState] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");


    // Handle Registration
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (!/^[0-9]{10}$/.test(phone)) {
            setError("Phone number must be 10 digits");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/auth/send-otp", { email });
            setStep(2);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message || "Registration Failed");
            } else {
                setError("An unexpected error occurred");
            }
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    // Handle OTP Verification
    const handleVerify = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page refresh
        try {
            const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
                email,
                password,
                phone,
                address: {
                    state: selectedState,
                    city: selectedCity,
                },
                otp,
                name: fullName
            });
            setStep(1);
            navigate("/login");
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message || "OTP verification failed");
            } else {
                setError("An unexpected error occurred");
            }
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(e.target.value);
        setSelectedCity(""); // Reset city when state changes
    };

    // Handle city change
    const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
    };

    return (
        <div className={cn("flex flex-col  gap-6 max-w-5xl m-auto md:shadow-xl rounded-xl p-6 min-h-110")}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    {step === 1 ? (
                        <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Create an Account</h1>
                                    <p className="text-muted-foreground">Sign up to get started</p>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={10} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="state">State</Label>
                                    <select
                                        id="state"
                                        value={selectedState}
                                        onChange={handleStateChange}
                                        required
                                        className="border rounded-md p-2"
                                    >
                                        <option value="" disabled>Select a state</option>
                                        {Object.keys(cities).map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedState && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="city">City</Label>
                                        <select
                                            id="city"
                                            value={selectedCity}
                                            onChange={handleCityChange}
                                            required
                                            className="border rounded-md p-2"
                                        >
                                            <option value="" disabled>Select a city</option>
                                            {cities[selectedState].map((city: any) => (
                                                <option key={city} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                                {error && <p className="text-red-500 text-md font-semibold">{error}</p>}
                                <Button type="submit" className="w-full">Next</Button>
                                <div className="text-center text-sm">
                                    Already have an account? <Link to="/login">Login</Link>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form className="p-6 md:p-8 flex flex-col gap-6" onSubmit={handleVerify}>
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Enter OTP</h1>
                                <p className="text-muted-foreground">We've sent an OTP to {email}</p>
                            </div>
                            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} autoFocus />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            {error && <p className="text-red-500 text-md">{error}</p>}
                            <Button type="submit" className="w-full">Verify OTP</Button>
                        </form>
                    )}
                   <div className="relative hidden bg-muted md:block h-full">
                                           <div className="relative flex max-h-160 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
                                               <div
                                                   className="flex flex-row items-center gap-4"
                                                   style={{
                                                       transform:
                                                           "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
                                                   }}
                                               >
                                                   <Marquee pauseOnHover vertical className="[--duration:40s]">
                                                       {carImages.map((img, index) => (
                                                           <img key={index} src={img} alt="Car" className="w-full h-100 rounded-lg shadow-md" />
                                                       ))}
                                                   </Marquee>
                                               </div>  
                                           </div>
                                       </div>
                    
                </CardContent>

            </Card>
        </div>
    );
};

export default Register;
