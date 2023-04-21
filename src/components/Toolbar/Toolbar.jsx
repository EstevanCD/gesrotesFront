import React from "react";
import style from "./Toolbar.module.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";

import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";

import AppBar from "@material-ui/core/AppBar";

import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/core/Menu";

import MenuItem from "@material-ui/core/MenuItem";
import AdbIcon from "@material-ui/icons/Adb";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
};

export default function CustomSeparator() {
  //TODO: AGREGAR RUTAS AL BREADCRUMB
  //: enlazar avatar
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div className={style.container}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              <HomeIcon />
            </Link>
            <Link color="inherit" href="/" onClick={handleClick}>
              Asignaturas
            </Link>
            <Typography color="textPrimary">
              Cuidado de la salud mental
            </Typography>
          </Breadcrumbs>
          <hr></hr>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </div>
  );
}
