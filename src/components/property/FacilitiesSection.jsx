import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './FacilitiesSection.css';

const FacilitiesSection = () => {
    const swiperRef = useRef(null);

    // Dummy data: 20 items
    const facilities = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `Facilities ${i + 1}`,
        description: i % 2 === 0
            ? "The kitchen features sleek Fisher & Paykel appliances, a built-in wine fridge, and plenty of bar seating—perfect for cooking, entertaining, and gathering together."
            : "An open concept space that features a wood burning stove and large, lighting filling windows with stunning views of Hunter Mountain, right in your backyard.",
        image: `https://picsum.photos/seed/facility${i + 1}/550/420`
    }));

    // SEO Schema for Facilities (ItemList or specific Place items)
    const facilitiesSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Property Facilities",
        "description": "Explore the premium facilities available at our vacation rentals.",
        "itemListElement": facilities.map((facility, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Thing",
                "name": facility.title,
                "description": facility.description,
                "image": facility.image
            }
        }))
    };

    return (
        <section
            className="facilities-section"
            aria-labelledby="facilities-title"
        >
            {/* SEO Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(facilitiesSchema) }}
            />

            <div className="facilities-container">
                {/* Header Section */}
                <div className="facilities-header">
                    <div className="facilities-title-group">
                        <span className="facilities-subtitle">GET A LAY OF THE LAND</span>
                        <h2 id="facilities-title" className="facilities-main-title">Take a look of facilities</h2>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="facilities-nav">
                        <button
                            className="facilities-nav-btn prev"
                            onClick={() => swiperRef.current?.swiper.slidePrev()}
                            aria-label="Previous facility"
                        >
                            <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 1H0" stroke="#722F37" strokeWidth="1.5" />
                                <path d="M4 0L0 1L4 2" stroke="#722F37" strokeWidth="1.5" />
                            </svg>
                        </button>
                        <button
                            className="facilities-nav-btn next"
                            onClick={() => swiperRef.current?.swiper.slideNext()}
                            aria-label="Next facility"
                        >
                            <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 1H16" stroke="#722F37" strokeWidth="1.5" />
                                <path d="M12 0L16 1L12 2" stroke="#722F37" strokeWidth="1.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Carousel Section */}
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Autoplay, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2
                        },
                        1024: {
                            slidesPerView: 3
                        }
                    }}
                    className="facilities-swiper"
                >
                    {facilities.map((facility) => (
                        <SwiperSlide key={facility.id}>
                            <div className="facility-card" itemScope itemType="https://schema.org/Place">
                                <div className="facility-image-wrapper">
                                    <img
                                        src={facility.image}
                                        alt={facility.title}
                                        className="facility-image"
                                        itemProp="image"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="facility-content">
                                    <h3 className="facility-name" itemProp="name">{facility.title}</h3>
                                    <p className="facility-description" itemProp="description">{facility.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FacilitiesSection;
