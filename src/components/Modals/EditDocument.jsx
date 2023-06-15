import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { environment } from "../../hooks/environment";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import style from "./document.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";


import { json } from "react-router-dom";
import { BorderColor } from "@material-ui/icons";
import { Button } from "@material-ui/core";


import { styled } from "@mui/material/styles";

export default function NewDocument({ onClose, documentData }) {
  console.log("EDITAR DOCUMENTO");
  console.log(documentData);

  // funciones para el control de arhivo
  const [selectedFile, setSelectedFile] = useState(""); //bandera para saber si hay archivo
  const [saveFile, setSaveFile] = useState(null);

  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch( `http://132.226.60.71:8080/api/documentos/descargar?id_documento= ${documentData.id_documento}`);
      if (response.status == 400) {
        console.log("incorrecto------");
      }else{  
        console.log("DOCUMENTO-------");
        console.log(response);
        setSelectedFile("ban");
      }
    }
    fetchData();
  }, []);



  const [selectedEscenaryId, setSelectedEscenaryId] = useState("");
  const [escenary, setEscenary] = useState([]);
 
  // METODO get trae escenarios
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

  /*   const doc = {
    id_documento: 2,
    id_archivo: 2,
    id_escenario: 2,
    nombre_archivo: "documento2",
    fecha_vigencia: "2030-05-08T05:00:00.000+00:00",
    tipo_documento: "Plan de practicas",
    extension: "pdf",
  };
 */
  /*   with useEfect with an empty array will only run when starting the component [] */

  const [auxEscenary, setauxEscenary] = useState(""); 
  useEffect(() => {
    setFechaVigencia(new Date(documentData.fecha_vigencia));
    if (escenary.length > 0) {
      setauxEscenary(escenary[documentData.id_escenario]);
    }
  }, [escenary]);

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

  const handleEscenaryChange = (event) => {
    setSelectedEscenaryId(event.target.value);
  };

  const [fechaVigencia, setFechaVigencia] = useState(null);
  const spanishWeekdays = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const [alertMessage, setAlertMessage] = useState("");
  // validar que todos los campos esten llenos o almenos escogido el selectedEscenaryId
  const handleSubmitCreateDocument = (event) => {

    /*obtener los datos a actualizar  */
    event.preventDefault();

    const url =
      environment.url + "/api/documentos/guardar?id_escenario=" + selectedEscenaryId; //cambiar   

    const formData = new FormData();
    const auxvalue = {
      nombre: saveFile.name,
      tipoArchivo: saveFile.type,
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

  
  const StyledButtonAdd = styled(Button)({
    display: 'inline-block',
    color: "white",
    backgroundColor: "#0a2167",
    border: "1px solid blue", // Agregar un borde rojo
    fontWeight: 'bold',
    fontSize: "11px",
    borderRadius: '20px',
    height: '30px',
    width: 'auto',
    "&:hover": {
      backgroundColor: "#1c45c0",
      borderSize: "1px solid Red"
    },
  });

  const handleDeleteDocument = () => {
    setSelectedFile("");  
  }

  //Cargar el icono para el documento
  const getIconByExtension = (extension) => {
    switch (extension) {
      case "pdf":
        return (
          <FontAwesomeIcon
            style={{ color: "#980c0f", fontSize: "30px" }}
            icon={faFilePdf}
          />
        );
      case "doc":
      case "docx":
        return (
          <FontAwesomeIcon
            style={{ color: "#0a2167", fontSize: "30px" }}
            icon={faFileWord}
          />
        );
      case "xls":
      case "xlsx":
        return (
          <FontAwesomeIcon
            style={{ color: "#007a29", fontSize: "30px" }}
            icon={faFileExcel}
          />
        );
      default:
        return null;
    }
  };
  
  
  return (
    <form onSubmit={handleSubmitCreateDocument} id="myForm">
      <div className={style.selectContainer}>
        <div className={style.selectWrapper}>
          <h4>
            {" "}
            <span className={style.numberRounded}>1</span>PASO 1: Seleccionar
            Tipo de Documento{" "}
          </h4>
          <h5>
            {" "}
            Tipo de documento <span className={style.fieldPriority}>
              *
            </span>{" "}
          </h5>
          <select
            className={style.customSelect}
            onChange={saveTipoDocument}
            value={tipeDocument}
          >
            <option hidden defaultValue> {documentData.tipo_documento}</option>
            <option>Plan de Prácticas</option>
            <option>Plan de Prácticas 2</option>
            <option>Plan de Prácticas 3</option>
          </select>
        </div>
        <div className={style.selectWrapper}>
          <h4>
            <span className={style.numberRounded}>2</span> PASO 2: Selecione el escenario de practicas{" "}
          </h4>
          <h5>
            {" "}
            Escenario de practicas{" "}
            <span className={style.fieldPriority}>*</span>
          </h5>
          <select
            className={style.customSelect}
            onChange={handleEscenaryChange}
            value={selectedEscenaryId}
          >
            {/*    <option hidden defaultValue> {selectedEscenari} </option>  */}
            <option value="2">{auxEscenary.nombre}</option>
            {escenary.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre}
              </option>
            ))}
            {/* {console.log(selectedEscenaryId, "TRAE ESTO ID")} */}
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

        {/* EDITAR documento */}
        <div className={style.selectWrapper}>
          <h4>
            {" "}
            <span className={style.numberRounded}>4</span>PASO 4: Subir Documento{" "} </h4>
        
          {selectedFile ? ( 
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '14%',
              width: '100%',
              borderRadius: '15px',
              padding: '10px',
              border: '1px solid #0a2168',
            }}>
              {getIconByExtension(documentData.extension)}
              <h5 style={{ marginRight: '10px' }}>{documentData.nombre_archivo}</h5>
              
              <Button onClick={handleDeleteDocument}>X</Button>
            </div>   
          )   : 
          
          (<div className={style.fileUploadContainer}>
            <p>Archivo seleccionado: {selectedFile.name}</p>   
          <div>
              {/* {getIconByExtension(documentData.extension)} */}
              <p>Arrastre el archivo aquí o haga clic para seleccionarlo.</p> </div> 

            <input type="file" id="fileInput"  onChange={handleFileChange}  
          onDrop={handleDrop}
            onDragOver={handleDragOver}/>         
        </div>) }   

        </div>
      </div>

      {alertMessage && <span className="alert">{alertMessage}</span>}

      <center>
        <StyledButtonAdd  type="submit">
          Actualizar Documento
        </StyledButtonAdd>
      </center>
    </form>
  );
}
