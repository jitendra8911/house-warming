import React from "react";
import { Box, Typography } from "@mui/material";
import "../styles/pages/map.scss";

const MapPage: React.FC = () => {
    return (
        <Box className="page-container">
            <Box className="page-content">
                <Typography variant="h4" gutterBottom>
                    Find Us 📍
                </Typography>
                <div className="map-container">
                    <iframe
                        title="home-location"
                        src="https://www.google.com/maps/embed?pb=!1m18!..."
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                    ></iframe>
                </div>
            </Box>
        </Box>
    );
};

export default MapPage;
