import './App.css';
import React from 'react';
import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Footer from './components/views/Footer/Footer';
import GNB from './components/views/GNB/GNB';
import Auth from './hoc/auth';

function App() {
    return (
        <Router>
            <GNB />
            <div>
                <ul>
                    <li>
                        <Link to="/">LandingPage</Link>
                    </li>
                    <li>
                        <Link to="/login">LoginPage</Link>
                    </li>
                    <li>
                        <Link to="/register">RegisterPage</Link>
                    </li>
                </ul>

                <hr />

                <Routes>
                    <Route exact path="/" element={Auth(LandingPage, null)} />
                    <Route exact path="/login" element={Auth(LoginPage, false)} />
                    <Route exact path="/register" element={Auth(RegisterPage, false)} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
