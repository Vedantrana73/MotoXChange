import React, { useState, ChangeEvent, FormEvent } from "react";
import { cn } from "../lib/utils.ts";
import { Button } from "../components/ui/button.tsx";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Marquee } from "../components/ui/marquee.tsx";
import useUserStore from '../store/userStore.ts';

const carImages:string[] = [
  "https://img.freepik.com/free-photo/car-headlight-couple-making-deal-with-car-dealer_651396-1187.jpg",
  "https://media.istockphoto.com/id/1135541222/photo/test-drive-concept.jpg?s=612x612&w=0&k=20&c=CZudjgDGPJ89sx8v2_whh1G5JuYxtLzsEizICrO4oZs=",
  "https://plus.unsplash.com/premium_photo-1661397010754-47598bf606d6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyJTIwZGVhbGVyfGVufDB8fDB8fHww",
  "https://www.shutterstock.com/image-photo/man-signing-car-insurance-document-600nw-2175244659.jpg",
  "https://pictures.dealer.com/c/chrishausautosalesllc/1154/267403a467f02c947362a7844101e5efx.jpg?impolicy=downsize_bkpt&w=410",
];

const Login: React.FC = () => {
    const {setUser} = useUserStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError("All fields are required");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });
            setUser(response.data.user);
            localStorage.setItem("userId", response.data.user.userId);
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message || "Login failed");
            } else {
                setError("An unexpected error occurred");
            }
            setTimeout(() => setError(""), 3000);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6 max-w-5xl m-auto rounded-xl p-6")}> 
            <Card className="overflow-hidden md:min-h-120 md:shadow-lg">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8 w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Login to Your Account</h1>
                                <p className="text-muted-foreground">Welcome back! Please enter your credentials.</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            {error && <p className="text-red-500 text-md font-semibold">{error}</p>}
                            <Button type="submit" className="w-full">Login</Button>
                            <div className="text-center text-sm">
                                Don't have an account? <Link to="/register">Sign up</Link>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block h-full">
                        <div className="relative flex max-h-120 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
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

export default Login;
