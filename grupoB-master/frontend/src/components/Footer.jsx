import React from 'react'
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import Logo from '../assets/logo3.png'

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <div className="logoDiv" >
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="footerCol">
        <h2>Instant Solution</h2>
        <h6>Todos los derechos reservados</h6>
      </div>
      <div className="footerCol footerIcons">
        <FaInstagram className="footerIcon" />
        <FaFacebook className="footerIcon" />
        <FaTwitter className="footerIcon" />
      </div>
    </div>
  )
}

export default Footer
