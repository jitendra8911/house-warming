import React from "react";
import { Typography, Button, Box, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/pages/home.scss";

const Home: React.FC = () => {
    return (
        <Box className="page-container">
            <Box className="page-content">
                <Card>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            You're Invited! 🎉
                        </Typography>
                        <Typography className="invitation-text">
                            Join us as we celebrate our new home and this exciting new chapter.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/rsvp"
                            className="rsvp-button"
                        >
                            RSVP Now
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Home;
