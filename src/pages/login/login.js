import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"
import logo from "../../assets/images/logo_1.png";


function Login({ setIsAuthenticated }){
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsAuthenticated(true);
        navigate("/dashboard");
    }
    
    return(
        <div className="login-container">
            <div className="login-section">
                <img src={logo} alt="Logo" className="logo" />

                <h1 className="welcome-title">Bienvenue!</h1>
                <h2 className="connexion-title">Connexion</h2>

                <label className="input-label">Nom d'utilisateur</label>
                <input type="text" placeholder="Enter your username" className="input-field" />

                <label className="input-label">Mot de passe</label>
                <input type="password" placeholder="Enter your password" className="input-field" />
                
                <button className="login-button" onClick={handleLogin}>SE CONNECTER</button>

                <p>Créer un nouveau compte?{" "}
                <a href="/register" className="register-link">Inscrivez-vous ici</a> 
                </p>
            </div>

        </div>
    );
}

export default Login