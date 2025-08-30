import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => (
    <footer className="app-footer">© {new Date().getFullYear()} Demo</footer>
);

export default Footer;