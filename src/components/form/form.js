import React from "react";
import './form.css'

const DynamicForm = ({ fields, onSubmit, values, setValues }) => {
    const handleChange = (e) => {
        console.log("handleChange ",e.target);
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <div className="dynamic-form grid-layout">
            {fields.map((field, index) => (
                <div key={index} className={`form-group grid-item ${field.type === 'textarea' ? 'textarea-item' : ''}`}>
                    <label className="form-label">{field.label}</label>
                    {field.type === 'radio' ? (
                        // Gestion des boutons radio
                        field.options.map((option, i) => (
                            <div key={i} className="form-radio-option" style={{ marginLeft: "20px" }}>
                                <input
                                    type="radio"
                                    id={`${field.name}-${option.value}`}
                                    name={field.name}
                                    value={option.value}
                                    className="form-radio-input"
                                />
                                <label htmlFor={`${field.name}-${option.value}`} className="form-radio-label">
                                    {option.label}
                                </label>
                            </div>
                        ))
                    ) : field.type === 'textarea' ? (
                        // Gestion des textarea
                        <textarea
                            id={field.name}
                            name={field.name}
                            value={values[field.name] || ""}
                            onChange={handleChange}
                            className="form-textarea"
                        />
                    ) : (
                        // Gestion des autres types de champs
                        <input
                            type={field.type}
                            name={field.name}
                            value={values[field.name] || ""}
                            onChange={handleChange}
                            className="form-input"
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default DynamicForm;