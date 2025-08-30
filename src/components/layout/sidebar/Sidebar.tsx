import React from 'react';
import './Sidebar.scss';

const Sidebar: React.FC = () => (
    <aside className="app-sidebar">
        <div className="section">
            <h4>Навигация</h4>
            <ul>
                <li><a href="/public">Welcome</a></li>
                <li><a href="/items">Items</a></li>
            </ul>
        </div>
        <div className="section">

            <p>CRUD через RTK Query.</p>
        </div>
    </aside>
);

export default Sidebar;