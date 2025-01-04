import React, { useState } from 'react';

const RegisterAuthentication: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if(index < 3 && value)
        {
          document.getElementById(`otp-box-${index+1}`)?.focus()
      }
      
    }
  };
  const handleBack = (event: React.KeyboardEvent<HTMLInputElement>,index: number) =>{
    if(index> 0 && event.key === "Backspace" && otp[index]==='')
    {
      document.getElementById(`otp-box-${index-1}`)?.focus();
    }
  }
  return (
    <div className="w-1/2 space-y-8 flex flex-col items-center h-[32rem] shadow-xl shadow-gray-400">
      <div>
        <h1 className="text-3xl font-semibold pt-7 text-center">Verification</h1>
      </div>
      <div className="font-semibold text-xl text-center break-words">
        OTP has been sent successfully to aks@gmail.com
      </div>
      <div className="flex space-x-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-box-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e)=>handleBack(e,index)}
            className="border-2 border-black border-x-0 border-t-0 w-12 py-2 text-center"
          />
        ))}
      </div>
      <div>
        <button className="block w-72 py-4 font-semibold text-xl bg-black text-white hover:text-black hover:bg-gray-200 hover:shadow-xl transition-colors duration-300">
          Verify
        </button>
      </div>
    </div>
  );
};

export default RegisterAuthentication;
