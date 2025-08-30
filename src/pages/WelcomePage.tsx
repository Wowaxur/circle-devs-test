import React from 'react';
import '../styles/WelcomePage.scss'

const WelcomePage: React.FC = () => (
    <section className="welcome-page">
        <h1>Добро пожаловать!</h1>
        <p>
            Это демо под тестовое задание: адаптивный layout без внешнего скролла,
            CRUD через RTK Query и модалка с таймером.
        </p>
    </section>
);

export default WelcomePage;