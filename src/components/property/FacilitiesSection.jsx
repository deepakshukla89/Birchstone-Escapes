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

    const facilities = [
        {
            id: 1,
            title: "Living Room",
            description: "Relax in the inviting living space, complete with stylish furnishings and large windows that frame the natural beauty outside.",
            image: "living-room.jpg"
        },
        {
            id: 2,
            title: "Kitchen",
            description: "Cook like a pro in the fully equipped, modern kitchen featuring stainless steel appliances, a spacious island, and everything you need to prepare meals at home. Coffee machine, drip coffee.",
            image: "kitchen-b.jpg"
        },
        {
            id: 3,
            title: "Dining Area",
            description: "Share meals with family and friends at the large dining table with seating for up to 10—all while enjoying sweeping mountain views.",
            image: "dining-b.jpg"
        },
        {
            id: 4,
            title: "Primary Bedroom",
            description: "Retreat to the spacious primary suite featuring a plush king bed with premium linens and a private ensuite bathroom. A sleeper sofa provides extra sleeping space.",
            image: "bedroom-1-a.jpg"
        },
        {
            id: 5,
            title: "Bedroom 2 (King Bed)",
            description: "Wake up to gorgeous mountain views in this elegant bedroom. A calming wallpaper backdrop, premium linens, a smart TV, and a built-in workstation make it both restful and functional.",
            image: "bedroom-2-a.jpg"
        },
        {
            id: 6,
            title: "Bedroom 3 (Bunk Bed)",
            description: "Perfect for kids or friends, this cozy room features a fun twin-over-twin bunk setup, soft bedding, and playful décor. Located near the shared bathroom for easy access.",
            image: "bedroom-3.jpg"
        },
        {
            id: 7,
            title: "Bedroom 4 (Two Queen Beds)",
            description: "Bright and versatile, this room boasts two queen beds with high-quality linens. Convenient touches, such as luggage racks, mirrors, and ample storage, make settling in effortless.",
            image: "bedroom-4-a.jpg"
        },
        {
            id: 8,
            title: "Bedroom 5 (Two Queen Beds)",
            description: "Offering sweeping mountain views, this spacious room features two plush queen beds, cozy lighting, and serene décor—ideal for groups or families.",
            image: "bedroom-5-a.jpg"
        },
        {
            id: 9,
            title: "Firepit",
            description: "Gather around the outdoor fire pit for cozy evenings under the stars. Perfect for warming up, relaxing, and enjoying the crisp mountain air. (available if the weather allows)",
            image: "firepit.jpg"
        },
        {
            id: 10,
            title: "Hot Tub",
            description: "Experience pure relaxation in the outdoor hot tub nestled in nature. Perfect for unwinding after a day of mountain adventures.",
            image: "hot-tub-a.jpg"
        },
        {
            id: 11,
            title: "Sauna",
            description: "Experience the healing warmth of our sauna retreat. The perfect way to unwind, cleanse, and reconnect with yourself in peaceful solitude.",
            image: "barrel-sauna-a.jpg"
        },
        {
            id: 12,
            title: "Speakeasy Lounge",
            description: "Our speakeasy-inspired lounge is your ultimate hangout. With a built-in TV, plush seating, and a full bar setup, it's perfect for movie nights, cocktails, and friends.",
            image: "speakeasy-a.jpg"
        },
        {
            id: 13,
            title: "Game Room",
            description: "Our game room is where fun happens. From pool and foosball to arcade games and classic board games, there's something for everyone.",
            image: "game-room-a.jpg"
        },
        {
            id: 14,
            title: "Primary Ensuite",
            description: "Full bath with modern finishes and private access.",
            image: "full-bathroom-1-a.jpg"
        },
        {
            id: 15,
            title: "Bathroom 2 (Main Floor)",
            description: "Full bath conveniently located for guests.",
            image: "full-bathroom-2-a.jpg"
        },
        {
            id: 16,
            title: "Bathroom 3 (Basement)",
            description: "Full bath near the game room and additional bedrooms.",
            image: "full-bathroom-3-a.jpg"
        }
    ];

    // SEO Schema for Facilities (ItemList)
    const facilitiesSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Property Facilities - Frost Pine Chalet",
        "description": "Explore the premium facilities available at Frost Pine Chalet, including 5 bedrooms, game room, hot tub, sauna, and more.",
        "itemListElement": facilities.map((facility, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Accommodation",
                "name": facility.title,
                "description": facility.description,
                "image": `${process.env.PUBLIC_URL}/image/facilities/${facility.image}`
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
                        <h2 id="facilities-title" className="facilities-main-title">Take a look at our facilities</h2>
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
                        640: {
                            slidesPerView: 1.2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        }
                    }}
                    className="facilities-swiper"
                >
                    {facilities.map((facility) => (
                        <SwiperSlide key={facility.id}>
                            <article className="facility-card" itemScope itemType="https://schema.org/Place">
                                <div className="facility-image-wrapper">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/image/facilities/${facility.image}`}
                                        alt={facility.title}
                                        className="facility-image"
                                        itemProp="image"
                                        loading="lazy"
                                        width="550"
                                        height="420"
                                    />
                                </div>
                                <div className="facility-content">
                                    <h3 className="facility-name" itemProp="name">{facility.title}</h3>
                                    <p className="facility-description" itemProp="description">{facility.description}</p>
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FacilitiesSection;
