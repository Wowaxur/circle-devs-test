import React from 'react';
import './Header.scss';

const Header: React.FC = () => {
    return (
        <header className="header">
            <span>Моё приложение</span>
            <nav>
                <a href="/public">Welcome</a>
                <a href="/items">Items</a>
            </nav>
        </header>
    );
};

export default Header;