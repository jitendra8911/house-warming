// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material";

const bgApp = "#fafbfc";
const gh = {
    paper: "#ffffff",
    border: "#d0d7de",
    text: "#24292f",
    subtleText: "#57606a",
    primary: "#2da44e",
    primaryHover: "#2c974b",
    primaryPressed: "#298e46",
    link: "#0969da",
    linkHover: "#0757b3",
    danger: "#cf222e",
    warning: "#9a6700",
    success: "#1a7f37",
    headerBg: "#fafbfc",
    headerFg: "#ffffff",
    sidebarBg: "#f6f8fa",
    focus: "#0969da33",
};

const theme = createTheme({
    cssVariables: true,
    palette: {
        mode: "light",
        primary: { main: gh.primary, dark: gh.primaryHover, light: alpha(gh.primary, 0.25), contrastText: "#fff" },
        secondary: { main: gh.link, dark: gh.linkHover, light: alpha(gh.link, 0.25), contrastText: "#fff" },
        error: { main: gh.danger },
        warning: { main: gh.warning },
        success: { main: gh.success },
        text: { primary: gh.text, secondary: gh.subtleText },
        divider: gh.border,
        background: { default: bgApp, paper: gh.paper },
    },
    components: {
        // 👇 Paint the global page background WITH the image (no SCSS needed)
        MuiCssBaseline: {
            styleOverrides: {
                html: { backgroundColor: bgApp },
                body: {
                    backgroundColor: bgApp,
                    backgroundImage: 'url("/images/confetti-background.png")', // served from /public
                    backgroundRepeat: "repeat",                // or "no-repeat"
                    backgroundSize: "420px 420px",             // tweak tile size
                    backgroundAttachment: "fixed",             // elegant scrolling
                },
                "#root": { minHeight: "100vh" },
            },
        },

        // Keep header & nav solid so text stays readable over confetti
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: gh.headerBg,
                    color: gh.headerFg,
                    boxShadow: "none",
                    borderBottom: `1px solid ${alpha("#000", 0.24)}`,
                },
            },
            defaultProps: { color: "default", position: "sticky" },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: gh.sidebarBg,
                    borderRight: `1px solid ${gh.border}`,
                    backgroundImage: "none", // ensure no confetti inside drawer
                },
            },
        },

        // Surfaces use white “paper” with subtle borders (GitHub-like)
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: `1px solid ${gh.border}`,
                    boxShadow: "none",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: `1px solid ${gh.border}`,
                    boxShadow: "none",
                },
            },
        },

        // Buttons, inputs, links (unchanged styling; shown for completeness)
        // MuiButton: {
        //     styleOverrides: {
        //         containedPrimary: {
        //             backgroundColor: gh.primary,
        //             "&:hover": { backgroundColor: gh.primaryHover },
        //             "&:active": { backgroundColor: gh.primaryPressed },
        //             boxShadow: "none",
        //             borderRadius: "5px"
        //         },
        //         outlined: { borderColor: gh.border, "&:hover": { backgroundColor: alpha("#000", 0.03) } },
        //         text: { "&:hover": { backgroundColor: alpha("#000", 0.04) } },
        //     },
        // },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "999px", // fully rounded
                    padding: "6px 20px",
                    fontWeight: 600,
                    boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
                    textTransform: "none",
                },
                containedPrimary: {
                    backgroundColor: "#2da44e",
                    "&:hover": { backgroundColor: "#2c974b" },
                },
            },
            defaultProps: {
                disableElevation: true, // like Fabs
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: gh.border },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: gh.text },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: gh.link },
                    "&.Mui-focused": { boxShadow: `0 0 0 3px ${gh.focus}` },
                },
            },
        },
    },
});

export default theme;
