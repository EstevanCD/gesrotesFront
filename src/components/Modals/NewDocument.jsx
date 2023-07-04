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
    const url = "http://132.226.60.71:8080/api/escenarios/listado";
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
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
    if (!saveFile || !fechaVigencia || !tipeDocument || !selectedEscenaryId) {
      // If any required data is missing, display an error message or perform appropriate actions
      setSuccessMessage("Existen Campos vacios por favor llena todo los Campos ");
        setShowPopup(true);
      return;
    }
    const url =
      "http://132.226.60.71:8080/api/documentos/guardar?id_escenario=" +
      selectedEscenaryId;
    const formData = new FormData();
    const auxvalue = {
      nombre: saveFile.name,
      tipoArchivo: saveFile.name.split('.').pop(),
      fechaVigencia: fechaVigencia.toISOString().substr(0, 10),
      tipoDeDocumento: tipeDocument,
    };
    formData.append("nombre", JSON.stringify(auxvalue));
    formData.append("file", saveFile);
    fetch(url, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    }).then((response) => {
      if (response.ok) {
        setSuccessMessage("Documento registrado con éxito");
        setShowPopup(true);
        return
      }
      throw error 
    })
      .catch((error) => {
        setSuccessMessage("HAY ERROR AL GUARDAR DOCUMENTO");
        setShowPopup(true);
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
                {item.descripcion}
              </option>
            ))}
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
