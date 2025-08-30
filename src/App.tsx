import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import WelcomePage from './pages/WelcomePage.tsx';
import ItemsPage from './pages/ItemsPage.tsx';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/public" element={<WelcomePage />} />
                    <Route path="/items" element={<ItemsPage />} />
                    <Route path="*" element={<WelcomePage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;