import React from 'react';
import Movingcar from '../Components/Movingcar';
import { Link } from 'react-router-dom';
// import Padding from '../Components/Padding';

const Login: React.FC = () => {
  return (
    <>
      <div className="max-w-5xl m-auto flex shadow-xl shadow-gray-400">
        <Movingcar />
        <div className="w-1/2 p-4">
          <div className="text-3xl text-center font-bold pt-7">Login</div>
          <div className="flex flex-col items-center gap-10 p-9">
            <div>
              <form>
                <div className="mt-7">
                  <label htmlFor="user_name" className="text-xl font-semibold">
                    User ID
                  </label>
                </div>

                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="Enter User Name.."
                  className="border-2 border-black border-x-0 border-t-0 w-72 py-2"
                />

                <div className="mt-7">
                  <label htmlFor="password" className="text-xl font-semibold">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password.."
                  className="border-2 border-black border-x-0 border-t-0 w-72 py-2"
                />
              </form>
              <div className="my-5 text-lg">
                <div>Don't Have An Account? </div>
                <div>
                  Create One{' '}
                  <Link to="/register" className="text-purple-900 font-semibold">
                    Here
                  </Link>
                </div>
              </div>
              <button className="block w-72 py-4 font-semibold text-xl bg-black text-white hover:text-black hover:bg-gray-200 hover:shadow-xl transition-colors duration-300">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
