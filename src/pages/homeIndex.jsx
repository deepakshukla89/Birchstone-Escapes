import React from 'react';
import SEOMetaTags from '../components/common/SEOMetaTags';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowToBook from '../components/home/HowToBook';
import AccommodationsSection from '../components/home/AccommodationsSection';
import Testimonials from '../components/common/Testimonials';
import FAQ from '../components/common/FAQ';
import BookingCard from '../components/common/BookingCard';
// If homepageScreen.css was moved to home/
import '../components/home/homepageScreen.css';

const HomeIndex = () => {
    const homeFaqs = [
        {
            question: "What is included in my stay?",
            answer: "Every stay includes fresh linens, towels, toiletries, a fully equipped kitchen, high-speed WiFi, and access to all property amenities. We also provide a welcome guide with local recommendations."
        },
        {
            question: "What is the check-in and check-out time?",
            answer: "Check-in is at 4:00 PM and check-out is at 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability."
        },
        {
            question: "Is the property pet-friendly?",
            answer: "Some of our properties welcome pets! Please check the individual property listing for pet policies, or contact us directly with questions about your furry friend."
        },
        {
            question: "How do I contact the host?",
            answer: "You can reach us anytime through the TimbrLux Stays messaging system, or via email at hello@timbrluxstays.com.We typically respond within a few hours."
        }
    ];

    return (
        <>
            <SEOMetaTags
                title="TimbrLux Stays | Luxury Vacation Rentals"
                description="At TimbrLux Stays, we believe a great stay is more than a getaway — it's a feeling. Beautifully designed vacation home hosted with genuine warmth."
                url="https://timbrluxstays.com"
            />

            <main className="homepage">
                <Hero />
                <AccommodationsSection />
                <AboutSection />
                <FeaturesSection />
                <HowToBook />
                <Testimonials testimonials={[
                    {
                        text: "This is an outstanding home! Came upon this cabin by chance when we were looking for a family vacation. It's a true gem! The views are breathtaking, and the place has such a calm and private feel. It was spotless! The kitchen is fully stocked for meal prep which was important to us. Enjoyed quiet mornings drinking coffee on the deck watching the beautiful light in the trees. There was an amazing sense of peace all around. We really didn't want to leave to visit the town. There were so many amenities. There is a hot tub, game room, and sauna we enjoyed. We spent evenings at the fire pit with our family. Vikas was a wonderland responsive host. We're definitely coming back!",
                        author: "Sangeeta P."
                    },
                    {
                        text: "Met a couple of other families to reconnect and take advantage of the outdoor activities in the area. The house is great for that. it provides large communal areas to hang out with family/friends and it's close to local activities. The house does not disappoint. It looks as good as the pictures. The view of the mountain is amazing. We enjoyed watching New Year's fireworks from the living room.",
                        author: "Kevin H."
                    },
                    {
                        text: "Our family absolutely loved this stay! The mountain views were breathtaking especially at sunrise and sunset. The home was spotless, cozy, and had everything we needed for a relaxing getaway. The host was friendly and responsive, making check-in and communication super easy. It was the perfect mix of peaceful nature and family comfort. We can’t wait to come back, highly recommend!",
                        author: "Felix L."
                    },
                    {
                        text: "A dream rental! The view is even better than the pictures, the amenities are amazing! This place is a gem. Vikas is an amazing host as well! Very proactive and has really thought of everything to create a peaceful and memorable stay. 10 stars!!!",
                        author: "Meridith K."
                    }
                ]} />
                <FAQ faqs={homeFaqs} />
                <BookingCard />
            </main>
        </>
    );
};

export default HomeIndex;
