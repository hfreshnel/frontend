import React from "react";
import "./login.css"


function Login(){
    return(
        <div className="login-container">
            <div className="login-section">
                <h1 className="welcome-title">Bienvenue!</h1>
                <h2 className="connexion-title">Connexion</h2>

                <label className="input-label">Nom d'utilisateur</label>
                <input type="text" placeholder="Enter your username" className="input-field" />

                <label className="input-label">Mot de passe</label>
                <input type="password" placeholder="Enter your password" className="input-field" />
                
                <button className="login-button">SE CONNECTER</button>

                <p>Créer un nouveau compte?{" "}
                <a href="/register" className="register-link" target="_blank">Inscrivez-vous ici</a> 
                </p>
            </div>

        </div>
    );
}

export default Login