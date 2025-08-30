import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Dialog,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../styles/pages/gallery.scss";

type Photo = { alt: string; name: string; thumb: string; full?: string };

const Gallery: React.FC = () => {
    // Import thumbnails & full-res
    const thumbsObj = import.meta.glob(
        "/src/assets/images/gallery/thumbnails/*.{png,jpg,jpeg,webp,avif}",
        { eager: true, import: "default" }
    );
    const fullObj = import.meta.glob(
        "/src/assets/images/gallery/full-res/*.{png,jpg,jpeg,webp,avif}",
        { eager: true, import: "default" }
    );

    // Build a name -> full URL map
    const fullMap = useMemo(() => {
        const m: Record<string, string> = {};
        Object.values(fullObj).forEach((u: unknown) => {
            const url = String(u);
            const name = url.split("/").pop()!;
            m[name] = url;
        });
        return m;
    }, [fullObj]);

    // Build sorted photos array from thumbnails
    const photos = useMemo<Photo[]>(() => {
        const list = Object.values(thumbsObj).map((u: unknown) => {
            const url = String(u);
            const name = url.split("/").pop()!;
            return {
                name,
                thumb: url,
                full: fullMap[name], // may be undefined if not present
                alt: name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
            };
        });
        // Sort by filename so order is stable
        return list.sort((a, b) => a.name.localeCompare(b.name));
    }, [thumbsObj, fullMap]);

    // Viewer state = index of current photo (null = closed)
    const [index, setIndex] = useState<number | null>(null);
    const open = index !== null;
    const current = open && index! >= 0 ? photos[index!] : null;

    const handleOpen = useCallback((i: number) => setIndex(i), []);
    const handleClose = useCallback(() => setIndex(null), []);

    const handlePrev = useCallback(() => {
        if (!photos.length || index === null) return;
        setIndex((prev) => (prev! - 1 + photos.length) % photos.length);
    }, [photos.length, index]);

    const handleNext = useCallback(() => {
        if (!photos.length || index === null) return;
        setIndex((prev) => (prev! + 1) % photos.length);
    }, [photos.length, index]);

    // Arrow keys for navigation & Esc to close
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, handlePrev, handleNext, handleClose]);

    return (
        <Box className="page-container page-gallery">
            <Box className="page-content">
                <Card
                    sx={{
                        width: "100%",
                        margin: "0 auto",
                        borderRadius: 3,
                        boxShadow: "none",
                        border: "none",
                        backgroundColor: "rgba(255,255,255,0.85)",
                    }}
                >
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Gallery 🏡
                        </Typography>
                        <Grid container spacing={2}>
                            {photos.map((p, i) => (
                                <Grid component="div">
                                    <Card
                                        sx={{ height: "100%", cursor: "zoom-in" }}
                                        onClick={() => handleOpen(i)}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={p.thumb}
                                            alt={p.alt}
                                            loading="lazy"
                                            sx={{ height: 240, objectFit: "cover" }}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>

                {/* SINGLE dialog, outside the map */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="lg"

                    PaperProps={{
                        sx: {
                            backgroundColor: "rgba(255,255,255,0.95)",
                            backgroundImage: "none",
                            boxShadow: 6,
                            position: "relative",
                        },
                    }}
                    BackdropProps={{
                        sx: {
                            // 🎉 Confetti backdrop (uses the same file you set in theme/public)
                            backgroundColor: "rgba(255,255,255,0.9)",
                            // backgroundImage: 'url("/background.png")',
                            backgroundRepeat: "repeat",
                            backgroundSize: "420px 420px",
                            backdropFilter: "none",
                        },
                    }}
                >
                    {/* Close button (top-right) */}
                    <IconButton
                        aria-label="Close"
                        onClick={handleClose}
                        color="primary"
                        sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            zIndex: 2,
                            bgcolor: "primary.main",              // solid background
                            color: "#fff",                        // white icon for contrast
                            "&:hover": { bgcolor: "primary.dark" },
                            boxShadow: 3,                         // raised like a floating button
                            width: { xs: 30, sm: 56 },   // 👈 smaller on mobile
                            height: { xs: 30, sm: 56 },
                        }}
                    >
                        <CloseIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
                    </IconButton>

                    {/* Prev button (left center) */}
                    {open && photos.length > 1 && (
                        <IconButton
                            aria-label="Previous"
                            onClick={handlePrev}
                            color="primary"
                            sx={{
                                position: "absolute",
                                left: 16,
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 2,
                                bgcolor: "primary.main",
                                color: "#fff",
                                "&:hover": { bgcolor: "primary.dark" },
                                boxShadow: 3,
                                width: { xs: 30, sm: 56 },   // 👈 smaller on mobile
                                height: { xs: 30, sm: 56 },
                            }}
                        >
                            <ChevronLeftIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}/>
                        </IconButton>
                    )}

                    {/* Next button (right center) */}
                    {open && photos.length > 1 && (
                        <IconButton
                            aria-label="Next"
                            onClick={handleNext}
                            color="primary"
                            sx={{
                                position: "absolute",
                                right: 16,
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 2,
                                bgcolor: "primary.main",
                                color: "#fff",
                                "&:hover": { bgcolor: "primary.dark" },
                                boxShadow: 3,
                                width: { xs: 30, sm: 56 },   // 👈 smaller on mobile
                                height: { xs: 30, sm: 56 },
                            }}
                        >
                            <ChevronRightIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}/>
                        </IconButton>
                    )}

                    {/* Image content */}
                    {current && (
                        <Box sx={{ p: 0, maxWidth: "90vw", maxHeight: "85vh" }}>
                            <img
                                src={current.full || current.thumb}
                                alt={current.alt}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "85vh",
                                    display: "block",
                                    objectFit: "contain",
                                }}
                                loading="eager"
                            />
                        </Box>
                    )}
                </Dialog>
            </Box>
        </Box>
    );
};

export default Gallery;
