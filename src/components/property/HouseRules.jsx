import React from 'react';
import './HouseRules.css';

const HouseRules = ({ compact = false }) => {
    const rules = [
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            ),
            title: "Check-in / Check-out",
            description: "Check-in: After 4:00 PM | Check-out: by 10:00 AM"
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            ),
            title: "Maximum Guests",
            description: "Maximum of 14 guests allowed per booking."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            ),
            title: "Minimum Age",
            description: "Minimum booking age is 25 years old."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
            ),
            title: "No Smoking",
            description: "Smoking is not permitted anywhere on the property."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
            ),
            title: "No Pets",
            description: "Pets are not allowed at this property."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
            ),
            title: "No Parties",
            description: "Parties and events are strictly prohibited."
        }
    ];

    if (compact) {
        return (
            <div className="house-rules-compact">
                <h4 className="house-rules-compact-title">House Rules</h4>
                <ul className="house-rules-compact-list">
                    {rules.map((rule, index) => (
                        <li key={index}>
                            <strong>{rule.title}:</strong> {rule.description}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <section className="house-rules-section" aria-labelledby="house-rules-title">
            <div className="house-rules-container">
                <h2 id="house-rules-title" className="house-rules-title">House Rules</h2>
                <p className="house-rules-subtitle">
                    Please review our house rules to ensure a comfortable stay for everyone.
                </p>

                <div className="house-rules-grid">
                    {rules.map((rule, index) => (
                        <div className="house-rule-item" key={index}>
                            <div className="house-rule-icon">{rule.icon}</div>
                            <div className="house-rule-content">
                                <h3 className="house-rule-title">{rule.title}</h3>
                                <p className="house-rule-description">{rule.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HouseRules;
