import React, { useState, useEffect, useContext } from "react";
import style from "./forms.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { environment } from "../../hooks/environment";
import Popup from "./Popup";
import { AsignaturaContext } from "../../context/AsignaturaContext";

function showAlert(message, type) {
  const alertContainer = document.getElementById("alertContainer");
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert");

  if (type === "success") {
    alertElement.classList.add("success");
  } else if (type === "error") {
    alertElement.classList.add("error");
  }

  alertElement.textContent = message;
  alertContainer.appendChild(alertElement);
  const timeout = 3000;
  setTimeout(() => {
    alertElement.remove();
  }, timeout);
}

export default function ({ id }) {
  const Icons = () => (
    <IconButton style={{ color: "red" }}>
      <DeleteIcon />
    </IconButton>
  );

  const resetForm = () => {
    const form = document.getElementById("myForm");
    setDay(""); // Establecer el valor del campo 'day' en vacío
    setHourI(""); // Establecer el valor del campo 'hourI' en vacío
    setHourF(""); // Establecer el valor del campo 'hourF' en vacío
    setSelectedEscenaryId(""); // Establecer el valor del campo 'selectedEscenaryId' en vacío
    setSelectedServiceId("");
  };

  const [horaries, setHoraries] = useState([]);
  const [nameActive, setNameActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [nameModules, setnameModules] = useState([]);
  const [escenary, setEscenary] = useState([]);
  const [service, setService] = useState([]);
  const [name, setName] = useState([]);
  const [selectedEscenaryId, setSelectedEscenaryId] = useState("");
  const handleEscenaryChange = (event) => {
    setSelectedEscenaryId(event.target.value);
  };
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [idModulo, setIdModulo] = useState("");
  const handleServiceChange = (event) => {
    setSelectedServiceId(event.target.value);
  };

  const saveName = (event) => {
    setName(event.target.value);
    let item = nameModules.filter(
      (modulo) => modulo.nombre_modulo == event.target.value
    );
    setIdModulo(item[0].id);
    setNameActive(true);
  };
  const [day, setDay] = useState([]);
  const saveDay = (event) => {
    setDay(event.target.value);
  };
  let [hourI, setHourI] = useState([]);
  const saveHourI = (event) => {
    setHourI(event.target.value);
  };
  let [hourF, setHourF] = useState([]);
  const saveHourF = (event) => {
    setHourF(event.target.value);
  };

  // visibilidad popup
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Eliminar horario
  const handleEliminar = (id) => {
    const url =  "http://132.226.60.71:8080/api/horarios/eliminar?id_horario=" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        setSuccessMessage("Horario eliminado con éxito");
        setShowPopup(true);
      })
      .catch((error) => {
        // Manejar errores de red u otros errores
      });
  };

  useEffect(() => {
    setAlertMessage("* Hay un horario sin configurar ");
    const url =
      `http://132.226.60.71:8080/api/modulos/sin_horarios?id_docente=${id}&id_asignatura=${idAsignatura}`;
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const simplifiedData = data.modulos_sin_horarios.map((modules) => {
          return {
            id: modules.id,
            nombre_modulo: modules.nombre_modulo,
          };
        });
        setnameModules(simplifiedData);
      });
  }, []);

  //
  useEffect(() => {
    const url = "http://132.226.60.71:8080/api/escenarios/listado";
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const simplifiedData = data.map((escenaries) => {
          return {
            id: escenaries.id,
            descripcion: escenaries.descripcion
          };
        });
        setEscenary(simplifiedData);
      });
  }, []);

  //
  const handleEscenary = () => {
    const url =
      environment.url + "/api/servicios/listado/" + selectedEscenaryId;
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const simplifiedData = data.servicios.map((services) => {
          return {
            id: services.id,
            descripcion: services.descripcion,
          };
        });
        setService(simplifiedData);
      });
  };
  //
  const [nameModule, setNameModule] = useState("");

  const handleInputNameChange = (event) => {
    setNameModule(event.target.value);
  };
  const { idAsignatura } = useContext(AsignaturaContext);

  const handleSubmitCreateName = (event) => {
    event.preventDefault();

    // Validar caracteres especiales y espacios en blanco
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const whitespace = /^\s+$/;

    // Verificar si el nombre del módulo contiene caracteres especiales o está en blanco
    if (specialChars.test(nameModule) || whitespace.test(nameModule)) {
      setSuccessMessage(
        "Error al Agregar revise espacios en blanco o caracteres especiales "
      );
      setShowPopup(true);
      setNameModule("");
      return; // Detener la ejecución de la función
    }

    const url =
      environment.url +
      `/api/modulos/crear/?id_docente=${id}&id_asignatura=${idAsignatura}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_modulo: nameModule,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Crear un nuevo objeto para el módulo agregado con el ID devuelto por la API
        const newModule = {
          id: data.id, // Utilizar el ID devuelto por la API
          nombre_modulo: nameModule,
        };

        // Actualizar el estado de nameModules con el nuevo módulo agregado
        setnameModules((prevModules) => [...prevModules, newModule]);

        setSuccessMessage("Nombre Agregado con Éxito");
        setShowPopup(true);
        setNameModule("");
      })
      .catch((error) => {
      });
  };

  //WALKER

  useEffect(() => {
    const fetchData = async () => {
      const url =
        // environment.url +
        `http://132.226.60.71:8080/api/horarios/listado?id_docente=${id}&id_asignatura=${idAsignatura}`;
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      const simplifiedData = data.modulos.map((modulo) => {
        const horarios = modulo.horarios.map((horario) => {
          // const [dia, hora] = horario.descripcion.split(" ");
          return {
            id: horario.id,
            descripcion: horario.descripcion.replace('\s', ''),
            // dia: dia,
            // hora: hora,
          };
        });
        return {
          id: modulo.id,
          nombre: modulo.nombre,
          horarios: horarios,
        };
      });
      setHoraries(simplifiedData);
    };
    fetchData().catch();
  }, []);

  const handleSubmitCreateHorary = (event) => {
    event.preventDefault();
    if (!day || !hourI || !hourF || !selectedEscenaryId || !selectedServiceId) {
      showAlert("Por favor completa todos los campos obligatorios", "error");
      return;
    }
    if (hourI >= hourF) {
      showAlert("La hora de inicio debe ser menor a la hora de finalizacion");
      return;
    }
    let [hours, minutes] = hourI.split(":");
    hourI = Number(hours);
    let [hoursf, minutesf] = hourF.split(":");
    hourF = Number(hoursf);
    const url =
      environment.url +
      `/api/horarios/configurar_horario?id_modulo=${idModulo}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dia: day,
        hora_inicio: hourI,
        hora_fin: hourF,
        id_escenario: selectedEscenaryId,
        id_servicio: selectedServiceId,
      }),
    })
      .then((response) => {
        setSuccessMessage("Horario Agregado con Exito");
        setShowPopup(true);
        // resetForm();

        // Actualizar la lista de horarios después de agregar uno nuevo
        const fetchData = async () => {
          const url =
            // environment.url +
            `http://132.226.60.71:8080/api/horarios/listado?id_docente=${id}&id_asignatura=${idAsignatura}`;
          const response = await fetch(url, { method: "GET" });
          const data = await response.json();
          // const simplifiedData = data.map((horary) => {
          //   return {
          //     codigoAsignatura: horary.codigoAsignatura,
          //     descripcionAsignatura: horary.descripcionAsignatura,
          //     nombreModulo: horary.nombreModulo,
          //     dia: horary.dia,
          //     horaInicio: horary.horaInicio,
          //     horaFin: horary.horaFin,
          //     nombreEscenario: horary.nombreEscenario,
          //     descripcionServicio: horary.descripcionServicio,
          //   }
          // })
          const simplifiedData = data.modulos.map((modulo) => {
            const horarios = modulo.horarios.map((horario) => {
              const [dia, hora] = horario.descripcion.split(" ");
              return {
                id: horario.id,
                descripcion: horario.descripcion,
                dia: dia,
                hora: hora,
              };
            });
            return {
              id: modulo.id,
              nombre: modulo.nombre,
              horarios: horarios,
            };
          });
          setHoraries(simplifiedData);
        };

        fetchData().catch();
      })
      .catch((error) => {
        showAlert("Error al agregar el horario", "error");
      });
  };
console.log(escenary)
  return (
    <div className={style.containerForm} id="alertContainer">
      <div className={style.formManage}>
        <form onSubmit={handleSubmitCreateName} id="myForm">
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
        <form onSubmit={handleSubmitCreateHorary}>
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
                <option>{item.nombre_modulo}</option>
              ))}
            </select>
            {alertMessage && (
              <span className={style.alertp}>{alertMessage}</span>
            )}
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
                <option>LUNES</option>
                <option>MARTES</option>
                <option>MIERCOLES</option>
                <option>JUEVES</option>
                <option>VIERNES</option>
                <option>SABADO</option>
              </select>
            </div>
            <div className={style.spaceHour}>
              <div className={style.positionHour}>
                <h5>
                  Hora de inicio <span className={style.fieldPriority}>*</span>
                </h5>
                <input onChange={saveHourI} value={hourI} type="time" />
              </div>
              <div className={style.positionHour}>
                <h5>
                  Hora de finalización
                  <span className={style.fieldPriority}>*</span>
                </h5>
                <input onChange={saveHourF} value={hourF} type="time" />
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
              <select
                onClick={handleEscenary}
                onChange={handleEscenaryChange}
                value={selectedEscenaryId}
              >
                <option value="">Seleccione un escenario</option>
                {escenary.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.buttonInlineBlock}>
              <h5>
                Servicio <span className={style.fieldPriority}>*</span>
              </h5>
              <select onChange={handleServiceChange} value={selectedServiceId}>
                <option>selecione un servicio</option>
                {service.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.descripcion}
                  </option>
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
            <span className={style.tableBody }>Nombre</span>
            <span className={style.tableBody }>Descripcion</span>
          </div>
          {horaries.map((item) => (
            <div className={style.row} key={item.id}>
              <span className={style.tableBody}>{item.nombre}</span>
              <span >
                {item.horarios.map((horario) => (
                  <div className={style.tableDescription}>
                    <p>{horario.descripcion}</p>
                    <IconButton onClick={() => handleEliminar(horario.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup message={successMessage} onClose={handleClosePopup} />
      )}
    </div>
  );
}
