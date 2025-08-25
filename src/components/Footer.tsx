import React from "react";
import { Box, Typography } from "@mui/material";
import "../styles/components/footer.scss";

const Footer: React.FC = () => {
    return (
        <Box component="footer" className="footer">
            <Typography variant="body2" className="footer-text">
                Thank you for being part of our special day ❤️
            </Typography>
            <Typography variant="caption" className="footer-subtext">
                Contact us at: family@example.com
            </Typography>
        </Box>
    );
};

export default Footer;
