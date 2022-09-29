import React from 'react'
import './Contact.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Contact = () => {
  return (
    <div className='main-contact'>
        <h1 className='contact-title'>Contact</h1>
        <div className='links'>
            <a href='https://www.linkedin.com/in/israa-hamdine/' ><LinkedInIcon sx={{color:'#ffffff', height:'40px', width:'40px'}}/></a>
            <a href='https://www.github.com/israaexol'><GitHubIcon sx={{color:'#ffffff', height:'40px', width:'40px'}}/></a>
        </div>
        <h2>&copy; Made with <span>💛</span> by <a href='https://israa-hamdine.netlify.app/'>Israa Hamdine</a>.</h2>
    </div>
  )
}

export default Contact