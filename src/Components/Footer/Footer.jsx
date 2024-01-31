import React from 'react';
import './Footer.css';

const ScrollToTopButton = () => {
    const smoothScrollToTop = () => {
        const scrollStep = -window.scrollY / (500 / 15);
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    };

    return (
        <h5 onClick={smoothScrollToTop} style={{ cursor: 'pointer' }}>
            наверх
        </h5>
    );
};

const Footer = () => {
    return (
        <div className="main_footer">
            <h2 style={{}}>магазин косметики</h2>
            <ScrollToTopButton />
        </div>
    );
};

export default Footer;