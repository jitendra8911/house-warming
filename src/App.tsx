import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RSVP from "./pages/RSVP";
import Progress from "./pages/Progress";
import Map from "./pages/Map";
import Navbar from "./components/Navbar";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import "./styles/app.scss";

function App() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Router>
            <div className={`app-container ${isMobile ? "" : "with-drawer"}`}>
                <Navbar />

                <main className="main-content">
                    <div className="content-inner">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/rsvp" element={<RSVP />} />
                            <Route path="/progress" element={<Progress />} />
                            <Route path="/map" element={<Map />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    );
}

export default App;
