import { useState } from "react";
import { BiKey, BiShow, BiHide } from "react-icons/bi";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function RegisterPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errorMessage,setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {email,firstName,lastName} = useUser()

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async() =>{
    if(!password || !confirmPassword)
    {
      setErrorMessage("All Fields Required!");
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
      return;
    }
    if(password!=confirmPassword)
    {
      setErrorMessage("Passwords Doesn't Match");
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
      return;
    }
    try
    {
      const response = await axios.post('http://localhost:5000/user/password',{
        email,
        password,
        firstName,
        lastName
      });
      if(response.data)
      {
        setSuccessMessage(response.data.message)
        navigate("/");
      }
    }
    catch(error: unknown)
    {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);   
    }
  }
  return (
    <div className="w-1/2 flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-10 font-bold">Set Password</h1>
      <div className="space-y-7">
        {/* Password Field */}
        <label className="input input-bordered flex items-center gap-2">
          <div>Password</div>
          <span>
            <BiKey />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            className="grow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus={true}
          />
          <span
            className="cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <BiHide /> : <BiShow />}
          </span>
        </label>

        {/* Confirm Password Field */}
        <label className="input input-bordered flex items-center gap-2">
          <div>Confirm Password</div>
          <span>
            <BiKey />
          </span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="grow"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              console.log(confirmPassword);
            }}
          />
          <span
            className="cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? <BiHide /> : <BiShow />}
          </span>
        </label>
        <div className="flex justify-center">
          <button className="btn btn-outline text-base px-10 py-3" 
          onClick={handleSubmit}
          >Submit</button>
        </div>
      </div>
      {
        errorMessage && <div className="text-red-500 text-lg text-center font-semibold py-2">{errorMessage}</div>
      }
      {
        successMessage && <div className="text-green-500 text-lg text-center font-semibold py-2">{successMessage}</div>
      }
    </div>
  );
}

export default RegisterPassword;
