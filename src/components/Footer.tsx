import React from "react";
import { Box, Typography } from "@mui/material";
import "../styles/components/footer.scss";

const Footer: React.FC = () => {
    return (
        <Box component="footer" className="footer">
            <Typography variant="body2" className="footer-text">
                Thank you for celebrating with us! 💖
            </Typography>
            <Typography variant="body2" className="footer-subtext">
                Contact: (123) 456-7890 • ournewhome@example.com
            </Typography>
        </Box>
    );
};

export default Footer;
