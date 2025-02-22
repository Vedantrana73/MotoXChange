import React from 'react'
import Logo from '../Animelogo.webp'

import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex border space-x-8 items-center pl-3 py-2'>
            <img className='w-[50px]' src={Logo} alt="" />
            
            <Link className='text-blue-500 text-xl font-bold '  to="/">Animes</Link>

            <Link className='text-blue-500 text-xl font-bold' to="/watchlist">Watchlist</Link>
        </div>
    )
}

export default Navbar