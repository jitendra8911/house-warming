import { createTheme } from "@mui/material/styles";

// Main app theme
export const mainTheme = createTheme({
    palette: {
        primary: { main: "#ffe0b2" },   // app-wide primary color
        background: {
            default: "#ffe0b2",           // page background
            paper: "#ffffff",             // cards, modals
        },
        text: {
            primary: "#3e2723",           // dark chocolate brown
            secondary: "#5d4037",
        },
    },
    typography: {
        fontFamily: "'Poppins', 'Roboto', sans-serif",
    },
    shape: { borderRadius: 12 },
});

// Navbar theme (lighter than main app)
export const navbarTheme = createTheme({
    palette: {
        background: {
            default: "#fff3e0", // navbar background
            paper: "#fff3e0",
        },
        text: {
            primary: "#3e2723",
            secondary: "#6d4c41",
        },
    },
    typography: {
        fontFamily: "'Poppins', 'Roboto', sans-serif",
    },
});
