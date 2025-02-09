import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./login.css"
import logo from "../../assets/images/logo_1.png";

// Login component
/**
 * Login component renders a login form and handles user authentication.
 * 
 * @component
 * @example
 * return (
 *   <Login />
 * )
 */
function Login(){
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    // Handle login form submission
    /**
     * Handles the form submission for user login.
     * 
     * @param {Object} e - The event object.
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            console.log("Logged in successfully");
            navigate("/dashboard");
        } catch (error) {
            setError("Failed to login");
        }
    }
    
    return(
        <div className="login-container">
            <div className="login-section">
                <img src={logo} alt="Logo" className="logo" />

                <h1 className="welcome-title">Bienvenue!</h1>
                <h2 className="connexion-title">Connexion</h2>
                <form onSubmit={handleLogin}>
                    <label className="input-label">Nom d'utilisateur</label>
                    <input 
                        type="text" 
                        placeholder="Enter your username" 
                        className="input-field" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>

                    <label className="input-label">Mot de passe</label>
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="input-field" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    
                    {error && <div className="error-message">{error}</div>}
                    <button className="login-button" type="submit">SE CONNECTER</button>
                </form>
                
                <p>Créer un nouveau compte?{" "}
                <a href="/register" className="register-link">Inscrivez-vous ici</a> 
                </p>
            </div>
        </div>
    );
}

export default Login;