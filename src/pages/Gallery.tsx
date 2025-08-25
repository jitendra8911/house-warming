import React from "react";
import { Box, Typography } from "@mui/material";
import "../styles/pages/gallery.scss";

const IMAGES: string[] = [
    "/progress1.jpg",
    "/progress2.jpg",
    "/progress3.jpg",
    // add more as needed
];

const Gallery: React.FC = () => {
    return (
        <Box className="page-container">
            <Box className="page-content">
                <Typography variant="h4" gutterBottom>
                    House Progress 🏡
                </Typography>

                <div className="image-grid">
                    {IMAGES.map((src, idx) => (
                        <img key={idx} src={src} alt={`Progress ${idx + 1}`} />
                    ))}
                </div>
            </Box>
        </Box>
    );
};

export default Gallery;
