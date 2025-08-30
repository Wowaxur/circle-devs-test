import React, {useEffect, useState} from 'react';
import type { PropsWithChildren } from 'react';
import '../../styles/Layout.scss';
import Header from './header/Header.tsx';
import Sidebar from './sidebar/Sidebar.tsx';
import Footer from './footer/Footer.tsx';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="app-shell">
            <Header />
            <div className="app-main">
                {windowWidth >= 768 && <Sidebar />}
                <main className="app-content">{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;