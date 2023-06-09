import React from "react";
import style from "./Routine.module.css";
import AddIcon from "@material-ui/icons/Add";
import Modals from "../Modals/Modals";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { environment } from "../../hooks/environment";

let grupos = [
  ["Tiene datos", "", "", "", "", ""],
  ["", "Tiene datos", "", "", "", ""],
  ["", "", "Tiene datos", "", "", ""],
  ["", "", "", "Tiene datos", "", ""],
  ["", "", "", "", "Tiene datos", ""],
];

const Routine = () => {
  const banderaGrupo = true;
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenCycle = () => {
    setModalContent("CycleCreation");
    setModalTitle("CREAR CICLO");
    setOpen(true);
  };

  const handleOpenRote = () => {
    setModalContent("CreateRote");
    setModalTitle("INFORMACIÓN DEL ROTE");
    setOpen(true);
  };

  const handleOpenGesGrupos = () => {
    setModalContent("ClassManageGroups");
    setModalTitle("GESTIONAR GRUPOS");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [cicles, setCicles] = useState([]);

  useEffect(() => {
    const url = environment.url + "/api/ciclos/listar/?id_asignatura=" + "1";
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const simplifiedData = data.ciclos.map((cicle) => {
          return {
            id: cicle.id,
            inicio: cicle.inicio,
            fin: cicle.fin
          };
        });
        setCicles(simplifiedData);
      });
  }, []);
  console.log(cicles)

  return (
    <div>
      <Modals
        open={open}
        handleClose={handleClose}
        modalContent={modalContent}
        title={modalTitle}
      />
      <div className={style.positionButton}>
        <button className={style.buttons2} onClick={handleOpenCycle}>
          {" "}
          <i>
            <AddIcon style={{ fontSize: "15px" }} />
          </i>{" "}
          Nuevo Ciclo
        </button>

        <button className={style.buttons} onClick={handleOpenGesGrupos}>
          Gestionar Grupos
        </button>
        <button className={style.buttonsred}>Eliminar Todo</button>
        <div>
          <table>
            <tr>
              <th>
                <div className={style.titletable}>
                  <p>Grupo/Ciclo</p>
                </div>
              </th>
              {cicles.map((fecha, index) => (
                <th key={index}>
                  <div className={style.cardCommon}>
                    <div className={style.containerDates}>
                      <p>
                        {fecha.inicio}
                        <br />
                        {fecha.fin}
                      </p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>

            {grupos.map((grupo, indice) => {
              return (
                <tr>
                  <td>
                    <div class={style.cardgroup2}>
                      <p /* onClick={handleOpenRote} */ class={style.cardgroup}>
                        {indice + 1}
                      </p>
                    </div>
                  </td>
                  {grupo.map((dato) => {
                    return (
                      <td>
                        <div
                          className={
                            dato === "" ? style.cardInfo : style.cardConten
                          }
                        >
                          {dato === "" ? (
                            <h2 onClick={handleOpenRote}>
                              <AddCircleIcon
                                style={{ color: "#888888", fontSize: 40 }}
                              />
                              <br />
                              Sin asignar
                            </h2>
                          ) : (
                            <h2 onClick={handleOpenRote}>{dato}</h2>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Routine;
