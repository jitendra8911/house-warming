import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import "../styles/components/footer.scss";

const Footer: React.FC = () => {
    return (
        <Box component="footer" className="footer">
            <Card
                sx={{
                    maxWidth: 600,
                    margin: "0 auto",
                    borderRadius: 3,
                    boxShadow: "none",
                    border: "none",
                    backgroundColor: "rgba(255,255,255,0.85)", // semi-transparent for background blending
                }}
            >
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="body2" className="footer-text">
                        Thank you for being part of our special day ❤️
                    </Typography>
                </CardContent>

            </Card>


        </Box>
    );
};

export default Footer;
