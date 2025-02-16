import React from 'react'
import logo from '../Movielogo.png'
import {Link} from 'react-router-dom'
const navbar = () => {
  return (
    <div className = 'flex border space-x-8 items-center pl-3 py-4'>
        <img className = 'w-[60px] items-center'src={logo} alt="" />

        <Link to="/" className = 'text-blue-500 text-3xl font-semibold font-sans'>Movies</Link>
        {/* instead of anchor we can use link that it does not reload the webpages when it is changing */}
        <Link to="/watchlist" className = 'text-blue-500 text-3xl font-semibold	font-sans'>Watchlist</Link>
    </div>
  )
}

export default navbar