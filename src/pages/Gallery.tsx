import React from "react";
import { Box, Typography, Grid, Card, CardMedia } from "@mui/material";
import "../styles/pages/gallery.scss";

const images: string[] = [
    "/images/house1.jpg",
    "/images/house2.jpg",
    "/images/house3.jpg",
];

const Gallery: React.FC = () => {
    return (
        <Box className="page-container">
            <Box className="page-content">
                <Typography variant="h4" gutterBottom>
                    Gallery 🏡
                </Typography>

                <Grid container spacing={2}>
                    {images.map((src, i) => (
                        <Grid  key={`gallery-img-${i}`} component="div">
                            <Card sx={{ height: "100%" }}>
                                <CardMedia
                                    component="img"
                                    image={src}
                                    alt={`House progress ${i + 1}`}
                                    sx={{ height: 240, objectFit: "cover" }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Gallery;
