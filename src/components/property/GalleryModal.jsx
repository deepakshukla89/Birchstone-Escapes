import React, { useEffect } from 'react';
import './GalleryModal.css';

const GalleryModal = ({ isOpen, onClose, images, propertyName }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="gallery-modal-overlay" onClick={onClose}>
            <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>
                <div className="gallery-modal-header">
                    <button className="gallery-modal-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <h2>Photos of {propertyName}</h2>
                </div>
                <div className="gallery-modal-grid">
                    {images.map((img, index) => (
                        <div key={index} className="gallery-modal-item">
                            <img src={img.url} alt={img.caption || `${propertyName} photo ${index + 1}`} loading="lazy" />
                            {img.caption && <p className="gallery-modal-caption">{img.caption}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryModal;
