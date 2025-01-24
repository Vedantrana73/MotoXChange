import Movingcar from "../Components/Movingcar"
import RegisterAuthDetails from '../Components/RegisterAuthDetails';
import { Routes, Route } from 'react-router-dom';
import RegisterAuthentication from '../Components/RegisterAuthentication';
import RegisterPassword from "../Components/RegisterPassword";

function Register() {
    return (
        <>
            <div className='w-screen lg:max-w-5xl border border-grey-800/50 m-auto flex flex-col lg:flex-row shadow-lg shadow-gray-400'>
                <Movingcar />
                <Routes>
                    <Route path = "/" element={<RegisterAuthDetails/>}/>
                    <Route path = "authenticate" element={<RegisterAuthentication/>}/>
                    <Route path = "password" element={<RegisterPassword/>}/>
                </Routes>
            </div>
        </>
    )
}

export default Register