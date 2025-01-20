import React from "react";
import './form.css'

const DynamicForm = ({ fields, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            {fields.map((field, index) => (
                <div key={index}>
                    <label>{field.label}</label>
                    {field.type === 'radio' ? (
                        // Gestion des boutons radio
                        field.options.map((option, i) => (
                            <div key={i} style={{ marginLeft: "20px" }}>
                                <input
                                    type="radio"
                                    id={`${field.name}-${option.value}`}
                                    name={field.name}
                                    value={option.value}
                                />
                                <label htmlFor={`${field.name}-${option.value}`}>
                                    {option.label}
                                </label>
                            </div>
                        ))
                    ) : (
                        // Gestion des autres types de champs
                        <input
                            type={field.type}
                            name={field.name}
                            defaultValue={field.defaultValue || ""}
                        />
                    )}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}

export default DynamicForm;