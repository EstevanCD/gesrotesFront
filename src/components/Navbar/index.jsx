import React from "react";

import style from "./Navbar.module.css";

import Typography from "@material-ui/core/Typography";
import VerifiedIcon from "@material-ui/icons/VerifiedUser";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";

function Navbar() {
  const optionsMenu = [
    "Verificar estudiantes",
    "Verificar Docentes",
    "Asignaturas",
  ];

  const optionsProfile = ["Configuracion", "Salir"];

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
            {optionsMenu.map((item) => {
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
