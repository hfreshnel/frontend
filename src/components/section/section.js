import React, { useState } from 'react';
import './section.css';

const CollapsibleSection = ({ title, children }) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="section">
            <div className="section-header" onClick={toggleCollapse}>
                <h2>{title}</h2>
                <span className="toggle-indicator">{collapsed ? '+' : '-'}</span>
            </div>
            <div className={`section-content ${collapsed ? 'collapsed' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default CollapsibleSection;