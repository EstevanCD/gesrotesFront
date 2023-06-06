import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { environment } from "../../hooks/environment";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import style from "./document.module.css";
import { json } from "react-router-dom";
import Popup from "./Popup"

export default function NewDocument({ onClose }) {
  // funciones para el control de arhivo
  const [selectedFile, setSelectedFile] = useState(null);
  const [saveFile, setSaveFile] = useState(null);

  // visibilidad popup
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSaveFile(file);

    fileToBase64(file, setSelectedFile);
  };

  const fileToBase64 = (file, callback) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      var base64String = event.target.result.split(",")[1]; // Obtener contenido Base64 sin encabezado
      callback(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSaveFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      const documentText = e.target.result;
      setSelectedFile(documentText);
    };

    reader.readAsText(file);
    console.log("DOCUMENTOS ", file, reader);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const [tipeDocument, setTipeDocument] = useState([]);
  const saveTipoDocument = (event) => {
    setTipeDocument(event.target.value);
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

  const handleClosePopup = () => {
    setSelectedFile(null);
    setSaveFile(null);
    setTipeDocument("");
    setSelectedEscenaryId("");
    setFechaVigencia(null);
    setAlertMessage("");
    setShowPopup(false);
  };

  // validar que todos los campos esten llenos o almenos escogido el selectedEscenaryId
  const handleSubmitCreateDocument = (event) => {
    event.preventDefault();
    const url =
      environment.url +
      "/api/documentos/guardar?id_escenario=" +
      selectedEscenaryId;
    console.log(
      "ESTOS DATOS SON POST ",
      typeof tipeDocument,
      fechaVigencia.toISOString().substr(0, 10),
      typeof selectedEscenaryId,
      typeof saveFile.name,
      typeof saveFile.type,
      typeof selectedFile
    );
    const formData = new FormData();
    const auxvalue = {
      nombre: saveFile.name,
      tipoArchivo: saveFile.type,
      fechaVigencia: fechaVigencia.toISOString().substr(0, 10),
      tipoDeDocumento: tipeDocument,
    };
    console.log(auxvalue);
    formData.append("nombre", JSON.stringify(auxvalue));
    formData.append("file", saveFile);
    fetch(url, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    })
      .then((response) => {
        console.log(response);
        setSuccessMessage("Documento registrado con éxito");
        setShowPopup(true);
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
    <form onSubmit={handleSubmitCreateDocument} id="myForm">
      <div className={style.selectContainer}>
        <div className={style.selectWrapper}>
          <h4>
            <span className={style.numberRounded}>1</span>PASO 1: Seleccionar
            Tipo de Documento
          </h4>
          <h5>
            Tipo de documento <span className={style.fieldPriority}>*</span>
          </h5>
          <select
            className={style.customSelect}
            onChange={saveTipoDocument}
            value={tipeDocument}
          >
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
      {showPopup && (
        <Popup message={successMessage} onClose={handleClosePopup} />
      )}
    </form>
  );
}
