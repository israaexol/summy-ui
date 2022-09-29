import React, { useState, useEffect, useCallback } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {
    
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const closeMenu = () => setClick(false)

    return (
        <div className='header'>
            
            <nav className='navbar'>
                <div className='logoSection'>
                    <a href='/' className='logo'>
                        <img src={logo} alt='logo' />
                    </a>
                </div>
                {/* <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
                        : (<FaBars size={30} style={{ color: '#ffffff' }} />)}

                </div> */}
                <div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className='nav-item'>
                            <a href='#tools' onClick={closeMenu}>Tools</a>
                        </li>
                        <li className='nav-item'>
                            <a href='#contact' onClick={closeMenu}>Contact</a>
                        </li>
                    </ul>
                </div>
                
            </nav>
        </div>
    )
}

export default Navbar