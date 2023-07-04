import React, { useEffect, useState } from "react";
import { environment } from "../../hooks/environment";
import style from "./Documents.module.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import BlockIcon from "@material-ui/icons/Block";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modals from "../Modals/Modals";
import { Alert } from "@mui/material";
import AlertWindow from "./AlertaEmergente";
import { Button, CircularProgress } from '@mui/material';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { useParams } from "react-router-dom";

function Documents({ scenarioId }) {
  const [documentos, setDocumentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const url = environment.url + `/api/documentos/listado?id_escenario=${scenarioId}`;
  const [filterOption, setFilterOption] = useState("Todos");
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [descargando, setDescargando] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setDocumentos(data.documentos))
      .catch((error) => {
        
      });
  }, []);

  
  let documents = [];

  switch (filterOption) {
    case "Expirados":
      documents = documentos.filter((documento) => {
        const currentDate = new Date();
        const documentDate = new Date(documento.fecha_vigencia);
        return documentDate < currentDate;
      });
      break;
    case "No Expirados":
      documents = documentos.filter((documento) => {
        const currentDate = new Date();
        const documentDate = new Date(documento.fecha_vigencia);
        return documentDate >= currentDate;
      });
      break;
    default:
      documents = documentos;
      break;
  }

  
  const filteredDocuments = documents.filter((documento) =>
    documento.nombre_archivo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const currentDate = new Date();
    const formattedDate = `${year}-${month}-${day}`;

    if (date > currentDate) {
      return `Expira: ${formattedDate}`;
    } else if (date < currentDate) {
      return `Expirado: ${formattedDate}`;
    } else {
      return `Fecha vigente: ${formattedDate}`;
    }
  };

  const getIconByExtension = (extension) => {
    switch (extension) {
      case "pdf":
        return (
          <FontAwesomeIcon
            style={{ color: "#980c0f", fontSize: "30px", paddingRight: "1ch", paddingLeft: "1ch" }}
            icon={faFilePdf}
          />
        );
      case "doc":
      case "docx":
        return (
          <FontAwesomeIcon
            style={{ color: "#0a2167", fontSize: "30px", paddingRight: "1ch", paddingLeft: "1ch" }}
            icon={faFileWord}
          />
        );
      case "xls":
      case "xlsx":
        return (
          <FontAwesomeIcon
            style={{ color: "#007a29", fontSize: "30px", paddingRight: "1ch", paddingLeft: "1ch" }}
            icon={faFileExcel}
          />
        );
      default:
        return null;
    }
  };
  //LOGICA PARA DESCARGAR UN DOCUMENTO
  const [alert, setAlert] = useState([]);

  const handleDownload = async (idDocumento, extension) => {

    // Lógica para obtener los bytes del PDF y crear el Blob
    try {
      const responseDocument = await fetch(
        `http://132.226.60.71:8080/api/documentos/descargar?id_documento=${idDocumento}`,
        {
          method: "GET",
        }
      );
      if (responseDocument.status != 400 && extension != undefined) {
        const dataDocument = await responseDocument.arrayBuffer();
        const blob = new Blob([dataDocument], { type: `application/${extension}` });
        const url = URL.createObjectURL(blob);
        //window.open(url);
        const a = document.createElement('a');
        a.href = url;
        a.download = `documento.${extension}`;
        a.click();
        URL.revokeObjectURL(url);
      }

      if (responseDocument.status == 400) {
        setAlert(responseDocument.status);
        handleOpenAlert();
      }
      if (extension == undefined) {
      }

    } catch (error) {
    }
  };

  const handleEdit = (documento) => {
    setDocumentData(documento);
    handleOpenEditDocument();

    //todo llamar modal y pasarle prop (documento)
  };

  //FUNCION PARA ELIMINAR DOCUMENTOS
  const [openEliminar, setOpenEliminar] = useState(false);
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);

  const handleDelete = async (idDocumento) => {
    try {
      if (documentoSeleccionado) {
        const responseDocument = await fetch(
          `http://132.226.60.71:8080/api/documentos/eliminar/?id_documento=${documentoSeleccionado}`,
          {
            method: "DELETE",
          }
        );

        if (responseDocument.status != 500) {

          setDocumentos(documents.filter(documents => documents.id_documento != documentoSeleccionado))
        }

        if (responseDocument.status == 500) {

          setAlert(responseDocument.status);

          handleOpenAlert();
        }
        setOpenEliminar(false);
      }
    } catch (error) {
    }
  };

  const handleClickOpen = (documento) => {
    setDocumentoSeleccionado(documento);
    setOpenEliminar(true);
  };

  const handleCloseEliminar = () => {
    setOpenEliminar(false);
  };

  const handleOpenDocument = () => {
    setModalContent("NewDocument");
    setModalTitle("Agregar Documento");
    setOpen(true);
  };

  const handleOpenEditDocument = () => {
    setModalContent("EditDocument");
    setModalTitle("Editar Documento");
    setOpen(true);
    if (open == false){
      fetch(url)
      .then((response) => response.json())
      .then((data) => setDocumentos(data.documentos))
      .catch((error) => {
        
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [documentData, setDocumentData] = useState("hola");

  return (
    <div className={style.containerDocuments}>
      <Modals
        open={open}
        handleClose={handleClose}
        modalContent={modalContent}
        title={modalTitle}
        documentData={documentData}
      />
      <div className={style.containerSearchBar}>
        <div className={style.buttonNewDocument}>
          <button className={style.buttonND} onClick={handleOpenDocument}>
            {" "}
            <i>
              <AddIcon style={{ fontSize: "15px" }} />
            </i>{" "}
            Nuevo Documento
          </button>
        </div>
        <div className={style.searchBar}>
          <div className={style.search}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar documentos hospital"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
        <div className={style.filterDoc}>
          {" "}
          {/* filtro */}
          <p>Filtrar por:</p>
          <select
            className={style.filterSelect}
            value={filterOption}
            onChange={(event) => setFilterOption(event.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Expirados">Expirados</option>
            <option value="No Expirados">No Expirados</option>
          </select>
        </div>
      </div>
      <div className={style.containerListDocs}>
        <ul>
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((documento) => (
              <li className={style.list} key={documento.id_documento}>
                <div className={style.nameDoc}>
                  {getIconByExtension(documento.extension)}
                  {documento.nombre_archivo}
                </div>
                <div className={style.dateDoc}>{formatDate(documento.fecha_vigencia)}</div>
                <div className={style.buttonsDoc}>
                  <button disabled={descargando} onClick={() => { handleDownload(documento.id_documento, documento.extension) }}>
                    <ArrowCircleDownRoundedIcon style={{ fontSize: "30px", color: "#0a2167" }} />
                  </button>
                  <button onClick={() => handleEdit(documento)}>
                    <EditIcon style={{ fontSize: "30px", color: "#0a2167" }} />
                  </button>
                  <button onClick={() => handleClickOpen(documento.id_documento)}>
                    <DeleteForeverIcon style={{ fontSize: "30px", color: "#980c0f" }} />
                  </button>
                  <Dialog open={openEliminar} onClose={handleCloseEliminar}
                    BackdropProps={{
                      style: {
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(5px)',
                      },
                    }}>
                    <DialogTitle>Confirmar eliminación</DialogTitle>
                    <DialogContent>
                      <p>¿Estás seguro de que deseas eliminar este documento?</p>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseEliminar} color="primary">
                        Cancelar
                      </Button>
                      <Button onClick={() => handleDelete(documento.id_documento)} color="primary">
                        Eliminar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </li>
            ))
          ) : (
            <div className={style.noFound}>
              <BlockIcon />
              <p>NO FOUND</p>
            </div>
          )}
          {alert == 400 ?
            <>
              <AlertWindow></AlertWindow>
            </>
            : <></>
          }
        </ul>
      </div>
    </div>
  );
}
export default Documents;
