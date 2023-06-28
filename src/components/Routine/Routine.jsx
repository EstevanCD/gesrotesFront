import React, {useContext} from "react";
import style from "./Routine.module.css";
import AddIcon from "@material-ui/icons/Add";
import Modals from "../Modals/Modals";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { environment } from "../../hooks/environment";
import { AsignaturaContext } from "../../context/AsignaturaContext";

const Routine = () => {
  const { idAsignatura, setInfoRotes } = useContext(AsignaturaContext);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [assignments, setAssignments] = useState();
  const [cicles, setCicles] = useState();
  const [infoGrupos, setInfoGrupos] = useState();

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
  //crear rote
  const handleOpenRote = (infoRotes) => {

    setInfoRotes(infoRotes);

    setModalContent("CreateRote");
    setModalTitle("INFORMACIÓN DEL ROTE");
    setOpen(true);
  };
  //gestionar grupos
  const handleOpenGesGrupos = () => {
    setModalContent("ClassManageGroups");
    setModalTitle("GESTIONAR GRUPOS");
    setOpen(true);
  };
  //cerrar modal
  const handleClose = () => {
    setOpen(false);
  };
  //listar asignaturas
  useEffect(() => {
    const url = environment.url + `/api/ciclos/listar/?id_asignatura=${idAsignatura}`;
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
  //listar asignaciones
  useEffect(() => {
    async function fetchData() {
      const url = environment.url + `/api/asignaciones/listar/${idAsignatura}`;
      const response = await fetch(url);
      const json = await response.json();
      setAssignments(json.asignaciones);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function loadRegisteredGroups() {
      const responseGroups = await fetch(
        `http://132.226.60.71:8080/api/grupos/listar/${idAsignatura}`,
        {
          method: "GET",
        }
      );  
      const dataGroups = await responseGroups.json();
      setInfoGrupos(dataGroups);
    };
    loadRegisteredGroups();
  }, []);
  
  //listar asignaciones con grupos y ciclos asosiados
  const renderAssignments = () => {

    if (!assignments || !cicles || !infoGrupos) return <> Cargando </>;

    let schedulesRow = [];
    // TODO: indexGroup < 5 --> Se debe cambiar el 5 por la cantidad de elementos
    // de la lista de grupos que se trae con el endpoint del back
    // Ademas se debe cambiar en el primer if por grupos[indexGgroup].id
    // o segun corresponda el renombrado de las variables
    for (let indexGroup = 0; indexGroup < infoGrupos?.grupos?.length || 0; indexGroup++) {
      let schedulesColumn = [];
      for (let columnCicle = 0; columnCicle < cicles?.length; columnCicle++) {
        const resultado = assignments?.find(asignacion => (
          asignacion.id_grupo == +infoGrupos?.grupos[indexGroup]?.id && 
          asignacion.id_ciclo == +cicles[columnCicle].id
        ));

        if (resultado) {
          schedulesColumn.push(
          <td onClick={() => handleOpenRote(resultado)}>
            <div className={style.cardConten}>
              {resultado.docentes.map((docenteItem) => (
                <div key={docenteItem.id}>
                  <h2>{docenteItem.docente}</h2>
                  {docenteItem.modulos.map((moduloItem) => (
                    <div key={moduloItem.id}>
                      <p>{moduloItem.nombre}</p>
                      {moduloItem.horarios.map((horario) => (
                        <p key={horario.id}>{horario.descripcion}</p>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </td>);
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
      }
      schedulesRow.push(
        <tr>
          <td>
            <div className={style.cardgroup2}>
              <p /* onClick={handleOpenRote} */ className={style.cardgroup}>
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
              {cicles?.map((fecha, index) => (
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
