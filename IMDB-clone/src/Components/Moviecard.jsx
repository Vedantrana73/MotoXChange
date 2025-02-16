import React from 'react'

function Moviecard({movie}) {
  return (
    <div  className = "h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer" style={{backgroundImage:`url(${movie?.Poster})`}}>

    </div>
  )
}

export default Moviecard