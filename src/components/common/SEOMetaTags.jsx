import { Helmet } from 'react-helmet';

const SEOMetaTags = ({
    title = "Birchstone Escapes",
    description = "Beautifully designed vacation homes, cared for with intention, and hosted with genuine warmth. Experience stays that feel unforgettable, effortless, and deeply comforting.",
    keywords = "vacation rentals, luxury stays, vacation homes, Birchstone Escapes, getaway, travel, accommodation",
    image = "/image/og-image.jpg",
    url = "https://birchstoneescapes.com",
    type = "website"
}) => {
    const fullTitle = title === "Birchstone Escapes"
        ? title
        : `${title} | Birchstone Escapes`;

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
