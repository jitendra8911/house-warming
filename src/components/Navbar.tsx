import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { NavLink } from "react-router-dom";
import { navbarTheme } from "../theme/theme";
import "../styles/components/navbar.scss";

const navLinks = [
    { text: "Home", path: "/", icon: <CelebrationOutlinedIcon />, end: true },
    { text: "RSVP", path: "/rsvp", icon: <HowToRegOutlinedIcon /> },
    { text: "Gallery", path: "/gallery", icon: <HomeOutlinedIcon /> },
    { text: "Map", path: "/map", icon: <PlaceOutlinedIcon /> },
];

const NavList: React.FC = () => (
    <List>
        {navLinks.map(({ text, path, icon, end }) => (
            <ListItem key={text} disablePadding>
                <ListItemButton component={NavLink} to={path} end={end} className="nav-link">
                    <ListItemIcon className="nav-icon">{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        ))}
    </List>
);

const DRAWER_WIDTH = 250;

interface NavbarProps {
    mobileOpen: boolean;
    onMobileClose: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ mobileOpen, onMobileClose }) => {
    return (
        <ThemeProvider theme={navbarTheme}>
            {/* Desktop permanent Drawer */}
            <Drawer
                variant="permanent"
                anchor="left"
                open
                className="desktop-only"
                PaperProps={{
                    sx: { width: DRAWER_WIDTH, bgcolor: "background.default", color: "text.primary" },
                }}
            >
                <NavList />
            </Drawer>

            {/* Spacer */}
            <div className="drawer-spacer desktop-only" />

            {/* Mobile temporary Drawer */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={onMobileClose}
                PaperProps={{
                    sx: { width: DRAWER_WIDTH, bgcolor: "background.default", color: "text.primary" },
                }}
            >
                <Box sx={{ width: DRAWER_WIDTH }} onClick={onMobileClose}>
                    <NavList />
                </Box>
            </Drawer>
        </ThemeProvider>
    );
};

export default Navbar;
