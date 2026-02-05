import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-left">
                    <p>&copy; 2026 NST-SDC. All rights reserved.</p>
                </div>
                <div className="footer-center">
                    <div className="social-links">
                        <a href="https://www.instagram.com/devclub.nst/" target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="fab fa-instagram"></i> Follow Us
                        </a>
                        <a href="https://www.nstsdc.org/" target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="fas fa-globe"></i> Official Site
                        </a>
                    </div>
                </div>
                <div className="footer-right">
                    <p className="creator-credit">
                        Crafted by <a href="https://github.com/mrgear111" target="_blank" rel="noopener noreferrer" className="creator-name">Daksh</a> – <span className="president">President</span>
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
