import React from 'react';
import { Link } from 'react-router-dom';
import './ExperienceSection.css';

const ExperienceSection = ({
    label = "Your Journey",
    title = "How It Works",
    steps = []
}) => {
    // Default steps with icons
    const defaultSteps = [
        {
            number: "01",
            title: "Discover",
            description: "Explore our premium mountain retreat",
            icon: "search"
        },
        {
            number: "02",
            title: "Book",
            description: "Reserve your perfect getaway in minutes",
            icon: "calendar"
        },
        {
            number: "03",
            title: "Arrive",
            description: "Check in seamlessly and start relaxing",
            icon: "home"
        }
    ];

    const stepList = steps.length > 0 ? steps : defaultSteps;

    // Icon SVGs
    const icons = {
        search: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        calendar: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        home: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    };

    // Schema.org HowTo structured data
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": title,
        "step": stepList.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.title,
            "text": step.description
        }))
    };

    return (
        <section
            className="experience-section"
            aria-labelledby="experience-title"
            itemScope
            itemType="https://schema.org/HowTo"
        >
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <div className="experience-container">
                {/* Header */}
                <div className="experience-header">
                    <span className="experience-label">{label}</span>
                    <h2 className="experience-title" id="experience-title" itemProp="name">
                        {title}
                    </h2>
                </div>

                {/* Timeline Steps */}
                <div className="experience-timeline">
                    {stepList.map((step, index) => (
                        <div
                            key={index}
                            className="experience-step"
                            itemProp="step"
                            itemScope
                            itemType="https://schema.org/HowToStep"
                        >
                            {/* Icon Circle */}
                            <div className="step-icon-wrapper">
                                <div className="step-icon">
                                    {icons[step.icon]}
                                </div>
                                {index < stepList.length - 1 && (
                                    <div className="step-connector" aria-hidden="true" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="step-content">
                                <span className="step-number">{step.number}</span>
                                <h3 className="step-title" itemProp="name">{step.title}</h3>
                                <p className="step-description" itemProp="text">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="experience-cta-wrapper">
                    <Link to="/booking" className="experience-cta">
                        <span>Start Your Escape</span>
                        <span className="experience-cta-arrow">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
