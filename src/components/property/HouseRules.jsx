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
            description: "Check-in: 4:00 PM EST | Check-out: 10:00 AM EST"
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
                    <path d="M12 2C8 6 4 10 4 14a8 8 0 0 0 16 0c0-4-4-8-8-12Z" />
                </svg>
            ),
            title: "Pets Welcome",
            description: "Well-behaved dogs allowed ($50 fee, max 2 dogs)."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
            ),
            title: "No Parties",
            description: "Parties and events are not allowed."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            ),
            title: "Quiet Hours",
            description: "Please observe quiet hours from 10 PM to 8 AM."
        },
        {
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            ),
            title: "Maximum Guests",
            description: "Maximum of 10 guests allowed per booking."
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
