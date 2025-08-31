// src/pages/RSVP.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    MenuItem,
    Stack,
    List,
    ListItemButton,
    ListItemText,
    Snackbar,
    Alert,
    IconButton,
    InputAdornment,
    Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { saveRsvp } from "../lib/firebase-rsvp";
import type { Rsvp, RsvpStatus } from "../types/rsvp";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

const additionalGuestOptions = Array.from({ length: 10 }, (_, i) => i + 1);

type FormValues = {
    name: string;
    email?: string;
    phone?: string;
    status: RsvpStatus;
    additionalGuests?: number;
    arrivalAirport?: string;
    arrivalDate?: string;
    arrivalTime?: string;
    note?: string;
};

type RSVPStatus = "going" | "not_going" | "maybe";

export interface RSVPEntry {
    id?: string;
    name: string;
    status: RSVPStatus;
    additionalGuests: number;
    note?: string;
    createdAt?: any; // Firestore Timestamp (optional until written)
}

const RSVP: React.FC = () => {
    const { handleSubmit, control, watch, reset, setValue } = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            status: "going",
            additionalGuests: 0,
            arrivalAirport: "",
            arrivalDate: "",
            arrivalTime: "",
            note: "",
        },
    });

    const status = watch("status");
    const isGoing = status === "going";
    const [guests, setGuests] = useState<RSVPEntry[]>([]);
    const [snackOpen, setSnackOpen] = useState(false);
    const RSVPS_COL = "rsvps";
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingData, setPendingData] = useState<FormValues | null>(null);

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

    // Gate form submission so only the explicit submit button can submit
    const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        const submitter = (e.nativeEvent as SubmitEvent & { submitter?: HTMLElement }).submitter;
        const isWhitelisted =
            !!submitter && typeof submitter.matches === "function" && submitter.matches('[data-submit="true"]');

        if (!isWhitelisted) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        // If allowed, delegate to RHF
        handleSubmit(onSubmit)(e);
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        setPendingData(data);
        setConfirmOpen(true);   // open confirmation dialog
    };

    const handleConfirm = async () => {
        if (!pendingData) return;
        const isGoing = pendingData.status === "going";

        const payload: Rsvp = {
            name: pendingData.name.trim(),
            email: pendingData.email?.trim(),
            phone: pendingData.phone?.trim(),
            status: pendingData.status,
            additionalGuests: pendingData.additionalGuests ?? 0,
            arrivalAirport: isGoing ? pendingData.arrivalAirport?.trim() : "",
            arrivalDate: isGoing ? pendingData.arrivalDate || "" : "",
            arrivalTime: isGoing ? pendingData.arrivalTime || "" : "",
            note: !isGoing ? pendingData.note?.trim() : "",
        };

        await saveRsvp(payload);
        setSnackOpen(true);
        reset();                // clear form after submit
        setConfirmOpen(false);  // close dialog
    };

    const handleCancel = () => {
        setConfirmOpen(false);
        setPendingData(null);
    };

    // Groups & counts
    const grouped = useMemo(() => {
        const by: Record<RSVPStatus, RSVPEntry[]> = { going: [], not_going: [], maybe: [] };
        for (const g of guests) by[g.status]?.push(g);
        return by;
    }, [guests]);

    const totalExpected = useMemo(
        () => grouped.going.reduce((sum, g) => sum + 1 + (g.additionalGuests || 0), 0),
        [grouped]
    );

    // Small helper: clear adornment for fields
    const ClearAdornment: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
        <InputAdornment position="end">
            <IconButton aria-label={`Clear ${label}`} size="small" onClick={onClick} edge="end" type="button">
                <ClearIcon fontSize="small" />
            </IconButton>
        </InputAdornment>
    );

    return (
        <Box className="page-container">
            <Box className="page-content">
                <Card sx={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            RSVP 📝
                        </Typography>

                        <Stack
                            component="form"
                            spacing={2}
                            onSubmit={onFormSubmit}     // ⬅️ use the gate
                            noValidate
                            onKeyDown={(e) => {
                                const target = e.target as HTMLElement;
                                const tag = target.tagName;
                                const role = target.getAttribute("role");
                                const isEnter = e.key === "Enter" || e.code === "Enter" || e.key === "NumpadEnter";

                                // Allow newline in textarea and Enter inside combobox/selects
                                const allow =
                                    tag === "TEXTAREA" ||
                                    tag === "SELECT" ||
                                    role === "combobox"; // MUI TextField select renders with combobox

                                if (isEnter && !allow) {
                                    e.preventDefault();
                                }
                            }}
                        >

                        {/* Name */}
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: "Name is required" }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        label="Full Name"
                                        required
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        inputProps={{enterKeyHint: "next"}}
                                    />
                                )}
                            />

                            {/* Email (optional) */}
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <TextField {...field} type="email" label="Email (optional)" inputProps={{enterKeyHint: "next"}} />}
                            />

                            {/* Phone (optional) */}
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => <TextField {...field} type="tel" label="Phone (optional)" inputProps={{enterKeyHint: "next"}}/>}
                            />

                            {/* Status */}
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} select label="Attendance">
                                        <MenuItem value="going">Going</MenuItem>
                                        <MenuItem value="not_going">Not Going</MenuItem>
                                        <MenuItem value="maybe">Maybe</MenuItem>
                                    </TextField>
                                )}
                            />

                            {/* Additional guests */}
                            <Controller
                                name="additionalGuests"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} select label="Additional guests">
                                        <MenuItem value={0}>No additional guests</MenuItem>
                                        {additionalGuestOptions.map((n) => (
                                            <MenuItem key={n} value={n}>
                                                {`+${n} guest${n > 1 ? "s" : ""}`}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />

                            {/* Arrival info (Going only) */}
                            {isGoing && (
                                <>
                                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                        Arrival details (optional)
                                    </Typography>

                                    {/* Airport (clearable) */}
                                    <Controller
                                        name="arrivalAirport"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Arrival airport (e.g., ORD, MDW)"
                                                placeholder="Airport code or name"
                                                InputProps={{
                                                    endAdornment: field.value ? (
                                                        <ClearAdornment
                                                            label="arrival airport"
                                                            onClick={() => setValue("arrivalAirport", "")}
                                                        />
                                                    ) : undefined,
                                                }}
                                            />
                                        )}
                                    />

                                    {/* Date + Time (both clearable) */}
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                        <Controller
                                            name="arrivalDate"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    type="date"
                                                    label="Arrival date"
                                                    InputLabelProps={{ shrink: true }}
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: field.value ? (
                                                            <ClearAdornment
                                                                label="arrival date"
                                                                onClick={() => setValue("arrivalDate", "")}
                                                            />
                                                        ) : undefined,
                                                    }}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="arrivalTime"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    type="time"
                                                    label="Arrival time"
                                                    InputLabelProps={{ shrink: true }}
                                                    fullWidth
                                                    InputProps={{
                                                        endAdornment: field.value ? (
                                                            <ClearAdornment
                                                                label="arrival time"
                                                                onClick={() => setValue("arrivalTime", "")}
                                                            />
                                                        ) : undefined,
                                                    }}
                                                />
                                            )}
                                        />
                                    </Stack>
                                </>
                            )}

                            {/* Note for Not Going / Maybe */}
                            {!isGoing && (
                                <Controller
                                    name="note"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField {...field} label="Note (optional)" multiline minRows={2} />
                                    )}
                                />
                            )}

                            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 1 }}>
                                <Button type="submit" variant="contained" color="primary" data-submit="true">
                                    Submit RSVP
                                </Button>
                            </Stack>
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
                                        <ListItemText primary={g.name} secondary={g.note ? `Note: ${g.note}` : undefined} />
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
                                        <ListItemText primary={g.name} secondary={g.note ? `Note: ${g.note}` : undefined} />
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </CardContent>
                </Card>
            </Box>

            {/* ✅ Success Snackbar */}
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

            <Dialog open={confirmOpen} onClose={handleCancel}>
                <DialogTitle>Confirm RSVP</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please confirm your RSVP submission.
                        <br />
                        <strong>Name:</strong> {pendingData?.name} <br />
                        <strong>Status:</strong> {pendingData?.status} <br />
                        {pendingData?.status === "going" && (
                            <>
                                <strong>Guests:</strong> +{pendingData?.additionalGuests} <br />
                                {pendingData?.arrivalAirport && (
                                    <>
                                        <strong>Arrival airport:</strong> {pendingData.arrivalAirport} <br />
                                        <strong>Arrival date:</strong> {pendingData.arrivalDate || "—"} <br />
                                        <strong>Arrival time:</strong> {pendingData.arrivalTime || "—"} <br />
                                    </>
                                )}
                            </>
                        )}
                        {pendingData?.note && (
                            <>
                                <strong>Note:</strong> {pendingData.note}
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="secondary">Cancel</Button>
                    <Button onClick={handleConfirm} variant="contained" color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>

    );
};

export default RSVP;
