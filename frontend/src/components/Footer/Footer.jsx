import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">

        <div className="footer-content-left">
          <h1 className='logo'>QuickBite</h1>
          <p>Craving something delicious? QuickBite brings your favorite meals right to your doorstep with just a few taps. From savory appetizers to sweet desserts, we partner with top restaurants in your area to offer a wide variety of cuisines, all delivered hot and fresh. Enjoy hassle-free ordering, real-time tracking, and fast delivery, all at your fingertips. Satisfy your cravings anytime, anywhere – because good food should never be far away.</p>
          <div className="footer-social-icons">
            <Link to=''><i className="fa-brands fa-linkedin"></i></Link>
            <Link to=''><i className="fa-brands fa-twitter"></i></Link>
            <Link to=''><i className="fa-brands fa-instagram"></i></Link>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91 720-606-6404</li>
            <li>contact@us.com</li>
          </ul>
        </div>

      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © QuickBite.com  - All Right Reserved.</p>
    </div>
  )
}

export default Footer
