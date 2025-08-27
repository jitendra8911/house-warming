// src/components/AdminControls.tsx
import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { adminLoginWithGoogleRedirect, logout} from "../lib/firebase";
import { useAuth } from "../auth/AuthContext";

const AdminControls: React.FC = () => {
    const { isAdmin, loading } = useAuth();

    if (loading) return <Typography variant="caption">Checking auth…</Typography>;

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            {isAdmin ? (
                <Button size="small" variant="outlined" color="secondary" onClick={() => logout()}>
                    Sign out
                </Button>
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
    );
};

export default AdminControls;
