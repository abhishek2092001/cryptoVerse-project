import React from 'react'
import { Link } from 'react-router-dom'
import { FaBitcoin } from "react-icons/fa";
import './header.css'
const Header = () => {

 

  return (
    <div className='nav-bar'>
      <div className="logo">
        <h1>CryptoVerse</h1> 
        <FaBitcoin color='#FFC436 ' className='logo-icon' />
          </div>
      <ul>
        
        <li> <Link to='/'>Home</Link> </li>
        <li> <Link to='/coins' >Coins</Link> </li>
      </ul>
    </div>
  )
}

export default Header
