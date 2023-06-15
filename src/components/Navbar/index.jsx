import React from "react";

import style from "./Navbar.module.css";

import Typography from "@material-ui/core/Typography";

import VerifiedIcon from "@material-ui/icons/VerifiedUser";
import logo from "../../assets/Logo2.png";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import ChecklistIcon from '@material-ui/icons/PlaylistAddCheck';
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {  Link } from "react-router-dom";


function Navbar() {
  const optionsMenu = [
    <><ChecklistIcon/><Link to="/" className={style.link}>Verificar estudiantes</Link></>,
    <><HowToRegIcon/> <Link to="/" style={{ textDecoration: "none", outline:"none" }}>Verificar Docentes</Link></>,
    <><MenuBookIcon/> <Link to="/subjects" className={style.link}>Asignaturas</Link></>,
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
        <img className="logo" src={logo} style={{height:60, width:60}}/>
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
            <h4>GESTIÓN</h4>
            {optionsMenu.map((item) => {
              return <li className={style.containerli}>{item}</li>;
            })}
            <h4>MI PERFIL</h4>
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
