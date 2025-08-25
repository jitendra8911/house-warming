import { Link } from "react-router-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    useMediaQuery,
    IconButton,
    AppBar,
    Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

import "../styles/navbar.scss";

const Navbar: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleToggle = () => setMobileOpen(!mobileOpen);

    const drawerContent = (
        <Box>
            <Typography className="navbar-header">🏠 House Warming</Typography>
            <List>
                <ListItem button component={Link} to="/" onClick={() => setMobileOpen(false)}>
                    <ListItemText primary="Invitation" />
                </ListItem>
                <ListItem button component={Link} to="/rsvp" onClick={() => setMobileOpen(false)}>
                    <ListItemText primary="RSVP" />
                </ListItem>
                <ListItem button component={Link} to="/progress" onClick={() => setMobileOpen(false)}>
                    <ListItemText primary="House Progress" />
                </ListItem>
                <ListItem button component={Link} to="/map" onClick={() => setMobileOpen(false)}>
                    <ListItemText primary="Location" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            {isMobile ? (
                <>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleToggle}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ ml: 2 }}>
                                House Warming
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Drawer anchor="left" open={mobileOpen} onClose={handleToggle}>
                        {drawerContent}
                    </Drawer>
                </>
            ) : (
                <Drawer variant="permanent" anchor="left" open className="navbar-drawer">
                    {drawerContent}
                </Drawer>
            )}
        </>
    );
};

export default Navbar;
