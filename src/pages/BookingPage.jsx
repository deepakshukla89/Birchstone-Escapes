import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SEOMetaTags from '../components/common/SEOMetaTags';
import FAQ from '../components/common/FAQ';
import './BookingPage.css';

const BookingPage = () => {
    const navigate = useNavigate();

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [pets, setPets] = useState(0);
    const [showGuestPicker, setShowGuestPicker] = useState(false);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDatePicker && !event.target.closest('.booking-date-wrapper')) {
                setShowDatePicker(false);
            }
            if (showGuestPicker && !event.target.closest('.booking-guest-wrapper')) {
                setShowGuestPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDatePicker, showGuestPicker]);

    const handleSearch = () => {
        const params = new URLSearchParams({
            checkin: format(dateRange[0].startDate, 'yyyy-MM-dd'),
            checkout: format(dateRange[0].endDate, 'yyyy-MM-dd'),
            adults: adults.toString(),
            children: children.toString(),
            infants: infants.toString(),
            pets: pets.toString(),
            location: 'all'
        });

        navigate(`/search?${params.toString()}`);
    };

    const formatDateRange = () => {
        if (!dateRange[0].startDate || !dateRange[0].endDate) {
            return 'Check-in → Check-out';
        }
        const start = format(dateRange[0].startDate, 'MMM dd, yyyy');
        const end = format(dateRange[0].endDate, 'MMM dd, yyyy');
        return `${start} → ${end}`;
    };

    const totalGuests = adults + children;

    const bookingFaqs = [
        {
            question: "How do I book a property directly?",
            answer: "Simply select your dates and number of guests using the search form above, then click Search to view available properties. By booking directly, you avoid third-party fees and get the best rates."
        },
        {
            question: "What are the benefits of booking directly?",
            answer: "Booking directly with Birchstone Escapes means no corporate surcharges, direct communication with our team, access to exclusive offers, and a straightforward booking process."
        },
        {
            question: "Can I cancel or modify my booking?",
            answer: "Yes! Each property has its own cancellation policy. You can view the specific terms during the booking process. Contact us directly for any modifications."
        },
        {
            question: "How will I receive booking confirmation?",
            answer: "You'll receive an email confirmation immediately after booking, along with check-in details and property information."
        }
    ];

    return (
        <>
            <SEOMetaTags
                title="Book Your Stay | Birchstone Escapes"
                description="Book your luxury vacation rental directly with Birchstone Escapes. No corporate fees, best rates guaranteed."
                url="https://birchstoneescapes.com/booking"
            />

            <main className="booking-page">
                {/* Hero Image Section */}
                <section
                    className="booking-hero-image"
                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/image/homeHeroBg.png)` }}
                    aria-label="Luxury cabin exterior"
                />

                {/* Content Section */}
                <section className="booking-content-section">
                    <div className="booking-container">
                        {/* Message Card */}
                        <div className="booking-message-card">
                            <div className="booking-message-text">
                                <h1 className="booking-title">Your stay matters more than corporate fees.</h1>
                                <p className="booking-subtitle">
                                    By booking directly with Birchstone Escapes, you avoid the surcharges that third-party platforms add on.
                                    What you get instead: genuine conversations with our team, access to special offers, and a straightforward booking experience.
                                    Same quality escape, better price.
                                </p>
                            </div>
                            <div className="booking-divider"></div>
                        </div>

                        {/* Search Form */}
                        <div className="booking-search-section">
                            <h2 className="booking-search-title">Search and book your stay</h2>

                            <div className="booking-search-form">
                                {/* Date Range Picker */}
                                <div className="booking-date-wrapper">
                                    <button
                                        type="button"
                                        className="booking-input booking-date-toggle"
                                        onClick={() => setShowDatePicker(!showDatePicker)}
                                        aria-expanded={showDatePicker}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: '4px' }}>
                                            <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M2 7H16" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M6 1V5M12 1V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <span>{formatDateRange()}</span>
                                    </button>

                                    {showDatePicker && (
                                        <div className="booking-date-dropdown">
                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={item => setDateRange([item.selection])}
                                                moveRangeOnFirstSelection={false}
                                                ranges={dateRange}
                                                minDate={new Date()}
                                                rangeColors={['#EB973F']}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Guest Picker */}
                                <div className="booking-guest-wrapper">
                                    <button
                                        type="button"
                                        className="booking-input booking-guest-toggle"
                                        onClick={() => setShowGuestPicker(!showGuestPicker)}
                                        aria-expanded={showGuestPicker}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: '4px' }}>
                                            <circle cx="9" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M3 16C3 12.686 5.686 10 9 10C12.314 10 15 12.686 15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <span>{totalGuests} {totalGuests === 1 ? 'guest' : 'guests'}</span>
                                    </button>

                                    {showGuestPicker && (
                                        <div className="booking-guest-dropdown">
                                            <div className="booking-guest-row">
                                                <div className="booking-guest-label">
                                                    <strong>Adults</strong>
                                                    <span className="booking-guest-age">Age 13+</span>
                                                </div>
                                                <div className="booking-guest-counter">
                                                    <button
                                                        type="button"
                                                        onClick={() => setAdults(Math.max(1, adults - 1))}
                                                        aria-label="Decrease adults"
                                                    >
                                                        −
                                                    </button>
                                                    <span>{adults}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setAdults(adults + 1)}
                                                        aria-label="Increase adults"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="booking-guest-row">
                                                <div className="booking-guest-label">
                                                    <strong>Children</strong>
                                                    <span className="booking-guest-age">Ages 2 to 12</span>
                                                </div>
                                                <div className="booking-guest-counter">
                                                    <button
                                                        type="button"
                                                        onClick={() => setChildren(Math.max(0, children - 1))}
                                                        aria-label="Decrease children"
                                                    >
                                                        −
                                                    </button>
                                                    <span>{children}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setChildren(children + 1)}
                                                        aria-label="Increase children"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="booking-guest-row">
                                                <div className="booking-guest-label">
                                                    <strong>Infants</strong>
                                                    <span className="booking-guest-age">Under 2</span>
                                                </div>
                                                <div className="booking-guest-counter">
                                                    <button
                                                        type="button"
                                                        onClick={() => setInfants(Math.max(0, infants - 1))}
                                                        aria-label="Decrease infants"
                                                    >
                                                        −
                                                    </button>
                                                    <span>{infants}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setInfants(infants + 1)}
                                                        aria-label="Increase infants"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="booking-guest-row booking-guest-row-disabled">
                                                <div className="booking-guest-label">
                                                    <strong>Pets</strong>
                                                    <span className="booking-guest-age">Not allowed</span>
                                                </div>
                                                <div className="booking-guest-counter">
                                                    <button
                                                        type="button"
                                                        disabled
                                                        aria-label="Decrease pets"
                                                    >
                                                        −
                                                    </button>
                                                    <span>0</span>
                                                    <button
                                                        type="button"
                                                        disabled
                                                        aria-label="Increase pets"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="booking-guest-note">
                                                This property hosts a maximum of 14 guests (not including infants). Pets are not allowed.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Search Button */}
                                <button
                                    type="button"
                                    className="booking-search-btn"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="booking-faq-section">
                    <FAQ faqs={bookingFaqs} title="General Asked Questions" />
                </section>
            </main>
        </>
    );
};

export default BookingPage;
