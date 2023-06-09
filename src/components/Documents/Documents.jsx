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

function Documents() {
  const [documentos, setDocumentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const url = environment.url + "/api/documentos/listado?id_escenario=1";
  const [filterOption, setFilterOption] = useState("Todos");
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setDocumentos(data.documentos))
      .catch((error) => console.error(error));
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
  const [alert, setAlert] = useState([1]);

  const handleDownload = async (idDocumento) => {
    // Lógica para obtener los bytes del PDF y crear el Blob
    try {
      const responseDocument = await fetch(
        `http://132.226.60.71:8080/api/documentos/descargar?id_documento=${idDocumento}`,
        {
          method: "GET",
        }
      );
      if (responseDocument.status != 400) {
        console.log(alert)
        const dataDocument = await responseDocument.arrayBuffer();
        const blob = new Blob([dataDocument], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
      }

      if (responseDocument.status == 400) {
        console.log("NO HAY DOCUMENTOS")
        setAlert([]);
        console.log(alert)
      }

    } catch (error) {
      console.log(error)
    }
  };


  const handleEdit = (documento) => {
    setDocumentData(documento);
    handleOpenEditDocument();

    //todo llamar modal y pasarle prop (documento)
  };

  const handleDelete = (documento) => {
    //codigo para eliminar el documento
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
              <li key={documento.id_documento}>
                <div className={style.nameDoc}>
                  {getIconByExtension(documento.extension)}
                  {documento.nombre_archivo}
                </div>
                <div className={style.dateDoc}>{formatDate(documento.fecha_vigencia)}</div>
                <div className={style.buttonsDoc}>
                  <button onClick={() => handleDownload(documento.id_documento)}>
                    <ArrowCircleDownRoundedIcon style={{ fontSize: "30px", color: "#0a2167" }} />
                  </button>
                  <button onClick={() => handleEdit(documento)}>
                    <EditIcon style={{ fontSize: "30px", color: "#0a2167" }} />
                  </button>
                  <button onClick={() => handleDelete(documento)}>
                    <DeleteForeverIcon style={{ fontSize: "30px", color: "#980c0f" }} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div className={style.noFound}>
              <BlockIcon />
              <p>NO FOUND</p>
            </div>
          )}
          {alert.length == 0 ?
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
