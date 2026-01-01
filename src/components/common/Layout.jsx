import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
            <ChatWidget />
        </>
    );
};

export default Layout;
