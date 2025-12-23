import React, { useState, useEffect, useCallback } from 'react';
import './Testimonials.css';

const Testimonials = ({ testimonials = [], autoPlayInterval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [key, setKey] = useState(0); // Key for animation restart

    // Default testimonials
    const defaultTestimonials = [
        {
            text: "Such a beautiful, warm, welcoming house! Has everything you need for a relaxing mountain or ski getaway! We absolutely would come back and just lovedddd this house! Host was easy to reach, answered any questions quickly, check in was easy!",
            author: "John Doe"
        },
        {
            text: "An absolutely stunning property with breathtaking views. The attention to detail was remarkable and the host went above and beyond to make our stay special. Highly recommend!",
            author: "Sarah Smith"
        },
        {
            text: "Perfect getaway spot! The home was spotless, beautifully decorated, and had all the amenities we needed. Can't wait to come back!",
            author: "Mike Johnson"
        },
        {
            text: "We had the most amazing family vacation here. The kids loved it and so did we. Everything was perfect from start to finish.",
            author: "Emily Brown"
        },
        {
            text: "This place exceeded all our expectations. The photos don't do it justice - it's even more beautiful in person!",
            author: "David Wilson"
        }
    ];

    const reviews = testimonials.length > 0 ? testimonials : defaultTestimonials;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setKey((prev) => prev + 1); // Restart animation
    }, [reviews.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
        setKey((prev) => prev + 1);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setKey((prev) => prev + 1);
    };

    // Auto-play every 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [nextSlide, autoPlayInterval]);

    // Schema.org Review structured data
    const reviewSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Birchstone Escapes Vacation Rental",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "reviewCount": reviews.length.toString()
        },
        "review": reviews.map((review) => ({
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5"
            },
            "author": {
                "@type": "Person",
                "name": review.author
            },
            "reviewBody": review.text
        }))
    };

    // Get dot class based on index
    const getDotClass = (index) => {
        if (index < currentIndex) return 'completed';
        if (index === currentIndex) return 'active';
        return '';
    };

    return (
        <section
            className="testimonials"
            aria-label="Guest testimonials"
            itemScope
            itemType="https://schema.org/Product"
        >
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
            />

            {/* Background Watermark Text */}
            <span className="testimonials-watermark" aria-hidden="true">STORIES</span>

            <div className="testimonials-container">
                {/* Quote Mark */}
                <span className="testimonials-quote" aria-hidden="true">"</span>

                {/* Testimonial Content with fade transition */}
                <div
                    className="testimonials-content"
                    key={currentIndex}
                    itemScope
                    itemProp="review"
                    itemType="https://schema.org/Review"
                >
                    <blockquote
                        className="testimonials-text"
                        itemProp="reviewBody"
                    >
                        {reviews[currentIndex].text}
                    </blockquote>
                    <cite
                        className="testimonials-author"
                        itemProp="author"
                        itemScope
                        itemType="https://schema.org/Person"
                    >
                        <span itemProp="name">{reviews[currentIndex].author}</span>
                    </cite>
                </div>

                {/* Navigation */}
                <div className="testimonials-nav" role="group" aria-label="Testimonial navigation">
                    {/* Prev Button */}
                    <button
                        className="testimonials-arrow testimonials-arrow-prev"
                        onClick={prevSlide}
                        aria-label="Previous testimonial"
                    >
                        <span>←</span>
                    </button>

                    {/* Progress Bar */}
                    <div className="testimonials-progress" role="tablist" aria-label="Testimonial indicators">
                        {reviews.map((_, index) => (
                            <div
                                key={index}
                                className={`testimonials-dot ${getDotClass(index)}`}
                                onClick={() => goToSlide(index)}
                                role="tab"
                                aria-selected={index === currentIndex}
                                aria-label={`Go to testimonial ${index + 1}`}
                            >
                                {index === currentIndex && (
                                    <span
                                        key={key}
                                        className="testimonials-dot-progress"
                                        style={{ animationDuration: `${autoPlayInterval}ms` }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        className="testimonials-arrow testimonials-arrow-next"
                        onClick={nextSlide}
                        aria-label="Next testimonial"
                    >
                        <span>→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
