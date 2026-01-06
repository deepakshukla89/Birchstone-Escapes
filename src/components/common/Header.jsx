import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/property/1967238', label: 'The Chalet' },
        { path: '/contact', label: 'Contact us' },
    ];

    const isActive = (path) => location.pathname === path;

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header
            className="header"
            role="banner"
            itemScope
            itemType="https://schema.org/WPHeader"
        >
            <div className="header-container">
                {/* Logo with Organization schema */}
                <Link
                    to="/"
                    className="logo"
                    itemScope
                    itemType="https://schema.org/Organization"
                    aria-label="TimbrLux Stays - Home"
                >
                    <img src="/image/logo.svg" alt="TimbrLux Stays" className="logo-img" itemProp="logo" />
                    <meta itemProp="name" content="TimbrLux Stays" />
                    <meta itemProp="url" content="https://timbrluxstays.com" />
                </Link>

                {/* Navigation with SiteNavigationElement schema */}
                <nav
                    className={`nav ${isMenuOpen ? 'nav-open' : ''}`}
                    role="navigation"
                    aria-label="Main navigation"
                    itemScope
                    itemType="https://schema.org/SiteNavigationElement"
                >
                    <ul className="nav-list">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                                    onClick={closeMenu}
                                    itemProp="url"
                                    aria-current={isActive(link.path) ? 'page' : undefined}
                                >
                                    <span itemProp="name">{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                        to="/booking"
                        className="btn-book"
                        onClick={closeMenu}
                        aria-label="Book your vacation stay"
                    >
                        Book your stay!
                    </Link>
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="main-navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
