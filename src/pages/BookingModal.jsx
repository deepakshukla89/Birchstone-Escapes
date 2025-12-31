import React, { useEffect, useRef } from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

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
                                Book & Save upto <br />
                                15% discount
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
