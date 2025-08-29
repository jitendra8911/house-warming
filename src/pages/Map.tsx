// src/pages/Map.tsx
import React, {useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import "../styles/pages/map.scss";

const MapPage: React.FC = () => {
    const address = "2936 Red Rose Road, Aurora, IL 60503";
    const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
        address
    )}&t=&z=15&ie=UTF8&iwloc=B&output=embed`;
    const [loading, setLoading] = useState(true);

    return (
        <Box className="page-container">
            <Box className="page-content">
                <Card
                    sx={{
                        maxWidth: 600,
                        margin: "0 auto",
                        borderRadius: 3,
                        boxShadow: 3,
                        backgroundColor: "rgba(255,255,255,0.85)", // semi-transparent for background blending
                    }}
                >
                    <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h4" gutterBottom>
                            Find Us 📍
                        </Typography>
                        {/* Spinner overlay */}
                        {loading && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "rgba(255,255,255,0.6)", // translucent overlay
                                    zIndex: 1,
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        )}
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
                                onLoad={() => setLoading(false)} // hide spinner once loaded
                            />
                        </Box>
                    </CardContent>
                </Card>

            </Box>
        </Box>
    );
};

export default MapPage;
