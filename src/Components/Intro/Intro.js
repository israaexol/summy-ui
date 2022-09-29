import React from 'react'
import './Intro.css'
import document from '../../assets/document.png'

const Intro = () => {
  return (
    <div className='main'>
        <div className='intro'>
            <h1 className='title'>Summy.</h1>
            {/* <p className='description'>Analyzing and evaluating how <span style={{color: '#F4B400'}}>coherent</span> your texts are <tr/> (let it be emails, reviews, any!) has never been easier!</p> */}
        </div>
        <div className='docimg'>
            <img src={document} className='image'></img>
        </div>

    </div>
  )
}

export default Intro