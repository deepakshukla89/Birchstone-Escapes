import { Helmet } from 'react-helmet';

const SEOMetaTags = ({
    title = "TimbrLux Stays",
    description = "At TimbrLux Stays, we believe a great stay is more than a getaway — it's a feeling. Beautifully designed vacation home hosted with genuine warmth.",
    keywords = "vacation rentals, luxury stays, vacation homes, TimbrLux Stays, getaway, travel, accommodation",
    image = "/image/og-image.jpg",
    url = "https://timbrluxstays.com",
    type = "website"
}) => {
    const fullTitle = title === "TimbrLux Stays"
        ? title
        : `${title} | TimbrLux Stays`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEOMetaTags;
