import React from "react";
import style from "./Toolbar.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from '@material-ui/core/Avatar';

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function CustomSeparator() {

  //TODO: AGREGAR RUTAS AL BREADCRUMB
  //: enlazar avatar
  return (
    <div className={style.container}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
        <HomeIcon />
        </Link>
        <Link
          color="inherit"
          href="/getting-started/installation/"
          onClick={handleClick}
        >
          Asignaturas
        </Link>
        <Typography color="textPrimary">Cuidado de la salud mental</Typography>
      </Breadcrumbs>
      <div className={style.avatar}>
      <Avatar alt="" src=""/>
      </div>
    </div>
  );
}
