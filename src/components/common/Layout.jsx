import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import Breadcrumb from './Breadcrumb';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Breadcrumb />
            <main className="main-content">
                {children}
            </main>
            <Footer />
            <ChatWidget />
        </>
    );
};

export default Layout;
