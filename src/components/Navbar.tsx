import React from "react";
import {
    Drawer,
    List, ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
} from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MapIcon from "@mui/icons-material/Map";
import { useLocation, useNavigate} from "react-router-dom";
import navbarTheme  from "../theme/theme";
import "../styles/components/navbar.scss";
import {useAuth} from "../auth/AuthContext.tsx";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

interface NavbarProps {
    mobileOpen: boolean;
    onMobileClose: () => void;
}

const drawerWidth = 240;

const Navbar: React.FC<NavbarProps> = ({ mobileOpen, onMobileClose }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
    const location = useLocation();
    const navigate = useNavigate();
    const {isAdmin} = useAuth();

    const navItems = [
        { text: "Home", path: "/", icon: <HomeIcon />, exact: true },
        { text: "RSVP", path: "/rsvp", icon: <EventIcon /> },
        { text: "Gallery", path: "/gallery", icon: <PhotoLibraryIcon /> },
        { text: "Map", path: "/map", icon: <MapIcon /> },
    ];

    const isActive = (to: string, exact?: boolean) =>
        exact ? location.pathname === to : location.pathname.startsWith(to);

    const handleNav = (to: string) => {
        navigate(to);
        if (isMobile) onMobileClose();
    };

    const drawerContent = (
        <List>
            {navItems.map(({ text, path, icon, exact }) => (
                <ListItem disablePadding>
                <ListItemButton
                    key={text}
                    className="nav-link"
                    selected={isActive(path, exact)}
                    onClick={() => handleNav(path)}
                >
                    <ListItemIcon className="nav-icon">{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
            {isAdmin && (
                <ListItem disablePadding>
                    <ListItemButton
                        key={"Admin"}
                        className="nav-link"
                        selected={isActive("/admin", true)}
                        onClick={() => handleNav("/admin")}
                    >
                        <ListItemIcon className="nav-icon"><AdminPanelSettingsIcon/></ListItemIcon>
                        <ListItemText primary={"Admin"} />
                    </ListItemButton>
                </ListItem>
            )}
        </List>
    );

    return (
        <ThemeProvider theme={navbarTheme}>
            {/* Mobile: temporary drawer */}
            {isMobile && (
                <Drawer
                    anchor="left"
                    open={mobileOpen}
                    onClose={onMobileClose}
                    ModalProps={{ keepMounted: true }}
                    sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}
                >
                    {drawerContent}
                </Drawer>
            )}

            {/* Desktop: permanent drawer (no spacer) */}
            {!isMobile && (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    className="desktop-only"
                    open
                >
                    {drawerContent}
                </Drawer>
            )}
        </ThemeProvider>
    );
};

export default Navbar;
