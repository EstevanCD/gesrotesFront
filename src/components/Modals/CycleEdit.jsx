import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { environment } from "../../hooks/environment";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import "./calendar.css";
import Popup from "./Popup";

export default function CycleEdit({ onClose, cycle }) {
  const fechaInicio = cycle?.inicio ? convertToValidDate(cycle?.inicio) : null;
  const fechaFin = cycle?.fin ? convertToValidDate(cycle?.fin) : null;
  const [fechaInicioEdit, setFechaInicioEdit] = useState(fechaInicio);
  const [fechaFinEdit, setFechaFinEdit] = useState(fechaFin);
  const spanishWeekdays = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const [alertMessage, setAlertMessage] = useState("");
  // visibilidad popup
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [alertCycle, setAlertCycle] = useState("");

  function convertToValidDate(dateString) {
    const [day, month, year] = dateString.split("-");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    formattedDate.setHours(
      formattedDate.getHours() + formattedDate.getTimezoneOffset() / 60
    );
    return new Date(formattedDate);
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    if (fechaInicioEdit === fechaInicio && fechaFinEdit === fechaFin) {
      setAlertMessage("* Seleccione la fecha de inicio y/o fin diferente");
    } else {
      const url = environment.url + `/api/ciclos/${cycle?.id}/editar`; //TODO:aqui agregar el endpoint para enviar la informacion para la creacion del ciclo
      const data = {
        inicio: fechaInicioEdit.toISOString(),
        fin: fechaFinEdit.toISOString(),
      };

      fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAlertMessage("* Ciclo editado exitosamente");
        })
        .catch((error) => {
        });
    }
  };

  const handleCancel = () => {
    setSuccessMessage("¿Esta seguro que desea eliminar el ciclo?");
    setShowPopup(true);
    setAlertCycle("cycleEdit")
    handleDelete() //eliminar ciclo
    setAlertMessage("* Ciclo eliminado exitosamente");
  };

  //eliminar ciclo
  const handleDelete = () => {
    const url = `http://localhost:8083/api/ciclos/${cycle?.id}/eliminar`; 
      fetch(url, {
        method: "DELETE"
      })
        .then((response) => response.json())
        .then((data) => {
          setAlertMessage("* Ciclo eliminado exitosamente");
        })
        .catch((error) => {
        });
  };
  
  return (
    <form className="formCreateCycle" onSubmit={handleSubmit}>
      <div className="containerDates">
        <div>
          <label htmlFor="fechaInicio">Fecha de inicio</label>
          <DatePicker
            id="fechaInicio"
            selected={fechaInicio}
            onChange={(date) => setFechaInicioEdit(date)}
            dateFormat="yyyy-MM-dd"
            locale={es}
            useWeekdaysShort={spanishWeekdays}
            inline
          />
        </div>
        <div>
          <label htmlFor="fechaFin">Fecha de finalización</label>
          <DatePicker
            id="fechaFin"
            selected={fechaFin}
            onChange={(date) => setFechaFinEdit(date)}
            dateFormat="yyyy-MM-dd"
            locale={es}
            useWeekdaysShort={spanishWeekdays}
            inline
          />
        </div>
        {alertMessage && <span className="alert">{alertMessage}</span>}
      </div>

      <center>
        <button
          className="saveButton"
          type="submit"
          disabled={
            fechaInicioEdit === fechaInicio && fechaFinEdit === fechaFin
          }
        >
          GUARDAR
        </button>
        <button className="cancelButton" onClick={handleCancel}>
          ELIMINAR
        </button>
      </center>
      {showPopup && (
        <Popup message={successMessage} onClose={handleClosePopup} component={alertCycle} />
      )}
    </form>
  );
}
