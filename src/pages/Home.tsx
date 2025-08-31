import React from "react";
import {
    Box,
    Typography,
    Button,
    Fab,
    Card,
    CardContent, Dialog, IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../styles/pages/home.scss";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import invitation from "../assets/images/Invitation.jpg";
import CloseIcon from "@mui/icons-material/Close";

const Home: React.FC = () => {
    const [openInvitation, setOpenInvitation] = React.useState(false);
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
                        <Typography variant="h4" gutterBottom fontWeight="bold">
                            You’re Invited!
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 2, fontWeight: 300 }}>
                            Join us as we celebrate the joy of our new home and make it truly special with your presence.
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
                            onClick={() => setOpenInvitation(true)}
                        />

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle1" sx={{ mt: 1.5 }}>
                                <strong>📅 Date:</strong>{" "}
                                <Typography component="span" fontWeight={300}>
                                    Saturday, September 27th, 2025
                                </Typography>
                            </Typography>

                            <Typography variant="subtitle1" sx={{ mt: 1.5 }}>
                                <strong>🕗 Gruha Pravesam:</strong>{" "}
                                <Typography component="span" fontWeight={300}>
                                    8:50 AM
                                </Typography>
                            </Typography>

                            <Typography variant="subtitle1" sx={{ mt: 1.5 }}>
                                <strong>🙏 Satyanarayana Swami Vratham:</strong>{" "}
                                <Typography component="span" fontWeight={300}>
                                    11:00 AM
                                </Typography>
                            </Typography>

                            <Typography variant="subtitle1" sx={{ mt: 1.5 }}>
                                <strong>🍴 Lunch:</strong>{" "}
                                <Typography component="span" fontWeight={300}>
                                    12:30 PM onwards
                                </Typography>
                            </Typography>

                            <Typography variant="subtitle1" sx={{ mt: 1.5 }}>
                                <strong>📍 Address:</strong>{" "}
                                <Typography component="span" fontWeight={300}>
                                    2936 Red Rose Road, Aurora, IL, 60503
                                </Typography>
                            </Typography>
                        </Box>

                        <Dialog open={openInvitation}
                            onClose={() => setOpenInvitation(false)}
                            maxWidth="md"
                                PaperProps={{
                                    sx: {
                                        backgroundColor: "rgba(255,255,255,0.95)",
                                        backgroundImage: "none",
                                        boxShadow: 6,
                                        position: "relative",
                                    },
                                }}
                                BackdropProps={{
                                    sx: {
                                        // 🎉 Confetti backdrop (uses the same file you set in theme/public)
                                        backgroundColor: "rgba(255,255,255,0.9)",
                                        // backgroundImage: 'url("/background.png")',
                                        backgroundRepeat: "repeat",
                                        backgroundSize: "420px 420px",
                                        backdropFilter: "none",
                                    },
                                }}
                                >

                            {/* Close button (top-right) */}
                            <IconButton
                                aria-label="Close"
                                onClick={() => setOpenInvitation(false)}
                                color="primary"
                                sx={{
                                    position: "absolute",
                                    top: 16,
                                    right: 16,
                                    zIndex: 2,
                                    bgcolor: "primary.main",              // solid background
                                    color: "#fff",                        // white icon for contrast
                                    "&:hover": { bgcolor: "primary.dark" },
                                    boxShadow: 3,                         // raised like a floating button
                                    width: { xs: 30, sm: 56 },   // 👈 smaller on mobile
                                    height: { xs: 30, sm: 56 },
                                }}
                            >
                                <CloseIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
                            </IconButton>

                            <Box sx={{ p: 0, maxWidth: "90vw", maxHeight: "85vh" }}>
                                <img
                                    src={invitation}
                                    alt="Housewarming"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "85vh",
                                        display: "block",
                                        objectFit: "contain",
                                    }}
                                    loading="eager"
                                />
                            </Box>

                        </Dialog>

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
