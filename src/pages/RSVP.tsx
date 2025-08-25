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

type RSVPStatus = "going" | "not_going" | "maybe";

interface RSVPEntry {
    name: string;
    status: RSVPStatus;
    additionalGuests: number;
    note?: string;
    createdAt: string;
}

const STORAGE_KEY = "rsvps";

const RSVP: React.FC = () => {
    const [name, setName] = useState("");
    const [guests, setGuests] = useState<RSVPEntry[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const [openGoing, setOpenGoing] = useState(false);
    const [openOther, setOpenOther] = useState<false | RSVPStatus>(false);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed: RSVPEntry[] = JSON.parse(saved).map((g: any) => ({
                    ...g,
                    additionalGuests:
                        typeof g.additionalGuests === "string"
                            ? parseInt(String(g.additionalGuests).replace(/[^\d]/g, ""), 10) || 0
                            : Number(g.additionalGuests || 0),
                    status: (g.status as RSVPStatus) ?? (g.attending ? "going" : "maybe"),
                }));
                setGuests(parsed);
            } catch {}
        }
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
    }, []);

    const saveGuests = (list: RSVPEntry[]) => {
        setGuests(list);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    };

    const ensureName = (): string | null => {
        const trimmed = name.trim();
        if (!trimmed) {
            alert("Please enter your name first.");
            return null;
        }
        return trimmed;
    };

    const handleGoingClick = () => {
        if (!ensureName()) return;
        setOpenGoing(true);
    };

    const handleOtherClick = (status: Exclude<RSVPStatus, "going">) => {
        if (!ensureName()) return;
        setOpenOther(status);
    };

    const handleConfirmGoing = (additionalGuests: number) => {
        const trimmed = ensureName();
        if (!trimmed) return;
        const entry: RSVPEntry = {
            name: trimmed,
            status: "going",
            additionalGuests: Number(additionalGuests || 0),
            createdAt: new Date().toISOString(),
        };
        saveGuests([...guests, entry]);
        setOpenGoing(false);
    };

    const handleConfirmOther = (note?: string) => {
        if (!openOther) return;
        const trimmed = ensureName();
        if (!trimmed) return;
        const entry: RSVPEntry = {
            name: trimmed,
            status: openOther,
            additionalGuests: 0,
            note,
            createdAt: new Date().toISOString(),
        };
        saveGuests([...guests, entry]);
        setOpenOther(false);
    };

    const handleReset = () => {
        if (confirm("Are you sure you want to clear all RSVPs?")) {
            localStorage.removeItem(STORAGE_KEY);
            setGuests([]);
        }
    };

    const grouped = useMemo(() => {
        const by: Record<RSVPStatus, RSVPEntry[]> = {
            going: [],
            not_going: [],
            maybe: [],
        };
        for (const g of guests) by[g.status].push(g);
        return by;
    }, [guests]);

    const totalExpected = useMemo(
        () => grouped.going.reduce((sum, g) => sum + 1 + (g.additionalGuests || 0), 0),
        [grouped]
    );

    return (
        <Box className="page-container">
            <Box className="page-content">
                <Typography variant="h4" gutterBottom>
                    RSVP 📝
                </Typography>

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

                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Going ({grouped.going.length})
                        </Typography>
                        {grouped.going.length === 0 ? (
                            <Typography color="text.secondary">No one yet.</Typography>
                        ) : (
                            <List>
                                {grouped.going.map((g, i) => (
                                    <ListItemButton key={`going-${i}`} divider>
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

                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Maybe ({grouped.maybe.length})
                        </Typography>
                        {grouped.maybe.length === 0 ? (
                            <Typography color="text.secondary">No one yet.</Typography>
                        ) : (
                            <List>
                                {grouped.maybe.map((g, i) => (
                                    <ListItemButton key={`maybe-${i}`} divider>
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

                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Not Going ({grouped.not_going.length})
                        </Typography>
                        {grouped.not_going.length === 0 ? (
                            <Typography color="text.secondary">No one yet.</Typography>
                        ) : (
                            <List>
                                {grouped.not_going.map((g, i) => (
                                    <ListItemButton key={`notgoing-${i}`} divider>
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

                {isAdmin && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Button variant="contained" color="error" onClick={handleReset}>
                            🚨 Reset All RSVPs
                        </Button>
                    </>
                )}

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
