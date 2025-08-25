import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/pages/home.scss";

const Home: React.FC = () => {
    return (
        <Box className="page-container">
            <Box className="page-content">
                <Typography variant="h4" gutterBottom>
                    Housewarming Party 🎉
                </Typography>
                <Typography variant="body1" gutterBottom>
                    We are excited to invite you to our new home celebration!
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Date: September 15th, 2025 <br />
                    Time: 6:00 PM onwards <br />
                    Location: Our New Home 🏡
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/rsvp"
                    sx={{ mt: 2 }}
                >
                    RSVP Now
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
