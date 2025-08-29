import React from "react";
import {Box, Typography, Grid, Card, CardMedia, CardContent} from "@mui/material";
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
                <Card  sx={{
                    maxWidth: 600,
                    margin: "0 auto",
                    borderRadius: 3,
                    boxShadow: "none",
                    border: "none",
                    backgroundColor: "rgba(255,255,255,0.85)", // semi-transparent for background blending
                }}>
                    <CardContent>
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
                    </CardContent>
                </Card>



            </Box>
        </Box>
    );
};

export default Gallery;
