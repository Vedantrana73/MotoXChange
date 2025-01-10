import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterAuthentication: React.FC = () => {
  const {email} = useUser();
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [successMessage,setSuccessMessage] = useState<String>('');
  const [errorMessage,setErrorMessage] = useState<String>('');

  const navigate = useNavigate();
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

  const verifyOtp = async() =>{
    try
    {
      const response = await axios.post('http://localhost:5000/user/verify-otp',{
        email,
        otp: otp.join('')
      });
      if(response.data)
      {
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/login');
        }, 3000);
      }
    }
    catch(error: any)
    {
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage('')
      }, 4000);
    }
  }
  return (
    <div className="w-1/2 space-y-8 flex flex-col items-center h-[32rem] shadow-xl shadow-gray-400">
      <div>
        <h1 className="text-3xl font-semibold pt-7 text-center">Verification</h1>
      </div>
      <div className="font-semibold text-xl text-center break-words">
        OTP has been sent successfully to {email}
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
        <button className="block w-72 py-4 font-semibold text-xl bg-black text-white hover:text-black hover:bg-gray-200 hover:shadow-xl transition-colors duration-300" onClick={verifyOtp}>
          Verify
        </button>
      </div>
      {
        successMessage && <div className='text-lg text-green-500 font-semibold'>{successMessage}</div>
      }
      {
        errorMessage && <div className='text-lg text-red-500 font-semibold'>{errorMessage}</div>
      }
    </div>
  );
};

export default RegisterAuthentication;
