import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { environment } from "../../hooks/environment";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import style from "./document.module.css";

export default function NewDocument({ onClose }) {
  // funciones para el control de arhivo
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      const documentText = e.target.result;
      setSelectedFile(documentText);
    };

    reader.readAsText(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  //
  const [selectedEscenaryId, setSelectedEscenaryId] = useState("");
  const [escenary, setEscenary] = useState([]);
  // metodo get trae escenarios
  useEffect(() => {
    const url = environment.url + "/api/escenarios/listado";
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
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

  //
  const handleEscenaryChange = (event) => {
    setSelectedEscenaryId(event.target.value);
  };

  const [fechaVigencia, setFechaVigencia] = useState(null);
  const spanishWeekdays = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmitCreateDocument = (event) => {
    event.preventDefault();
    const url = environment.url +"/api/documentos/guardar" +"1" ;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "documentoRequest": {
          "nombre": "string",
          "tipoArchivo": "string",
          "fechaVigencia": "string",
          "tipoDeDocumento": "string"
        },
        "file": "string"
      }),
    })
      .then((response) => {
        console.log(response);
        // Hacer algo con la respuesta, como mostrar un mensaje de éxito
      })
      .catch((error) => {
        console.error(error);
        // Mostrar un mensaje de error
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmitCreateDocument} id="myForm" >
      <div className={style.selectContainer}>
        <div className={style.selectWrapper}>
          <h4>
            <span className={style.numberRounded}>1</span>PASO 1: Seleccionar
            Tipo de Documento
          </h4>
          <h5>
            Tipo de documento <span className={style.fieldPriority}>*</span>
          </h5>
          <select className={style.customSelect}>
            <option>Seleccione Documento</option>
            <option>Plan de Prácticas</option>
            <option>Plan de Prácticas 2</option>
            <option>Plan de Prácticas 3</option>
          </select>
        </div>
        <div className={style.selectWrapper}>
          <h4>
            <span className={style.numberRounded}>2</span>PASO 2: Selecione el
            escenario de practicas
          </h4>
          <h5>
            Escenario de practicas{" "}
            <span className={style.fieldPriority}>*</span>
          </h5>
          <select
            className={style.customSelect}
            onChange={handleEscenaryChange}
            value={selectedEscenaryId}
          >
            <option value="">Seleccione un escenario</option>
            {escenary.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre}
              </option>
            ))}
            {console.log(selectedEscenaryId, "TRAE ESTO ID")}
          </select>
        </div>
      </div>

      <div className={style.selectContainer}>
        <div className={style.selectWrapper}>
          <h4>
            <span className={style.numberRounded}>3</span>PASO 3: Seleccionar
            Fecha de Vigencia
          </h4>
          <label htmlFor="fechaInicio"></label>
          <DatePicker
            id="fechaInicio"
            selected={fechaVigencia}
            onChange={(date) => setFechaVigencia(date)}
            dateFormat="yyyy-MM-dd"
            locale={es}
            useWeekdaysShort={spanishWeekdays}
            inline
          />
        </div>
        <div className={style.selectWrapper}>
          <h4>
            <span className={style.numberRounded}>4</span>PASO 4: Subir
            Documento
          </h4>
          <div className={style.fileUploadContainer}>
            {selectedFile ? (
              <p>Archivo seleccionado: {selectedFile.name}</p>
            ) : (
              <div>
                <p>Arrastre el archivo aquí o haga clic para seleccionarlo.</p>
              </div>
            )}
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />
          </div>
        </div>
      </div>

      {alertMessage && <span className="alert">{alertMessage}</span>}

      <center>
        <button className={style.buttonStyle} type="submit">
          Registrar Documento
        </button>
      </center>
    </form>
  );
}
