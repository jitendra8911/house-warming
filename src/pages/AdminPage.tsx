import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Stack,
    Button,
    Alert,
    TableContainer, Snackbar,
} from "@mui/material";
import { listGoingRsvps, resetAllRsvps } from "../lib/firebase-rsvp";
import type { Rsvp } from "../types/rsvp";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

const AdminPage: React.FC = () => {
    const { isAdmin, loading, user } = useAuth();
    const [rows, setRows] = useState<Rsvp[]>([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [snackOpen, setSnackOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await listGoingRsvps();
                setRows(data);
            } catch (e: any) {
                setError(e?.message || "Failed to load RSVPs");
            }
        })();
    }, []);

    if (loading) return null;
    if (!isAdmin) return <Navigate to="/" replace />;

    const reload = async () => {
        const data = await listGoingRsvps();
        setRows(data);
    };

    const onResetAllRsvps = async () => {
        if (!isAdmin) return;
        if (!user) return;
        if (!confirm("Are you sure you want to clear all RSVPs?")) return;
        setBusy(true);
        try {
            await resetAllRsvps();
            await reload();
            setSnackOpen(true);
        } finally {
            setBusy(false);
        }
    };


    return (
        <Box
            className="page-container page-admin"
            sx={{
                width: '100%',
                maxWidth: '100vw',           // never exceed viewport width
                overflowX: 'hidden',         // prevent page-level horizontal overflow
                pt: { xs: 6, sm: 2 },
                px: { xs: 1, sm: 0 },        // modest side padding on mobile only
                boxSizing: 'border-box',
            }}
        >
            <Box className="page-content" >
                <Card  sx={{
                    width: "100%",
                    margin: "0 auto",
                    borderRadius: 3,
                    boxShadow: "none",
                    border: "none",
                    backgroundColor: "rgba(255,255,255,0.85)",
                }}>
                    <CardContent >
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1.5}
                            justifyContent="space-between"
                            alignItems={{ xs: "flex-start", sm: "center" }}
                            sx={{ mb: 2 }}
                        >
                            <Typography variant="h5">Admin</Typography>
                            <Button variant="contained" color="error" onClick={onResetAllRsvps} disabled={busy}>
                                Reset ALL RSVPs
                            </Button>
                        </Stack>

                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                        {/* Responsive table wrapper */}
                        <TableContainer
                            component={Box}
                            sx={{
                                display: 'block',
                                overflowX: 'auto',
                                maxWidth: '100%',
                                WebkitOverflowScrolling: 'touch', // smoother iOS scroll
                            }}
                        >
                            <Table size="small" stickyHeader={false}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ whiteSpace: "nowrap" }}>Name</TableCell>
                                        <TableCell sx={{ whiteSpace: "nowrap" }}>Email</TableCell>
                                        <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>+Guests</TableCell>
                                        <TableCell sx={{ whiteSpace: "nowrap" }}>Arrival airport</TableCell>
                                        <TableCell sx={{ whiteSpace: "nowrap" }}>Arrival date</TableCell>
                                        <TableCell sx={{ whiteSpace: "nowrap" }}>Arrival time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((r) => (
                                        <TableRow key={r.id || r.name}>
                                            <TableCell sx={{ wordBreak: "break-word" }}>{r.name}</TableCell>
                                            <TableCell sx={{ wordBreak: "break-word" }}>{r.email || "—"}</TableCell>
                                            <TableCell align="right">{r.additionalGuests ?? 0}</TableCell>
                                            <TableCell sx={{ wordBreak: "break-word" }}>{r.arrivalAirport || "—"}</TableCell>
                                            <TableCell>{r.arrivalDate || "—"}</TableCell>
                                            <TableCell>{r.arrivalTime || "—"}</TableCell>
                                        </TableRow>
                                    ))}
                                    {rows.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6}>No attendees yet.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
                <Snackbar
                    open={snackOpen}
                    autoHideDuration={4000}
                    onClose={() => setSnackOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        elevation={3}
                        onClose={() => setSnackOpen(false)}
                        severity="success"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Thanks! Your RSVP has been saved.
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default AdminPage;
