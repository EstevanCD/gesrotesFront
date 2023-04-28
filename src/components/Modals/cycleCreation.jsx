import React, { useState } from "react";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import "./calendar.css";
import "react-datepicker/dist/react-datepicker.css";

export default function () {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleGuardarClick = () => {
    console.log(`Fecha inicio: ${fechaInicio}, Fecha fin: ${fechaFin}`);
  };

  return (
    <div className="containerDates">
      <div>
        <label htmlFor="fechaInicio">Fecha inicio:</label>
        <DatePicker
          id="fechaInicio"
          selected={fechaInicio}
          locale={es}
          onChange={(date) => setFechaInicio(date)}
          dateFormat="dd/MM/yyyy"
          inline
        />
      </div>
      <div>
        <label htmlFor="fechaFin">Fecha fin:</label>
        <DatePicker
          id="fechaFin"
          selected={fechaFin}
          locale={es}
          onChange={(date) => setFechaFin(date)}
          dateFormat="dd/MM/yyyy"
          inline
        />
      </div>
      <button onClick={handleGuardarClick}>Guardar</button>
    </div>
  );
}
