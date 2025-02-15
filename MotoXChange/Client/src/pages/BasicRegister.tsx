import React, { useState, ChangeEvent, FormEvent } from "react";
import { cn } from "../lib/utils.ts";
import { Button } from "../components/ui/button.tsx";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { InputOTP, InputOTPSeparator, InputOTPSlot, InputOTPGroup } from "../components/ui/input-otp.tsx";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(1);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [otp, setOtp] = useState<string>("");

    // Handle Registration
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/auth/send-otp", { email });
            setStep(2);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.error?.message || "Registeration Failed");
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
                otp,
            });
            setStep(1)
            navigate("/");
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

    return (
        <div className={cn("flex flex-col gap-6 max-w-5xl m-auto md:shadow-xl rounded-xl p-6 min-h-96")}>
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
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                                {error && <p className="text-red-500 text-md">{error}</p>}
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
                    <div className="relative hidden bg-muted md:block">
                        <img src="" alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
