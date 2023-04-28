import React from "react";

import style from "./Navbar.module.css";

import Typography from "@material-ui/core/Typography";

import VerifiedIcon from "@material-ui/icons/VerifiedUser";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import ChecklistIcon from '@material-ui/icons/PlaylistAddCheck';
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";

function Navbar() {
  const optionsMenu = [
    <><ChecklistIcon/>Verificar estudiantes</>,
    <><HowToRegIcon/>Verificar Docentes</>,
    "Asignaturas",
  ];

  const optionsProfile = ["Configuracion", "Salir",];

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
          <ul>
            <h3>GESTIÓN</h3>
            {optionsMenu.map((item) => {
              return <li className={style.containerli}>{item}</li>;
            })}
            <h3>MI PERFIL</h3>
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
