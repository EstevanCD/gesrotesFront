import React from "react";
import { Header } from "../styles";
import { Nav } from "../styles";
import { Menu } from "../styles";

import { FiMenu } from "react-icons/fi";
import style from "./Navbar.module.css";

function Navbar() {
  const optionsMenu = [
    "Verificar estudiantes",
    "Verificar Docentes",
    "Asignaturas",
  ];

  return (
    <div className={style.container}>
      <div className={style.containernav}>
        <div className={style.logo}>Logo</div>
        <div className={style.items}>
          <ul>
            {optionsMenu.map((item) => {
              return <li className={style.containerli}>{item}</li>;
            })}
          </ul>
        </div>
        <div className={style.footer}>Contacto</div>
      </div>
    </div>
  );
}

export default Navbar;
