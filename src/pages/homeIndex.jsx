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
            question: "What is TimbrLux Stays?",
            answer: "TimbrLux Stays is a boutique vacation rental brand offering thoughtfully designed stays focused on comfort, quality, and memorable guest experiences."
        },
        {
            question: "Why should I book directly through your website?",
            answer: "Booking direct gives you the best available rate, direct communication with your host, priority support, and no third-party platform fees."
        },
        {
            question: "Is the home suitable for families or groups?",
            answer: "Yes. The chalet is designed for families and groups, with spacious gathering areas, thoughtful amenities, and a layout that encourages connection and relaxation."
        },
        {
            question: "What is included with my stay?",
            answer: "Your stay includes fresh linens, bath towels, starter paper products, a fully equipped kitchen, high-speed Wi-Fi, and curated local recommendations."
        },
        {
            question: "How does check-in work?",
            answer: "For your convenience and security, our home features electronic locks with no physical keys. Each guest receives a unique access code generated specifically for their stay, ensuring easy entry and added protection."
        },
        {
            question: "Who do I contact if I have questions during my stay?",
            answer: "You'll have direct access to your host and support team. Contact details are provided on our website, in your pre-arrival email, and in your guest portal."
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
