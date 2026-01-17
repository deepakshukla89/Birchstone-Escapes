import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

/**
 * Breadcrumb component for SEO and navigation
 * Implements Schema.org BreadcrumbList for rich snippets
 */
const Breadcrumb = () => {
    const location = useLocation();

    // Define breadcrumb mapping
    const breadcrumbMap = {
        '/': { name: 'Home', path: '/' },
        '/about': { name: 'About Us', path: '/about' },
        '/contact': { name: 'Contact', path: '/contact' },
        '/booking': { name: 'Book Your Stay', path: '/booking' },
        '/search': { name: 'Search', path: '/search' },
        '/property': { name: 'Property', path: '/property' },
        '/privacy': { name: 'Privacy Policy', path: '/privacy' },
        '/terms': { name: 'Terms & Conditions', path: '/terms' }
    };

    // Build breadcrumb trail
    const buildBreadcrumbs = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const breadcrumbs = [{ name: 'Home', path: '/', position: 1 }];

        let currentPath = '';
        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`;
            const breadcrumbInfo = breadcrumbMap[currentPath];

            if (breadcrumbInfo) {
                breadcrumbs.push({
                    name: breadcrumbInfo.name,
                    path: breadcrumbInfo.path,
                    position: index + 2
                });
            } else if (segment.match(/^\d+$/)) {
                // Property ID - show as "Frost Pine Chalet"
                breadcrumbs.push({
                    name: 'Frost Pine Chalet',
                    path: currentPath,
                    position: index + 2
                });
            }
        });

        return breadcrumbs;
    };

    const breadcrumbs = buildBreadcrumbs();

    // Don't show on homepage
    if (location.pathname === '/') {
        return null;
    }

    // Schema.org BreadcrumbList structured data
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb) => ({
            "@type": "ListItem",
            "position": crumb.position,
            "name": crumb.name,
            "item": `https://timbrluxstays.com${crumb.path}`
        }))
    };

    return (
        <nav className="breadcrumb" aria-label="Breadcrumb navigation">
            {/* Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
                {breadcrumbs.map((crumb, index) => (
                    <li
                        key={crumb.path}
                        className="breadcrumb-item"
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                    >
                        {index < breadcrumbs.length - 1 ? (
                            <>
                                <Link
                                    to={crumb.path}
                                    itemProp="item"
                                    className="breadcrumb-link"
                                >
                                    <span itemProp="name">{crumb.name}</span>
                                </Link>
                                <meta itemProp="position" content={crumb.position} />
                                <span className="breadcrumb-separator" aria-hidden="true">/</span>
                            </>
                        ) : (
                            <>
                                <span
                                    className="breadcrumb-current"
                                    itemProp="name"
                                    aria-current="page"
                                >
                                    {crumb.name}
                                </span>
                                <meta itemProp="position" content={crumb.position} />
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
