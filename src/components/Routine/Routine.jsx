import React from "react";
import style from "./Routine.module.css";
import AddIcon from "@material-ui/icons/Add";

let fechas = [
  ['Enero 27 2022', 'Feba 25 2022'],
  ['Enero 27 2022', 'Feba 25 2022'],
  ['Enero 27 2022', 'Feba 25 2022'],
  ['Enero 27 2022', 'Feba 25 2022'],
  ['Enero 27 2022', 'Feba 25 2022'],
];

let grupos = [
  ["Tiene datos", "", "", "", ""],
  ["", "Tiene datos", "", "", ""],
  ["", "", "Tiene datos", "", ""],
  ["", "", "", "Tiene datos", ""],
  ["", "", "", "", "Tiene datos"],
];

const Routine = () => {
  const banderaGrupo = true;
  return (
    <div>
      <div className={style.positionButton}>
        <button className={style.buttons2}>
          {" "}
          <i>
            <AddIcon style={{ fontSize: "15px" }} />
          </i>{" "}
          Nuevo Ciclo
        </button>
        <button className={style.buttons}>Gestionar Grupos</button>
        <button className={style.buttonsred}>Eliminar Todo</button>
        <div>
          <table>
            <tr>
              <th>
                <div className={style.titletable} >
                  <h2>Grupo/Ciclo</h2>
                </div>
              </th>
              {fechas.map((fecha) => {
                return (<th>
                  <div class={style.card}>
                    <h2>{fecha[0]} {fecha[1]}</h2>
                  </div>
                </th>)
              })}
            </tr>

            {grupos.map((grupo, indice) => {
              return (
                <tr>
                  <td>
                    <div class={style.card}>
                      <h2>{indice + 1}</h2>
                    </div>
                  </td>
                  {grupo.map((dato) => {
                    return (
                      <td>
                        <div class={style.card}>
                          <h2>{dato === "" ? "Agregar" : dato}</h2>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}

          </table>
        </div>
      </div>
    </div>
  );
};

export default Routine;
