import React, { useState} from "react";
import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RSVP from "./pages/RSVP";
import Gallery from "./pages/Gallery";
import MapPage from "./pages/Map";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/app.scss";
import AdminControls from "./components/AdminControls.tsx";

const App: React.FC = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <div className="app-container">
            {/* Desktop permanent drawer + Mobile drawer */}
            <Navbar
                mobileOpen={mobileNavOpen}
                onMobileClose={() => setMobileNavOpen(false)}
            />

            <div className="content">
                {/* Hamburger lives inside Header (mobile only) */}
                <Header onHamburgerClick={() => setMobileNavOpen(true)} />
                <AdminControls />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/rsvp" element={<RSVP />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/map" element={<MapPage />} />
                </Routes>

                <Footer />
            </div>
        </div>
    );
};

export default App;
