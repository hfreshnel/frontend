//footer with logo and social media links
import React from 'react';
import './footer.css';
import logo from '../../assets/images/logo_2.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src={logo} alt="Logo" />
            </div>
        </footer>
    );
}

export default Footer;