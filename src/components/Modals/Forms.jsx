import React, { useState, useEffect } from "react";
import style from "./forms.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { environment } from "../../hooks/environment";

export default function () {
  const Icons = () => (
    <IconButton style={{ color: "red" }}>
      <DeleteIcon />
    </IconButton>
  );

  const data = [
    {
      name: "Horario 01 SJ",
      day: "Lunes",
      hour: "3 pm - 5 pm",
      escenary: "Hospital sanjose E.S.E",
      service: "Salud Mental",
      eliminate: <DeleteIcon />,
    },
    {
      name: "Horario 01 SJ",
      day: "Lunes",
      hour: "3 pm - 5 pm",
      escenary: "Hospital sanjose E.S.E",
      service: "Salud Mental",
      eliminate: <DeleteIcon />,
    },
    {
      name: "Horario 01 SJ",
      day: "Lunes",
      hour: "3 pm - 5 pm",
      escenary: "Hospital sanjose E.S.E",
      service: "Salud Mental",
      eliminate: <DeleteIcon />,
    },
    {
      name: "Horario 01 SJ",
      day: "Lunes",
      hour: "3 pm - 5 pm",
      escenary: "Hospital sanjose E.S.E",
      service: "Salud Mental",
      eliminate: <DeleteIcon />,
    },
    {
      name: "Horario 01 SJ",
      day: "Lunes",
      hour: "3 pm - 5 pm",
      escenary: "Hospital sanjose E.S.E",
      service: "Salud Mental",
      eliminate: <DeleteIcon />,
    },
    {
      name: "Horario 01 SJ",
      day: "Lunes",
      hour: "3 pm - 5 pm",
      escenary: "Hospital sanjose E.S.E",
      service: "Salud Mental",
      eliminate: <DeleteIcon />,
    },
  ];
  const [nameModules, setnameModules] = useState([]);
  const [escenary, setEscenary] = useState([]);
  const [service, setService] = useState([]);
  const [name, setName] = useState([]);
  const [nameEscenary, setNameEscenary] = useState([]);
  const [idEscenary, setIdEscenary] = useState([]);
  const saveName = (event) => {
    setName(event.target.value);
  };
  const saveEscenary = (event) => {
    setNameEscenary(event.target.value);
  };

  const [day, setDay] = useState([]);
  const saveDay = (event) => {
    setDay(event.target.value);
  };
  const [hourI, setHourI] = useState([]);
  const saveHourI = (event) => {
    setHourI(event.target.value);
  };
  const [hourF, setHourF] = useState([]);
  const saveHourF = (event) => {
    setHourF(event.target.value);
  };

  useEffect(() => {
    const url =
      environment.url +
      "/api/modulos/sin_horarios?id_docente=1&id_asignatura=1";
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const simplifiedData = data.modulos_sin_horarios.map((modules) => {
          return {
            id: modules.id,
            nombre: modules.nombre,
          };
        });
        setnameModules(simplifiedData);
      });
  }, []);

  //
  useEffect(() => {
    const url = environment.url + "/api/escenarios/listado";
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "ESTO TRAE");
        const simplifiedData = data.map((escenaries) => {
          return {
            id: escenaries.id,
            nombre: escenaries.nombre,
            direccion: escenaries.direccion,
          };
        });
        setEscenary(simplifiedData);
      });
  }, []);

  //
  useEffect(() => {
    const url = environment.url + "/api/servicios/listado/" +idEscenary;
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data,"SERVICIOS",idEscenary);
        const simplifiedData = data.servicios.map((services) => {
          return {
            id: services.id,
            descripcion: services.descripcion,
          };
        });
        setService(simplifiedData);
      });
  }, []);
  //
  const [nameModule, setNameModule] = useState("");

  const handleInputNameChange = (event) => {
    setNameModule(event.target.value);
  };

  const handleSubmitCreateName = (event) => {
    event.preventDefault();
    const url = environment.url + "/api/modulos/crear/" + "1" + "/" + "1";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_modulo: nameModule,
      }),
    })
      .then((response) => {
        console.log(response);
        // Hacer algo con la respuesta, como mostrar un mensaje de éxito
        setNameModule("");
      })
      .catch((error) => {
        console.error(error);
        // Mostrar un mensaje de error
      });
  };

  return (
    <div className={style.containerForm}>
      <div className={style.formManage}>
        <form onSubmit={handleSubmitCreateName}>
          <div className={style.createName}>
            <h4> Crear nombre del horario (Rote)</h4>
            <div>
              <input
                type="text"
                placeholder="Ingrese el nombre del horario"
                value={nameModule}
                onChange={handleInputNameChange}
              />
              <button className={style.buttonStyle}>AGREGAR NOMBRE</button>
            </div>
          </div>
        </form>
      </div>
      <div className={style.formConfig}>
        <h3>CONFIGURACIÓN DEL HORARIO</h3>
        <form>
          <div className={style.stepContainer + " " + style.step}>
            <h4>
              <span className={style.numberRounded}>1</span>PASO 1: Selecionar
              nombre del horario
            </h4>
            <h5>
              Nombre el horario <span className={style.fieldPriority}>*</span>
            </h5>
            <select onChange={saveName} value={name}>
              <option>Seleccione el nombre del horario</option>
              {nameModules.map((item, index) => (
                <option>{item.nombre}</option>
              ))}
            </select>
          </div>
          <div className={style.stepContainer}>
            <h4>
              <span className={style.numberRounded}>2</span>PASO 2: Selecion de
              dia y hora
            </h4>
            <div className={style.spaceDay}>
              <h5>
                Dia <span className={style.fieldPriority}>*</span>
              </h5>
              <select onChange={saveDay} value={day}>
                <option>Seleccione un día</option>
                <option>Lunes</option>
                <option>Martes</option>
                <option>Miercoles</option>
                <option>Jueves</option>
                <option>Viernes</option>
              </select>
            </div>
            <div className={style.spaceHour}>
              <div className={style.positionHour}>
                <h5>
                  Hora de inicio <span className={style.fieldPriority}>*</span>
                </h5>
                <input
                  onChange={saveHourI}
                  value={hourI}
                  type="time"
                  placeholder="-- : -- "
                />
              </div>
              <div className={style.positionHour}>
                <h5>
                  Hora de finalización
                  <span className={style.fieldPriority}>*</span>
                </h5>
                <input
                  onChange={saveHourF}
                  value={hourF}
                  type="time"
                  placeholder="-- : --"
                />
              </div>
            </div>
          </div>
          <div className={style.stepContainer + " " + style.step}>
            <h4>
              <span className={style.numberRounded}>3</span>PASO 3: Selecion de
              escenario y servicio
            </h4>
            <div>
              <h5>
                Escenario <span className={style.fieldPriority}>*</span>
              </h5>
              <select onChange={saveEscenary} value={nameEscenary}>
                <option>selecione un escenario</option>
                {escenary.map((item, index) => (
                  <option>{item.nombre}</option>
                 
                ))}
              </select>
            </div>
            <div className={style.buttonInlineBlock}>
              <h5>
                Servicio <span className={style.fieldPriority}>*</span>
              </h5>
              <select>
                <option>selecione un servicio</option>
                {service.map((item, index) => (
                  <option>{item.descripcion}</option>
                ))}
              </select>
            </div>
            <button
              className={style.buttonStyle + " " + style.buttonInlineBlock}
              style={{ marginLeft: "20px" }}
            >
              Agregar Horario
            </button>
          </div>
        </form>
      </div>
      <div>
        <h3>LISTA DE HORARIOS CREADOS</h3>
        <div className={style.tableContainer}>
          <div className={style.tableTittle}>
            <span className={style.tableBody + " " + style.tittle}>Nombre</span>
            <span className={style.tableBody + " " + style.tittle}>Dia</span>
            <span className={style.tableBody + " " + style.tittle}>Hora</span>
            <span className={style.tableBody + " " + style.tittle}>
              Escenario
            </span>
            <span className={style.tableBody + " " + style.tittle}>
              Servicio
            </span>
            <span className={style.tableBody}>Eliminar</span>
          </div>
          {data.map((item) => (
            <div className={style.row} key={item.id}>
              <span className={style.tableBody}>{item.name}</span>
              <span className={style.tableBody}>{item.day}</span>
              <span className={style.tableBody}>{item.hour}</span>
              <span className={style.tableBody}>{item.escenary}</span>
              <span className={style.tableBody}>{item.service}</span>
              <span className={style.tableBody}>{item.eliminate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
