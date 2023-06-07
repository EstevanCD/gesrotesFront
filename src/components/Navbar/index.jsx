import React from "react";

import style from "./Navbar.module.css";

import Typography from "@material-ui/core/Typography";

import VerifiedIcon from "@material-ui/icons/VerifiedUser";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import ChecklistIcon from '@material-ui/icons/PlaylistAddCheck';
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Navbar() {
  const optionsMenu = [
    <><ChecklistIcon/> Verificar estudiantes</>,
    <><HowToRegIcon/> Verificar Docentes</>,
    <><MenuBookIcon/> Asignaturas</>,
  ];

  const optionsProfile = [
    <><SettingsIcon/> Configuracion</>,
    <><ExitToAppIcon/> Salir</>,
  ];

  //TODO: agregar logo

  return (
    <div className={style.container}>
      <div className={style.containernav}>
        <div className={style.logo}>
          <VerifiedIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GESROTES
          </Typography>
        </div>
        <div className={style.items}>
          GESTIÓN
          <ul>
            <h5>GESTIÓN</h5>
            {optionsMenu.map((item) => {
              return <li className={style.containerli}>{item}</li>;
            })}
            <h5>MI PERFIL</h5>
            {optionsProfile.map((item) => {
              return <li className={style.containerli}>{item}</li>;
            })}
          </ul>
          MI PERFIL
          <ul>
            {optionsProfile.map((item) => {
              return <li className={style.containerli}>{item}</li>;
            })}
          </ul>
        </div>
        <div className={style.footer}>
          <PhoneInTalkIcon />
          <Typography>
            Contactanos
            <br />
            +57 345 6587 1548
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
