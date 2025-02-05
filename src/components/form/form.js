import React, { useState, useEffect } from "react";
import './form.css';

const DynamicForm = ({ fields, onSubmit, sectionName, values, setValues }) => {
    // État local pour gérer les données du formulaire
    const [formData, setFormData] = useState(values || {});

    // Synchroniser formData avec les valeurs passées par le parent
    useEffect(() => {
        console.log("Valeurs reçues dans DynamicForm:", values); // Debugging
        setFormData(values || {});
    }, [values]);

    // Gestionnaire de changement pour les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Changement détecté:", name, value); // Debugging
        // Mise à jour de l'état local
        const updatedFormData = { ...formData, [name]: value };
        console.log("Nouveau formData:", updatedFormData); // Debugging
        setFormData(updatedFormData);

        // Informer le parent de la mise à jour
        setValues(updatedFormData);
    };

    // Gestionnaire de soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, sectionName); // Appeler la fonction de soumission du parent
    };

    return (
        <form onSubmit={handleSubmit} className="dynamic-form grid-layout">
            {fields.map((field, index) => (
                <div key={index} className={`form-group grid-item ${field.type === 'textarea' ? 'textarea-item' : ''}`}>
                    <label className="form-label">{field.label}</label>
                    {
                    field.type === 'radio' ? (
                        // Cas des boutons radio
                        field.options.map((option, i) => (
                            <div key={i} className="form-radio-option" style={{ marginLeft: "20px" }}>
                                <input
                                    type="radio"
                                    id={`${field.name}-${option.value}`}
                                    name={field.name}
                                    value={option.value}
                                    checked={formData[field.name] === option.value} // Ajoutez cette ligne
                                    onChange={handleChange}
                                    className="form-radio-input"
                                />
                                <label htmlFor={`${field.name}-${option.value}`} className="form-radio-label">
                                    {option.label}
                                </label>
                            </div>
                        ))
                    ) : field.type === 'textarea' ? (
                        // Cas des zones de texte multilignes
                        <textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={handleChange}
                            className="form-textarea"
                        />
                    ) : (
                        // Cas des champs de texte, nombre, etc.
                        <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ""} // Utilisez formData au lieu de values
                            onChange={handleChange}
                            className="form-input"
                        />
                    )}
                </div>
            ))}
            <button type="submit" className="form-submit-button">Enregistrer</button>
        </form>
    );
};

export default DynamicForm;