import React from "react";
import {
    Box,
    Typography,
    Button,
    Fab,
    Card,
    CardContent,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../styles/pages/home.scss";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import invitation from "../assets/images/Invitation.jpg";

const Home: React.FC = () => {
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
                        {/* Quick RSVP link */}
                        <Button
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to="/rsvp"
                            sx={{ mb: 3, borderRadius: "999px" }}
                        >
                            RSVP Now
                        </Button>

                        {/* Invitation heading */}
                        <Typography variant="h4" gutterBottom>
                            You’re Invited!
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Join us in celebrating our new home and making it special with
                            your presence.
                        </Typography>

                        <img
                            src={invitation}
                            alt="Housewarming"
                            className="home-image"
                            style={{
                                maxWidth: "100%",
                                borderRadius: "12px",
                                marginTop: "1rem",
                            }}
                        />
                    </CardContent>
                </Card>

                {/* Floating RSVP (mobile only) */}
                <Fab
                    variant="extended"
                    color="primary"
                    component={RouterLink}
                    to="/rsvp"
                    aria-label="RSVP"
                    sx={{
                        position: "fixed",
                        right: 16,
                        bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)",
                        zIndex: (t) => t.zIndex.modal + 1,
                        boxShadow: 3,
                    }}
                >
                    <EventAvailableIcon sx={{ mr: 1 }} />
                    RSVP
                </Fab>
            </Box>
        </Box>
    );
};

export default Home;
