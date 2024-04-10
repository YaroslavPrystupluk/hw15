import {FC} from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { useLogout } from "../../hooks/useLogout";



const Header: FC = () => {
	const logout = useLogout();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
              News
            </Link>
          </Typography>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/registartion"
          >
            <Button color="inherit">Registration</Button>
          </Link>
          <Link style={{ textDecoration: "none", color: "white" }} to="/login">
            <Button color="inherit">Login</Button>
          </Link>
          <Button onClick={logout} color="inherit">
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header
