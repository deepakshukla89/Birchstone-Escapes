import React from 'react';
import './MeetHost.css';

const MeetHost = () => {
    const hostSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Vikas",
        "jobTitle": "Host & Founder",
        "worksFor": {
            "@type": "Organization",
            "name": "Birchstone Escapes"
        },
        "description": "Vikas started Birchstone Escapes with a simple goal: to create vacation homes that feel welcoming and easy."
    };

    return (
        <section
            className="meet-host-section"
            aria-labelledby="host-title"
            itemScope
            itemType="https://schema.org/Person"
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hostSchema) }}
            />

            <div className="meet-host-container">
                {/* Content */}
                <div className="meet-host-content">
                    <h2 id="host-title" className="meet-host-title" itemProp="name">
                        Meet your host :) <span className="host-name-italic">Vikas</span>
                    </h2>
                    <p className="meet-host-description" itemProp="description">
                        Vikas started Birchstone Escapes with a simple goal: to create vacation homes that feel welcoming and easy, not just places to sleep. He believes the best stays come from thoughtful details and genuine care.
                        <br /><br />
                        Guests know him for being responsive, approachable, and committed to keeping property comfortable and well‑maintained. For Vikas, hospitality is about making sure you feel at home — whether you're here to relax, explore, or celebrate.
                    </p>
                </div>

                {/* Image */}
                <div className="meet-host-image-wrapper">
                    <div className="meet-host-image-bg"></div>
                    <img
                        src="https://picsum.photos/seed/vikas/321/343"
                        alt="Vikas - Host of Birchstone Escapes"
                        className="meet-host-image"
                        itemProp="image"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default MeetHost;
