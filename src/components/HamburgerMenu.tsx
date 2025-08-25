import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

interface HamburgerMenuProps {
    toggle: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ toggle }) => {
    return (
        <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggle}
            sx={{ m: 2 }}
        >
            <MenuIcon />
        </IconButton>
    );
};

export default HamburgerMenu;
