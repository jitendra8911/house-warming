import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";

export interface GoingModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (additionalGuests: number) => void;
    initialAdditionalGuests?: number; // default 0
}

interface GoingModalInputs {
    additionalGuests: number;
}

const GoingModal: React.FC<GoingModalProps> = ({
                                                   open,
                                                   onClose,
                                                   onConfirm,
                                                   initialAdditionalGuests = 0,
                                               }) => {
    const { register, handleSubmit, reset } = useForm<GoingModalInputs>({
        defaultValues: { additionalGuests: initialAdditionalGuests },
    });

    React.useEffect(() => {
        if (open) reset({ additionalGuests: initialAdditionalGuests });
    }, [open, initialAdditionalGuests, reset]);

    const onSubmit: SubmitHandler<GoingModalInputs> = ({ additionalGuests }) => {
        onConfirm(Number(additionalGuests || 0));
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>You're Going 🎉</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="additional-guests-label">Additional Guests</InputLabel>
                        <Select
                            labelId="additional-guests-label"
                            label="Additional Guests"
                            defaultValue={initialAdditionalGuests}
                            {...register("additionalGuests", { valueAsNumber: true })}
                        >
                            {Array.from({ length: 11 }, (_, i) => (
                                <MenuItem key={i} value={i}>
                                    {i === 0 ? "None" : `+${i} guest${i > 1 ? "s" : ""}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Confirm</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default GoingModal;
