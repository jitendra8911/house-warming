// src/components/Header.tsx
import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import "../styles/components/header.scss";

interface HeaderProps {
    onHamburgerClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHamburgerClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const location = useLocation();

    const seg = `/${(location.pathname.split("/")[1] || "")}`;
    const routeTitles: Record<string, { title: string; subtitle: string }> = {
        "/": { title: "Welcome Home 🎉", subtitle: "Housewarming Invitation" },
        "/rsvp": { title: "RSVP 📝", subtitle: "Let us know if you can make it" },
        "/gallery": { title: "Gallery 🏡", subtitle: "Our house journey in pictures" },
        "/map": { title: "Find Us 📍", subtitle: "Directions to our new home" },
    };
    const { title, subtitle } = routeTitles[seg] ?? {
        title: "Housewarming Party 🎉",
        subtitle: "September 15th, 2025 • Our New Home",
    };

    // Event details shown centered
    const EVENT_TITLE = "Housewarming Ceremony";
    const EVENT_DATETIME = "Saturday, Sept 27, 2025 · 08:50 AM";
    const EVENT_ADDRESS = "2936 Red Rose Road, Aurora, IL, 60503";

    return (
        <AppBar position="sticky" className="header">
            <Toolbar
                className="header-toolbar"
                sx={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr", // left | center
                    alignItems: "center",
                    gap: 1,
                }}
            >
                {/* LEFT */}
                <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
                    {isMobile && (
                        <IconButton
                            aria-label="open navigation"
                            onClick={onHamburgerClick}
                            className="mobile-hamburger"
                            edge="start"
                            sx={{
                                mr: 1,
                                color: "#ffffff",               // force white
                                bgcolor: "primary.main",        // background circle in theme color
                                "&:hover": {
                                    bgcolor: "primary.dark",
                                },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    {!isMobile && (
                        <>
                            <Box className="header-logo" sx={{ mr: 1 }}>🏡</Box>
                            <Box className="header-text" sx={{ minWidth: 0 }}>
                                <Typography variant="h6" noWrap>{title}</Typography>
                                <Typography variant="body2" noWrap sx={{ opacity: 0.9 }}>
                                    {subtitle}
                                </Typography>
                            </Box>
                        </>
                    )}


                </Box>

                {/* CENTER */}
                <Box sx={{ textAlign: "center", px: 2 }}>
                    <Typography variant="subtitle1" sx={{
                        fontWeight: 600,
                        lineHeight: 1.2,
                        fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                    }}>
                        {EVENT_TITLE}
                    </Typography>
                    <Typography variant="caption" display="block">
                        📅 {EVENT_DATETIME}
                    </Typography>
                    <Typography variant="caption" display="block">
                        📍 {EVENT_ADDRESS}
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
