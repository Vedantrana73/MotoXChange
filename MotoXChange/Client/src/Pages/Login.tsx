import Movingcar from '../Components/Movingcar'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
      <div className='flex flex-col lg:flex-row lg:max-w-5xl lg:m-auto shadow-lg shadow-gray-400'>
        <Movingcar />
        <div className='w-full lg:w-1/2 p-4'>
          <div className='text-3xl text-center font-bold '>Login</div>
          <div className='flex flex-col items-center gap-10 p-5 md:p-8 lg:p-10'>
            <div>

              <form className='space-y-7'>

                <div>
                  <label htmlFor='user_name' className='text-xl font-semibold'>User ID</label>
                  <input type='text' name='user_name' id='user_name' placeholder='Enter User Name..' className='block focus:outline-none border-2 border-black border-x-0 border-t-0 w-72 py-2' />
                </div>


                <div>
                  <label htmlFor="email" className='text-xl font-semibold'>Password</label>
                  <input type="password" name="password" id="password" placeholder='Enter Email..' className='block focus:outline-none border-2 border-black border-x-0 border-t-0 w-72 py-2' />
                </div>


                <div className='text-lg'>
                  <div>Don't Have An Account? </div>
                  <div>Create One <Link to='/register' className='text-purple-900 font-semibold cursor-pointer text-xl underline'>Here</Link></div>
                </div>
                <div>
                  <button className='cursor-pointer block w-72 py-4 font-semibold text-xl bg-black text-white hover:text-black hover:bg-gray-200 hover:shadow-xl transition-colors duration-300'>Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login