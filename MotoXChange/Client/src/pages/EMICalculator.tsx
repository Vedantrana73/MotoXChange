import LoanPieChart from "../components/LoanPieChart.tsx";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card.tsx";
import { Label } from '../components/ui/label.tsx';
import { Input } from "../components/ui/input.tsx";
import { Button } from "../components/ui/button.tsx";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  useEffect(() => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const N = parseInt(loanTenure) * 12; // Convert years to months
    const R = annualRate / 12 / 100; // Monthly interest rate

    if (!P || !R || !N) {
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
      return;
    }

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPaymentValue = emiValue * N;
    const totalInterestValue = totalPaymentValue - P;

    setEmi(emiValue.toFixed(2));
    setTotalPayment(totalPaymentValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
  }, [loanAmount, interestRate, loanTenure]);

  return (
    <div className="flex justify-center px-2">
      <Card className="w-full max-w-3xl md:shadow-lg rounded-lg py-3">
        <CardContent className="grid gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Loan EMI Calculator</h1>
            <p className="text-muted-foreground">Calculate your monthly EMI</p>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
              <Input id="loanAmount" type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input id="interestRate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
              <Input id="loanTenure" type="number" value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} required />
            </div>
          </div>

          {emi && totalInterest && totalPayment && (
            <div className="p-4 border rounded bg-gray-100 text-center">
              <p><strong>Monthly EMI:</strong> ₹{emi}</p>
              <p><strong>Total Interest:</strong> ₹{totalInterest}</p>
              <p><strong>Total Payment:</strong> ₹{totalPayment}</p>
            </div>
          )}


          {emi && totalInterest && totalPayment && (
            <LoanPieChart loanAmount={loanAmount} totalInterest={totalInterest} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanCalculator;
