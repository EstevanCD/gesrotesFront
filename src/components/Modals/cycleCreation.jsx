import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { environment } from "../../hooks/environment";
import { es } from "date-fns/locale";
import "./calendar.css";

export default function CycleCreation({ onClose }) {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const spanishWeekdays = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fechaInicio && !fechaFin) {
      setAlertMessage('* Seleccione la fecha de inicio y/o fin');
    } else if (!fechaInicio) {
      setAlertMessage('* Seleccione la fecha de inicio');
    } else if (!fechaFin) {
      setAlertMessage('* Seleccione la fecha de fin');
    } else {
      const url = environment.url + "/api/ciclos/crear/"+ "MAT101"; //aqui agregar el endpoint para enviar la informacion para la creacion del ciclo
      const data = {
        inicio: fechaInicio.toISOString().substr(0, 10),
        fin: fechaFin.toISOString().substr(0, 10),
      };

      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAlertMessage('* Ciclo creado exitosamente');
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <form className="formCreateCycle" onSubmit={handleSubmit}>
      <div className="containerDates">
        <div>
          <label htmlFor="fechaInicio">Fecha de inicio</label>
          <DatePicker
            id="fechaInicio"
            selected={fechaInicio}
            onChange={(date) => setFechaInicio(date)}
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
            onChange={(date) => setFechaFin(date)}
            dateFormat="yyyy-MM-dd"
            locale={es}
            useWeekdaysShort={spanishWeekdays}
            inline
          />
        </div>
        {alertMessage && <span className="alert">{alertMessage}</span>}
      </div>
      
      <center>
        <button className="cancelButton" onClick={handleCancel}>
          CANCELAR
        </button>
        <button className="saveButton" type="submit">
          CREAR CICLO
        </button>
      </center>
    </form>
  );
}
