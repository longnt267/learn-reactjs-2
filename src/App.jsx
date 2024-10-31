import React, { useState } from 'react'
import { FaClock, FaLeaf, FaWrench } from 'react-icons/fa'

const LetterGrid = () => {
  return (
    <div className='maintenance-container'>
      <div className='maintenance-message'>
        <FaLeaf size={50} color='#66CDAA' />
        <h1>Website đang được code</h1>
        <p>Em Long sẽ trở lại sớm. Cảm ơn chị Trà đã kiên nhẫn!</p>
      </div>
    </div>
  )
}

export default LetterGrid
