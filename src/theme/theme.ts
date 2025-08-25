import { createTheme } from "@mui/material/styles";

/** Main app theme (header, footer, pages) — background is cream */
export const mainTheme = createTheme({
    palette: {
        primary: {
            main: "#ef6c00",            // 🔶 Primary accent for buttons/links
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#6d4c41",            // warm brown for outlined/text buttons
            contrastText: "#ffffff",
        },
        background: {
            default: "#fff3e0",         // page background
            paper: "#ffffff",
        },
        text: {
            primary: "#3e2723",
            secondary: "#5d4037",
        },
    },
    typography: {
        fontFamily: "'Poppins', 'Roboto', sans-serif",
        button: { fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 20,
                    padding: "8px 18px",
                },
                containedPrimary: {
                    boxShadow: "0 3px 6px rgba(239,108,0,0.24)",
                    ":hover": {
                        backgroundColor: "#e65100",
                        boxShadow: "0 4px 10px rgba(239,108,0,0.3)",
                    },
                },
                outlinedSecondary: {
                    borderColor: "rgba(109,76,65,0.5)",
                    color: "#6d4c41",
                    ":hover": {
                        borderColor: "#6d4c41",
                        backgroundColor: "rgba(109,76,65,0.08)",
                    },
                },
                textSecondary: {
                    color: "#6d4c41",
                    ":hover": { backgroundColor: "rgba(109,76,65,0.08)" },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "#ef6c00",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    "&:hover": {
                        color: "#e65100",
                        textDecoration: "underline",
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "#6d4c41",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                    "&:hover": {
                        color: "#ef6c00",
                        backgroundColor: "rgba(239,108,0,0.08)",
                    },
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    transition: "background-color 0.2s ease, color 0.2s ease",
                    "&:hover": { backgroundColor: "rgba(239,108,0,0.08)" },
                    "&.Mui-selected": {
                        backgroundColor: "rgba(239,108,0,0.18)",
                        "&:hover": { backgroundColor: "rgba(239,108,0,0.22)" },
                    },
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: "#6d4c41",
                    minWidth: 36,
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: "#3e2723",
                    fontWeight: 500,
                },
                secondary: {
                    color: "#5d4037",
                },
            },
        },
    },
});

/** Navbar theme (apricot) */
export const navbarTheme = createTheme({
    palette: {
        background: {
            default: "#ffe0b2",
            paper: "#ffe0b2",
        },
        text: {
            primary: "#3e2723",
            secondary: "#6d4c41",
        },
    },
    typography: {
        fontFamily: "'Poppins', 'Roboto', sans-serif",
    },
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    transition: "background-color 0.2s ease, color 0.2s ease",
                    "&:hover": {
                        backgroundColor: "rgba(93,64,55,0.15)",
                    },
                    "&.Mui-selected": {
                        backgroundColor: "rgba(93,64,55,0.25)",
                        "&:hover": { backgroundColor: "rgba(93,64,55,0.28)" },
                    },
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: "#6d4c41",
                    minWidth: 36,
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: "#3e2723",
                    fontWeight: 500,
                },
                secondary: {
                    color: "#5d4037",
                },
            },
        },
    },
});
