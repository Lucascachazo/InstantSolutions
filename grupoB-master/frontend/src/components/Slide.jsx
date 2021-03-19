import React from 'react'

const Slide = ({ slide }) => {
  return (
    <div style={{ backgroundImage: `url(${slide.src})` }} className="slideImg">
      <h2>{slide.txt}</h2>
    </div>
  )
}

export default Slide
