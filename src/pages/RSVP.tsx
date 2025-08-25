import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

interface RSVPFormInputs {
    name: string;
    attending: boolean;
    additionalGuests: string;
}

interface RSVPEntry {
    name: string;
    attending: boolean;
    additionalGuests: string;
}

const RSVP: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<RSVPFormInputs>();
    const [guests, setGuests] = useState<RSVPEntry[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const saved = localStorage.getItem("rsvps");
        if (saved) {
            setGuests(JSON.parse(saved));
        }
        const admin = localStorage.getItem("isAdmin");
        setIsAdmin(admin === "true");
    }, []);

    const onSubmit: SubmitHandler<RSVPFormInputs> = (data) => {
        const newEntry: RSVPEntry = {
            name: data.name,
            attending: data.attending,
            additionalGuests: data.additionalGuests,
        };

        const updatedGuests = [...guests, newEntry];
        setGuests(updatedGuests);
        localStorage.setItem("rsvps", JSON.stringify(updatedGuests));
        reset();
    };

    const handleReset = () => {
        if (confirm("Are you sure you want to clear all RSVPs?")) {
            localStorage.removeItem("rsvps");
            setGuests([]);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "0 auto", mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                RSVP
            </Typography>

            {/* RSVP Form */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Your Name"
                            fullWidth
                            margin="normal"
                            {...register("name", { required: true })}
                        />

                        <FormControlLabel
                            control={<Checkbox {...register("attending")} />}
                            label="Attending"
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="additional-guests-label">
                                Additional Guests
                            </InputLabel>
                            <Select
                                labelId="additional-guests-label"
                                defaultValue=""
                                {...register("additionalGuests")}
                            >
                                <MenuItem value="">None</MenuItem>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <MenuItem
                                        key={i + 1}
                                        value={`+${i + 1} guest${i + 1 > 1 ? "s" : ""}`}
                                    >
                                        +{i + 1} guest{i + 1 > 1 ? "s" : ""}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit RSVP
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Guest List */}
            <Typography variant="h5" gutterBottom>
                Guest List
            </Typography>
            {guests.length === 0 ? (
                <Typography color="text.secondary">No RSVPs yet.</Typography>
            ) : (
                <List>
                    {guests.map((guest, index) => (
                        <ListItem key={index} divider>
                            <ListItemText
                                primary={guest.name}
                                secondary={
                                    (guest.attending ? "✅ Attending" : "❌ Not attending") +
                                    (guest.additionalGuests
                                        ? ` (${guest.additionalGuests})`
                                        : "")
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}

            {/* Admin Reset */}
            {isAdmin && (
                <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={handleReset}
                >
                    🚨 Reset All RSVPs
                </Button>
            )}
        </Box>
    );
};

export default RSVP;
