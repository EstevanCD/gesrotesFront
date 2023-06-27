import React from "react";
import { useParams } from "react-router";
import style from "./Routine.module.css";
import AddIcon from "@material-ui/icons/Add";
import Modals from "../Modals/Modals";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { environment } from "../../hooks/environment";

const Routine = () => {
  const [selectedCycle, setSelectedCycle] = useState(null);
  let asignatura = useParams();
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);

  const handleOpenCycle = () => {
    setModalContent("CycleCreation");
    setModalTitle("CREAR CICLO");
    setOpen(true);
  };

  //editar ciclo

  const handleEditCycle = (cycleId, inicio, fin) => {
    setSelectedCycle({
      id: cycleId,
      inicio: inicio,
      fin: fin,
    });
    setModalContent("CycleEdit");
    setModalTitle("EDITAR CICLO");
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
    const url =
      environment.url + `/api/ciclos/listar/?id_asignatura=${asignatura.id}`;
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const simplifiedData = data.ciclos.map((cicle) => {
          return {
            id: cicle.id,
            inicio: cicle.inicio,
            fin: cicle.fin,
          };
        });
        setCicles(simplifiedData);
      });
  }, []);
  useEffect(() => {
    async function fetchData() {
      const url = environment.url + `/api/asignaciones/listar/${asignatura.id}`;
      const response = await fetch(url);
      const json = await response.json();
      setAssignments(json.asignaciones);
    }
    fetchData();
  }, []);
  const renderAssignments = () => {
    let schedulesRow = [];
    // TODO: indexGroup < 5 --> Se debe cambiar el 5 por la cantidad de elementos
    // de la lista de grupos que se trae con el endpoint del back
    // Ademas se debe cambiar en el primer if por grupos[indexGgroup].id
    // o segun corresponda el renombrado de las variables
    for (let indexGroup = 0; indexGroup < 5; indexGroup++) {
      let schedulesColumn = [];
      for (let indexCicle = 0; indexCicle < cicles.length; indexCicle++) {
        assignments.map((group) => {
          if (
            group.id_grupo == indexGroup + 1 &&
            group.id_ciclo == cicles[indexCicle].id
          ) {
            let teachers = [];
            group.docentes.map((teacher) => {
              teachers.push(
                <div className={style.cardConten}>
                  <h2 onClick={handleOpenRote}>{teacher.docente}</h2>
                  <p>{teacher.modulos[0].horarios[0].descripcion}</p>
                </div>
              );
            });
            schedulesColumn.push(<td>{teachers}</td>);
          } else {
            schedulesColumn.push(
              <td>
                <div className={style.cardInfo}>
                  <h2 onClick={handleOpenRote}>
                    <AddCircleIcon style={{ color: "#888888", fontSize: 40 }} />
                    <br />
                    Sin asignar
                  </h2>
                </div>
              </td>
            );
          }
        });
      }
      schedulesRow.push(
        <tr>
          <td>
            <div class={style.cardgroup2}>
              <p /* onClick={handleOpenRote} */ class={style.cardgroup}>
                {indexGroup + 1}
              </p>
            </div>
          </td>
          {schedulesColumn}
        </tr>
      );
    }
    return schedulesRow;
  };
  return (
    <div>
      <Modals
        open={open}
        handleClose={handleClose}
        modalContent={modalContent}
        title={modalTitle}
        cycle={selectedCycle}
      />
      <div className={style.buttonContainer}>
          <button className={style.buttons2} onClick={handleOpenCycle}>
            <i>
              <AddIcon style={{ fontSize: "15px" }} />
            </i>
            Nuevo Ciclo
          </button>

          <button className={style.buttons} onClick={handleOpenGesGrupos}>
            Gestionar Grupos
          </button>
          <button className={style.buttonsred}>Eliminar Todo</button>
        </div>
      <div className={style.positionButton}>
        <div>
          <table>
            <tr>
              <th>
                <div className={style.titletable}>
                  <p>Grupo/Ciclo</p>
                </div>
              </th>
              {cicles.map((fecha, index) => (
                <th
                  key={index}
                  onClick={() =>
                    handleEditCycle(fecha.id, fecha.inicio, fecha.fin)
                  }
                >
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
            {renderAssignments()}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Routine;
