import React from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterDetails: React.FC = () => {
  const navigate = useNavigate();
  const {email,firstName,lastName,setEmail,setFirstName,setLastName} = useUser();
  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    try
    {
      const response = await axios.post('http://localhost:5000/user/register',{
        email,
        firstName,
        lastName
      });
      console.log(response.data);
      navigate('/register/authenticate');
    }
    catch(error)
    {
      console.log('error: '+error);
    }
  };

  return (
    <div className="w-1/2 p-4">
      <h1 className="text-3xl text-center font-bold pt-7">Sign Up</h1>
      <div className="flex justify-center p-9">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="f_name" className="text-xl font-semibold">First Name</label>
          </div>
          <input
            type="text"
            name="f_name"
            id="f_name"
            placeholder="Enter First Name.."
            className="border-2 border-black border-x-0 border-t-0 w-72 py-2"
            onChange={(e)=>setFirstName(e.target.value)}
          />

          <div className="mt-7">
            <label htmlFor="l_name" className="text-xl font-semibold">Last Name</label>
          </div>
          <input
            type="text"
            name="l_name"
            id="l_name"
            placeholder="Enter Last Name.."
            className="border-2 border-black border-x-0 border-t-0 w-72 py-2"
            onChange={(e)=>setLastName(e.target.value)}
          />

          <div className="mt-7">
            <label htmlFor="email" className="text-xl font-semibold">Email</label>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email.."
            className="border-2 border-black border-x-0 border-t-0 w-72 py-2"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="block my-10 w-72 py-4 font-semibold text-xl bg-black text-white hover:text-black hover:bg-gray-200 hover:shadow-xl transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterDetails;
