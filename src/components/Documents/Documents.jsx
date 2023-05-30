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
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Modals from "../Modals/Modals";

function Documents() {
  const [documentos, setDocumentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const url = environment.url + "/api/documentos/listado?id_escenario=2";
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

  const handleDownload = (documento) => {
    //codigo para descargar el documento
  };

  const handleEdit = (documento) => {
    //codigo para editar el documento
  };

  const handleDelete = (documento) => {
    //codigo para eliminar el documento
  };

  const handleOpenDocument = () => {
    setModalContent("NewDocument");
    setModalTitle("Agregar Documento");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={style.containerDocuments}>
      <Modals
        open={open}
        handleClose={handleClose}
        modalContent={modalContent}
        title={modalTitle}
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
                <div>
                  {getIconByExtension(documento.extension)}
                  {documento.nombre_archivo}
                </div>
                <div>{formatDate(documento.fecha_vigencia)}</div>
                <div>
                  <button onClick={() => handleDownload(documento)}>
                    <GetAppIcon style={{ color: "#0a2167" }} />
                  </button>
                  <button onClick={() => handleEdit(documento)}>
                    <EditIcon style={{ color: "#0a2167" }} />
                  </button>
                  <button onClick={() => handleDelete(documento)}>
                    <DeleteForeverIcon style={{ color: "#980c0f" }} />
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
        </ul>
      </div>
    </div>
  );
}

export default Documents;
