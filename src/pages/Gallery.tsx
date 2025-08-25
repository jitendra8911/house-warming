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

                <Grid container spacing={2} justifyContent="center">
                    {images.map((src: string, i: number) => (
                        <Grid item={true} xs={12} sm={6} md={4} key={"gallery-img-" + i}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="220"
                                    image={src}
                                    alt={"House progress " + (i + 1)}
                                    loading="lazy"
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
