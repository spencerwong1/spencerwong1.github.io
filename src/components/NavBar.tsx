// src/Profile.tsx
import React from 'react'
import '../css/navbar.css'
import blackKing from '../assets/white-king.png';

export default function NavBar() {
  return (
    <div className="navbar">
      <img
        src={blackKing}
        className='homeBtn'
        // onClick={handleClick}
        alt="black king" />
    </div>
  )
}
