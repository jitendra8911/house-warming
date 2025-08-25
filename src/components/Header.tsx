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
        "/":        { title: "Welcome Home 🎉", subtitle: "Housewarming Invitation" },
        "/rsvp":    { title: "RSVP 📝",         subtitle: "Let us know if you can make it" },
        "/gallery": { title: "Gallery 🏡",      subtitle: "Our house journey in pictures" },
        "/map":     { title: "Find Us 📍",      subtitle: "Directions to our new home" },
    };
    const { title, subtitle } = routeTitles[seg] ?? {
        title: "Housewarming Party 🎉",
        subtitle: "September 15th, 2025 • Our New Home",
    };

    return (
        <AppBar
            position="sticky"
            className="header"
            sx={{ bgcolor: "#ffe0b2", color: "#3e2723" }}
        >
            {/* Make the toolbar a positioning context for the hamburger */}
            <Toolbar className="header-toolbar" sx={{ position: "relative" }}>
                {isMobile && (
                    <IconButton
                        aria-label="open navigation"
                        onClick={onHamburgerClick}
                        className="mobile-hamburger"
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                <Box className="header-logo">🏡</Box>
                <Box className="header-text">
                    <Typography variant="h5" className="header-title">
                        {title}
                    </Typography>
                    <Typography variant="body2" className="header-subtitle">
                        {subtitle}
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
