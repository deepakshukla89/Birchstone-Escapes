import React, { useState, useEffect } from 'react';
import './SignupOfferPopup.css';

const SignupOfferPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if popup has been shown before
        const hasSeenPopup = localStorage.getItem('timbrlux_signup_popup_seen');
        const hasSignedUp = localStorage.getItem('timbrlux_signup_email');

        if (!hasSeenPopup && !hasSignedUp) {
            // Show popup after 3 seconds on first visit
            const timer = setTimeout(() => {
                setIsVisible(true);
                localStorage.setItem('timbrlux_signup_popup_seen', 'true');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            localStorage.setItem('timbrlux_signup_email', email);
            setIsSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="signup-popup-overlay" onClick={handleClose}>
            <div className="signup-popup" onClick={(e) => e.stopPropagation()}>
                <button
                    className="signup-popup-close"
                    onClick={handleClose}
                    aria-label="Close popup"
                >
                    ×
                </button>

                {!isSubmitted ? (
                    <>
                        <div className="signup-popup-content">
                            <span className="signup-popup-badge">NEW GUEST OFFER</span>
                            <h2 className="signup-popup-title">
                                Save 10% on Your First Stay
                            </h2>
                            <p className="signup-popup-description">
                                Sign up for exclusive access to special offers and be the first to know about new experiences.
                            </p>
                        </div>

                        <form className="signup-popup-form" onSubmit={handleSubmit}>
                            <div className="signup-popup-input-group">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={error ? 'error' : ''}
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="submit"
                                    className="signup-popup-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Signing up...' : 'Get 10% Off'}
                                </button>
                            </div>
                            {error && <p className="signup-popup-error">{error}</p>}
                            <p className="signup-popup-terms">
                                One-time use per email. New customers only.
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="signup-popup-success">
                        <div className="signup-popup-success-icon">✓</div>
                        <h2 className="signup-popup-title">You're In!</h2>
                        <p className="signup-popup-description">
                            Check your email for your exclusive 10% discount code.
                        </p>
                        <button
                            className="signup-popup-btn"
                            onClick={handleClose}
                        >
                            Start Exploring
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignupOfferPopup;
