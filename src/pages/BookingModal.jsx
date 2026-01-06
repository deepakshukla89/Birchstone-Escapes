import React, { useEffect, useRef } from 'react';
import HouseRules from '../components/property/HouseRules';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Parse query params and update iframe src
        const updateIframeSrc = () => {
            if (!iframeRef.current) return;

            const params = new URLSearchParams(window.location.search);
            const checkin = params.get("checkin");
            const checkout = params.get("checkout");
            const adults = params.get("adults");
            const children = params.get("children");
            const infants = params.get("infants");
            const pets = params.get("pets");

            let newSrc = iframeRef.current.src;
            // Only update if we have relevant params and src doesn't already have them to avoid loops
            if (checkin || checkout || adults || children || infants || pets) {
                // Check if params already exist in src to avoid duplicates if re-running
                if (!newSrc.includes("checkin=")) {
                    newSrc += newSrc.includes("?") ? "&" : "?";
                    const queryParts = [];
                    if (checkin) queryParts.push(`checkin=${checkin}`);
                    if (checkout) queryParts.push(`checkout=${checkout}`);
                    if (adults) queryParts.push(`adults=${adults}`);
                    if (children) queryParts.push(`children=${children}`);
                    if (pets) queryParts.push(`pets=${pets}`);
                    if (infants) queryParts.push(`infants=${infants}`);

                    if (queryParts.length > 0) {
                        iframeRef.current.src = newSrc + queryParts.join("&");
                    }
                }
            }
        };

        // Run immediately
        updateIframeSrc();

        const handleMessage = (event) => {
            // Check if message is from Hospitable
            if (event.data && (event.data.type === 'hospitable_resize' || event.data.iframeHeight)) {
                const newHeight = event.data.height || event.data.iframeHeight;
                if (newHeight && iframeRef.current) {
                    // Adding extra 8px as requested
                    iframeRef.current.style.height = `${parseInt(newHeight) + 8}px`;
                }
            }
        };

        window.addEventListener('message', handleMessage);

        // Cleanup
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('message', handleMessage);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="booking-modal-overlay" onClick={onClose}>
            <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="booking-modal-header">
                    <h2>Book Your Stay</h2>
                    <button
                        className="booking-modal-close"
                        onClick={onClose}
                        aria-label="Close booking modal"
                    >
                        ×
                    </button>
                </div>
                <div className="booking-modal-body">
                    <div className="left-section">
                        <div className="promo-content">
                            <img src="/image/ready-to-book.png" alt="Book your stay" className="promo-image" />
                            <p className="promo-text">
                                Your perfect <br />
                                getaway awaits
                            </p>
                        </div>
                    </div>
                    <div className="iframe-container">
                        <iframe
                            ref={iframeRef}
                            id="booking-iframe"
                            sandbox="allow-top-navigation allow-scripts allow-same-origin"
                            frameBorder="0"
                            src="https://booking.hospitable.com/widget/a0b9a24b-c242-4195-aa65-2d78d0e6e6e6/1967238"
                            title="Booking Widget"
                        />
                        <HouseRules compact />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
