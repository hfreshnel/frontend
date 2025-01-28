import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import logo from "../../assets/images/logo_1.png";

function SignUp() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isMatch, setIsMatch] = useState(false);

    const handleRegister = () => {
        navigate("/");
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setIsMatch(value === password && value.length > 0);
    };

    return (
        <div className="signup-container">
            <div className="signup-section">
            <img src={logo} alt="Logo" className="signup-logo" />
                <h1>Créer votre compte</h1>
                <form>
                    <label>Nom</label>
                    <input type="text" placeholder="Enter your last name" />

                    <label>Prénom</label>
                    <input type="text" placeholder="Enter your first name" />

                    <label>Email</label>
                    <input type="email" placeholder="Enter your email" />

                    <label>Créer un nouveau mot de passe</label>
                    <input
                        type="password"
                        placeholder="Create a new password"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <label>Confirmez le mot de passe</label>
                    <div className="confirm-password-wrapper">
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {isMatch && <span className="valid-icon">✔️</span>}
                    </div>

                    <button type="submit" onClick={handleRegister}>S'INSCRIRE</button>
                </form>
            </div> 
        </div>
    );
}

export default SignUp;