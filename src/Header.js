import React from 'react';
import img1 from './images/header.png';
import './index.css'

const Header = () => {
  return (
    <div className='header'>
      <img src={img1} alt='logo'/>
      <h1>Meme Generator</h1>
    </div>
  )
}

export default Header
