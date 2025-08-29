// src/pages/Map.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import "../styles/pages/map.scss";

const MapPage: React.FC = () => {
    const address = "2936 Red Rose Road, Aurora, IL 60503";
    const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
        address
    )}&t=&z=15&ie=UTF8&iwloc=B&output=embed`;

    return (
        <Box className="page-container">
            <Box className="page-content">
                <Typography variant="h4" gutterBottom>
                    Find Us 📍
                </Typography>
                <Box className="map-container">
                    <iframe
                        title="Our Home Location"
                        src={mapSrc}
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default MapPage;
