import React from 'react';
import Movingcar from '../Components/Movingcar';
//import { GiSteeringWheel } from 'react-icons/gi';
import RegisterAuthDetails from '../Components/RegisterAuthDetails';
import { Routes, Route } from 'react-router-dom';
import RegisterAuthentication from '../Components/RegisterAuthentication';

const Register: React.FC = () => {
  return (
    <>
      <div className="max-w-5xl border border-grey-800/50 m-auto flex shadow-xl shadow-gray-400">
        <Movingcar />
        <Routes>
          <Route path="/" element={<RegisterAuthDetails />} />
          <Route path="/authenticate" element={<RegisterAuthentication />} />
        </Routes>
      </div>
    </>
  );
};

export default Register;
