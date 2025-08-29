import React from "react";
import {Box, Typography, Button, Fab} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../styles/pages/home.scss";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const Home: React.FC = () => {
    return (
        <Box className="page-container">
            <Box className="page-content">
                {/* Quick RSVP link */}
                <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/rsvp"
                    sx={{ mb: 3 }}
                >
                    RSVP Now
                </Button>

                {/* Invitation heading */}
                <Typography variant="h4" gutterBottom>
                    You’re Invited!
                </Typography>

                <Typography variant="body1" sx={{ mt: 2 }}>
                    Join us in celebrating our new home and making it special with your presence.
                </Typography>

                <img src="/images/Invitation.jpg" alt="Housewarming" className="home-image" style={{ maxWidth: "100%", borderRadius: "12px", marginTop: "1rem" }} />


                {/*<Typography variant="h4" gutterBottom>*/}
                {/*    Housewarming Party 🎉*/}
                {/*</Typography>*/}
                {/*<Typography variant="body1" gutterBottom>*/}
                {/*    We are excited to invite you to our new home celebration!*/}
                {/*</Typography>*/}
                {/*<Typography variant="body2" gutterBottom>*/}
                {/*    Date: September 15th, 2025 <br />*/}
                {/*    Time: 6:00 PM onwards <br />*/}
                {/*    Location: Our New Home 🏡*/}
                {/*</Typography>*/}
                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    color="primary"*/}
                {/*    component={Link}*/}
                {/*    to="/rsvp"*/}
                {/*    sx={{ mt: 2 }}*/}
                {/*>*/}
                {/*    RSVP Now*/}
                {/*</Button>*/}




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
