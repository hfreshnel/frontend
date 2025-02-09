import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postNewKine } from "../../api/fetching";
import "./register.css";
import logo from "../../assets/images/logo_1.png";

/**
 * SignUp component for user registration.
 * 
 * This component renders a form for new user registration, including fields for
 * name, email, and password. It handles form submission, input validation,
 * and navigation after successful registration.
 * 
 * @returns {JSX.Element} The rendered SignUp component.
 */
function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [isMatch, setIsMatch] = useState(false);
    const [adresse, setAdresse] = useState({
        code_postal: "",
        rue: "",
        ville: ""
    });

    /**
     * Handles the registration form submission.
     * 
     * This function prevents the default form submission, validates the passwords,
     * creates a new kine object, and attempts to register the user via an API call.
     * If successful, it logs the response and navigates to the home page.
     * 
     * @param {Event} e - The form submission event.
     * @returns {Promise<void>}
     */
    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        const newKine = {
          email,
          mdp: password,
          nom,
          prenom,
          tel: "",
          adresse
        };

        const response = await postNewKine(newKine);
        if (response) {
          console.log('Kine registered successfully:', response);
            navigate('/');
        } else {
          console.error('Failed to register kine');
        }
    };

    /**
     * Handles changes to the email input field.
     * 
     * @param {Event} e - The input change event.
     */
    const handleEmailChange = (e) => setEmail(e.target.value);

    /**
     * Handles changes to the password input field.
     * 
     * @param {Event} e - The input change event.
     */
    const handlePasswordChange = (e) => setPassword(e.target.value);

    /**
     * Handles changes to the confirm password input field.
     * 
     * This function updates the confirmPassword state and checks if it matches
     * the password, updating the isMatch state accordingly.
     * 
     * @param {Event} e - The input change event.
     */
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
                <form onSubmit={handleRegister}>
                    <label>Nom</label>
                    <input 
                        type="text" 
                        placeholder="Enter your last name" 
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />

                    <label>Prénom</label>
                    <input 
                        type="text" 
                        placeholder="Enter your first name" 
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                    />

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

                    <button type="submit">S'INSCRIRE</button>
                </form>
            </div> 
        </div>
    );
}

export default SignUp;