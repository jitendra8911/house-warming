import React, { useMemo, useState } from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Dialog, useMediaQuery } from "@mui/material";
import "../styles/pages/gallery.scss";

type Item = { thumb: string; full?: string; alt: string };

const Gallery: React.FC = () => {
    // Keep the module keys so we can match by original filename
    const thumbs = import.meta.glob("/src/assets/images/gallery/thumbnails/*.{png,jpg,jpeg,webp,avif}", {
        eager: true,
        import: "default",
    }) as Record<string, string>;

    const fulls = import.meta.glob("/src/assets/images/gallery/full-res/*.{png,jpg,jpeg,webp,avif}", {
        eager: true,
        import: "default",
    }) as Record<string, string>;

    // Build a map: "IMG_1234.jpg" -> full URL
    const fullByBase = useMemo(() => {
        const m: Record<string, string> = {};
        Object.entries(fulls).forEach(([key, url]) => {
            const base = key.split("/").pop(); // original filename in src/
            if (base) m[base] = url;
        });
        return m;
    }, [fulls]);

    // Create items by pairing thumb with its full using the original basename
    const items: Item[] = useMemo(() => {
        return Object.entries(thumbs).map(([key, thumbUrl], i) => {
            const base = key.split("/").pop();
            const fullUrl = base ? fullByBase[base] : undefined;
            return { thumb: thumbUrl, full: fullUrl, alt: `House progress ${i + 1}` };
        });
    }, [thumbs, fullByBase]);

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<Item | null>(null);
    const fullScreen = useMediaQuery("(max-width:600px)");

    return (
        <Box className="page-container page-gallery">
            <Box className="page-content">
                <Card
                    sx={{
                        width: "100%",
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
                            {items.map((it, i) => (
                                <Grid  key={`gallery-img-${i}`}>
                                    <Card
                                        sx={{ height: "100%", cursor: it.full ? "zoom-in" : "default" }}
                                        onClick={() => {
                                            if (!it.full) return; // no full match found
                                            setActive(it);
                                            setOpen(true);
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={it.thumb}
                                            alt={it.alt}
                                            sx={{ height: 240, objectFit: "cover" }}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>

                {/* Single dialog outside the map */}
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    maxWidth="lg"
                    fullWidth
                    fullScreen={fullScreen}
                    keepMounted
                >
                    {active?.full && (
                        <Box sx={{ p: 0 }}>
                            <img
                                src={active.full}
                                alt={active.alt}
                                style={{ width: "100%", height: "auto", display: "block" }}
                                loading="eager"
                                decoding="async"
                            />
                        </Box>
                    )}
                </Dialog>
            </Box>
        </Box>
    );
};

export default Gallery;
