import React from 'react';
import './header.css';
import logo from '../../assets/images/logo_1.png';

const Header = ({ customNav }) => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="header-nav">
        {customNav || (
          <ul>
            <li><a href="#home">Accueil</a></li>
            <li><a href="#about">À propos</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
