import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Divider,
    TextField,
} from "@mui/material";
import "../styles/pages/rsvp.scss";
import GoingModal from "../components/rsvp/GoingModal";
import NoteModal from "../components/rsvp/NoteModal";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    getDocs,
    setDoc
} from "firebase/firestore";
import { db } from "../lib/firebase";
import {useAuth} from "../auth/AuthContext.tsx";
import {adminResetRsvps} from "../lib/functions.ts";

type RSVPStatus = "going" | "not_going" | "maybe";

export interface RSVPEntry {
    id?: string;
    name: string;
    status: RSVPStatus;
    additionalGuests: number;
    note?: string;
    createdAt?: any; // Firestore Timestamp (optional until written)
}

const RSVPS_COL = "rsvps";

const RSVP: React.FC = () => {
    const [name, setName] = useState("");
    const [guests, setGuests] = useState<RSVPEntry[]>([]);

    const [openGoing, setOpenGoing] = useState(false);
    const [openOther, setOpenOther] = useState<false | RSVPStatus>(false);

    const { uid, isAdmin, loading } = useAuth();
    // 🔄 Live subscribe to RSVPs
    useEffect(() => {

        const q = query(collection(db, RSVPS_COL), orderBy("createdAt", "asc"));
        const unsub = onSnapshot(q, (snap) => {
            const rows: RSVPEntry[] = [];
            snap.forEach((d) => {
                const data = d.data() as RSVPEntry;
                rows.push({
                    id: d.id,
                    name: data.name,
                    status: data.status,
                    additionalGuests: Number(data.additionalGuests || 0),
                    note: data.note,
                    createdAt: data.createdAt,
                });
            });
            setGuests(rows);
        });
        return () => unsub();
    }, []);

    const ensureName = (): string | null => {
        const trimmed = name.trim();
        if (!trimmed) {
            alert("Please enter your name first.");
            return null;
        }
        return trimmed;
    };

    // Create/Update current user's RSVP (doc id == uid)
    const upsertMyRSVP = async (payload: Partial<RSVPEntry>) => {
        if (!uid) { alert("Auth not ready. Try again."); return; }
        await setDoc(
            doc(db, "rsvps", uid),
            {
                userId: uid,
                name: name.trim(),
                createdAt: serverTimestamp(), // first time
                updatedAt: serverTimestamp(), // updated each time
                // fields from payload
                ...payload,
            },
            { merge: true }
        );
    };

    // ➕ Add entries
    const handleConfirmGoing = async (additionalGuests: number) => {
        const trimmed = ensureName(); if (!trimmed) return;
        await addDoc(collection(db, "rsvps"), {
            name: trimmed,
            status: "going",
            additionalGuests: Number(additionalGuests || 0),
            note: null,
            createdAt: serverTimestamp(),
        });
        setOpenGoing(false);
    };

    const handleConfirmOther = async (note?: string) => {
        const trimmed = ensureName(); if (!trimmed) return;
        await addDoc(collection(db, "rsvps"), {
            name: trimmed,
            status: openOther === "not_going" ? "not_going" : "maybe",
            additionalGuests: 0,
            note: note?.trim() || null,
            createdAt: serverTimestamp(),
        });
        setOpenOther(false);
    };

// Admin-only reset (callable recommended; client loop shown if you already used it)
    const handleReset = async () => {
        if (!isAdmin) return;
        if (!confirm("Are you sure you want to clear all RSVPs?")) return;
        const snap = await getDocs(collection(db, "rsvps"));
        await Promise.all(snap.docs.map(d => deleteDoc(doc(db, "rsvps", d.id))));
    };

    // Group & counts
    const grouped = useMemo(() => {
        const by: Record<RSVPStatus, RSVPEntry[]> = {
            going: [],
            not_going: [],
            maybe: [],
        };
        for (const g of guests) by[g.status]?.push(g);
        return by;
    }, [guests]);

    const totalExpected = useMemo(
        () => grouped.going.reduce((sum, g) => sum + 1 + (g.additionalGuests || 0), 0),
        [grouped]
    );

    const handleGoingClick = () => {
        if (!ensureName()) return;
        setOpenGoing(true);
    };
    const handleOtherClick = (status: Exclude<RSVPStatus, "going">) => {
        if (!ensureName()) return;
        setOpenOther(status);
    };

    return (
        <Box className="page-container">
            <Box className="page-content">
                <Typography variant="h4" gutterBottom>
                    RSVP 📝
                </Typography>

                {/* Name + Action buttons */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <TextField
                            label="Your Name"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                            <Button variant="contained" color="primary" onClick={handleGoingClick}>
                                Going
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => handleOtherClick("maybe")}>
                                Maybe
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => handleOtherClick("not_going")}>
                                Not Going
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>

                {/* Going list */}
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Going ({grouped.going.length})
                        </Typography>
                        {grouped.going.length === 0 ? (
                            <Typography color="text.secondary">No one yet.</Typography>
                        ) : (
                            <List>
                                {grouped.going.map((g) => (
                                    <ListItemButton key={g.id} divider>
                                        <ListItemText
                                            primary={g.name}
                                            secondary={
                                                g.additionalGuests > 0
                                                    ? `+${g.additionalGuests} guest${g.additionalGuests > 1 ? "s" : ""}`
                                                    : undefined
                                            }
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                        <Box mt={1}>
                            <Typography variant="body2">
                                <strong>Total expected attendees:</strong> {totalExpected}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>

                {/* Maybe list */}
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Maybe ({grouped.maybe.length})
                        </Typography>
                        {grouped.maybe.length === 0 ? (
                            <Typography color="text.secondary">No one yet.</Typography>
                        ) : (
                            <List>
                                {grouped.maybe.map((g) => (
                                    <ListItemButton key={g.id} divider>
                                        <ListItemText
                                            primary={g.name}
                                            secondary={g.note ? `Note: ${g.note}` : undefined}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </CardContent>
                </Card>

                {/* Not Going list */}
                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Not Going ({grouped.not_going.length})
                        </Typography>
                        {grouped.not_going.length === 0 ? (
                            <Typography color="text.secondary">No one yet.</Typography>
                        ) : (
                            <List>
                                {grouped.not_going.map((g) => (
                                    <ListItemButton key={g.id} divider>
                                        <ListItemText
                                            primary={g.name}
                                            secondary={g.note ? `Note: ${g.note}` : undefined}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </CardContent>
                </Card>

                {/* Admin reset */}
                {isAdmin && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Button variant="contained" color="error" onClick={handleReset}>
                            🚨 Reset All RSVPs
                        </Button>
                    </>
                )}

                {/* Modals */}
                <GoingModal
                    open={openGoing}
                    onClose={() => setOpenGoing(false)}
                    onConfirm={handleConfirmGoing}
                />
                <NoteModal
                    open={!!openOther}
                    onClose={() => setOpenOther(false)}
                    onConfirm={handleConfirmOther}
                    title={openOther === "not_going" ? "Not Going" : "Maybe"}
                />
            </Box>
        </Box>
    );
};

export default RSVP;
