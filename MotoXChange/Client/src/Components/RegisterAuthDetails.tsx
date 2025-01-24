import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import axios from 'axios'

export default function RegisterDetails() {
  const navigate = useNavigate()
  const { firstName, email, lastName, setLastName, setFirstName, setEmail } = useUser()
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!firstName || !lastName || !email) {
      setErrorMessage('Please Enter All Details First!')
      setTimeout(() => {
        setErrorMessage('')
      }, 4000)
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/user/register', {
        firstName,
        lastName,
        email
      })
      const result = response.data
      if (result) {
        navigate('/register/authenticate')
      }
      else {
        setErrorMessage(result.message)
      }
    }
    catch (err:any) {
      console.log('Error'+err.message);
      setErrorMessage('Failed to Send OTP Please Try Again!')
    }
  }
  return (
    <div className='w-screen lg:w-1/2 p-4'>
      <h1 className='text-3xl text-center font-bold pt-7'>Sign Up</h1>
      <div className='flex justify-center p-9'>
        <form onSubmit={(e) => handleSubmit(e)} className='space-y-7'>
          <div>
            <label htmlFor='f_name block' className='text-xl font-semibold'>First Name</label>
            <input type='text' name='f_name' id='f_name' placeholder='Enter First Name..' className='block focus:outline-none border-2 border-black border-x-0 border-t-0 w-72 py-2'
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>


          <div>
            <label htmlFor='l_name' className='text-xl font-semibold'>Last Name</label>
            <input type='text' name='l_name' id='l_name' placeholder='Enter Last Name..' className='block focus:outline-none border-2 border-black border-x-0 border-t-0 w-72 py-2'
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>


          <div>
            <label htmlFor="email" className='text-xl font-semibold'>Email</label>
            <input type="email" name="email" id="email" placeholder='Enter Email..' className='block focus:outline-none border-2 border-black border-x-0 border-t-0 w-72 py-2'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type='submit' className='block my-10 w-72 py-4 font-semibold text-xl bg-black text-white hover:text-black hover:bg-gray-200 hover:shadow-xl transition-colors duration-300'>Sign Up
          </button>

        </form>
      </div>
          <div className='text-xl text-red-500 font-semibold w-full break-all text-center'>
            {errorMessage && <div>{errorMessage}</div>}
          </div>
    </div>
  )
}
