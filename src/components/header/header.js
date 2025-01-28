import React, { useContext } from 'react';
import './header.css';
import logo from '../../assets/images/logo_1.png';
import { AuthContext } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="header-nav">
          <ul>
            <li><a href="/dashboard">Mes patients</a></li>
            <li><a href="/profile">Profil</a></li>
            <li className="header-logout">
              <button onClick={handleLogout}>Déconnexion</button>
            </li>
          </ul>
      </nav>
    </header>
  );
};

export default Header;
