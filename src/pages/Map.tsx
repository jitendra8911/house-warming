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
                <Box className="map-container">
                    <iframe
                        title="Our Home Location"
                        src="https://www.google.com/maps/embed?pb=!1m18..."
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        loading="lazy"
                    ></iframe>
                </Box>
            </Box>
        </Box>
    );
};

export default MapPage;
