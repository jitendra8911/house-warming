import React from "react";
import {
    Button,
    Stack,
    Typography,
    Box,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {adminLoginWithGooglePopup, adminLoginWithGoogleRedirect, logout} from "../lib/firebase";
import { useAuth } from "../auth/AuthContext";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const AdminControls: React.FC = () => {
    const { isAdmin, loading } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // xs & sm → use icons

    if (loading)
        return (
            <Box
                sx={{
                    position: "fixed",
                    top: 16,
                    right: 16,
                    zIndex: (t) => t.zIndex.tooltip + 1,
                }}
            >
                <Typography
                    variant="caption"
                    sx={{ bgcolor: "white", px: 1, borderRadius: 1 }}
                >
                    Checking auth…
                </Typography>
            </Box>
        );

    return (
        <Box
            sx={{
                position: "fixed",
                top: 16,
                right: 16,
                zIndex: (t) => t.zIndex.tooltip + 1,
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                {isAdmin ? (
                    isMobile ? (
                        <IconButton
                            color="primary"
                            size="small"
                            onClick={() => logout()}
                            aria-label="Sign out"
                            sx={{
                                bgcolor: "primary.main",
                                color: "#fff",
                                "&:hover": { bgcolor: "primary.dark" },
                            }}
                        >
                            <LogoutIcon fontSize="small" />
                        </IconButton>
                    ) : (
                        <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={() => logout()}
                        >
                            Sign out
                        </Button>
                    )
                ) : isMobile ? (
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={() => adminLoginWithGooglePopup()}
                        aria-label="Admin sign in"
                        sx={{
                            bgcolor: "primary.main",
                            color: "#fff",
                            "&:hover": { bgcolor: "primary.dark" },
                        }}
                    >
                        <LoginIcon fontSize="small" />
                    </IconButton>
                ) : (
                    <Button
                        type="button"
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => adminLoginWithGoogleRedirect()}
                    >
                        Admin sign in
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default AdminControls;
