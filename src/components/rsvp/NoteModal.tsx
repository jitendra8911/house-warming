import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";

export interface NoteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (note?: string) => void;
    title?: string;               // e.g., "Not Going" or "Maybe"
    initialNote?: string;
}

interface NoteModalInputs {
    note?: string;
}

const NoteModal: React.FC<NoteModalProps> = ({
                                                 open,
                                                 onClose,
                                                 onConfirm,
                                                 title = "Confirm",
                                                 initialNote = "",
                                             }) => {
    const { register, handleSubmit, reset } = useForm<NoteModalInputs>({
        defaultValues: { note: initialNote },
    });

    React.useEffect(() => {
        if (open) reset({ note: initialNote });
    }, [open, initialNote, reset]);

    const onSubmit: SubmitHandler<NoteModalInputs> = ({ note }) => {
        onConfirm(note?.trim() ? note.trim() : undefined);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>{title}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <TextField
                        label="Add a note (optional)"
                        placeholder="e.g., Traveling that weekend"
                        fullWidth
                        multiline
                        minRows={2}
                        {...register("note")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Confirm</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default NoteModal;
