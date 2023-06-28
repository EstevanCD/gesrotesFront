import React from "react";
import { useEffect, useState, useContext } from "react";
import Toolbar from "../Toolbar/Toolbar";
import Navbar from "../Navbar";
import style from "./Subject.module.css";
import SearchIcon from "@material-ui/icons/Search";
import BlockIcon from "@material-ui/icons/Block";
import { Link, useParams } from "react-router-dom";
import { environment } from "../../hooks/environment";
import { AsignaturaContext } from "../../context/AsignaturaContext";

function Subjects() {
  const {setIdAsignatura} = useContext(AsignaturaContext);
  let params = useParams();
  console.log(params);
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const url = environment.url + "/api/asignaturas/listar?id_programa=1";

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const simplifiedData = data.map((subject) => {
          return {
            nombrePrograma: subject.nombrePrograma,
            idAsignatura: subject.idAsignatura,
            descripcion: subject.descripcion,
          };
        });
        setSubjects(simplifiedData);
      });
  }, []);

  const filteredSubjects = subjects.filter((subject) =>
    subject.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectSelected = (idAsignatura) => {
    setIdAsignatura(idAsignatura);
  };

  return (
    <>
      <Toolbar />
      <div className={style.containerSubject}>
        <div className={style.searchBar}>
          <div className={style.search}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Ingresa el nombre de la asignatura"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
        <div className={style.grid}>
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((item, index) => (
              <div key={index} className={style.card}>
                <div className={style.tittle + " " + style.common}>
                  <h4>{item.descripcion}</h4>
                  <p>{item.nombrePrograma}</p>
                </div>
                <div className={style.body}>
                  <p></p>
                </div>
                <div className={style.buttons}>
                  <button className={style.common}>
                    ESTADO DE LA ASIGNATURA
                  </button>
                  <Link to={"/TabComponent/" + item.idAsignatura}>
                    <button
                      onClick={()=>handleSubjectSelected(item.idAsignatura)}
                      className={style.common}
                    >
                      GESTIONAR ASIGNATURA
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className={style.noFound}>
              <BlockIcon />
              <p>NO FOUND</p>
            </div>
          )}
        </div>
      </div>
      <Navbar />
    </>
  );
}

export default Subjects;
