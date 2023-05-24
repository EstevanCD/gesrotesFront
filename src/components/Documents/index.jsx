import React from "react";
import { useEffect, useState } from "react";
import style from "../Subject/Subject.module.css";
import BlockIcon from "@material-ui/icons/Block";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Scenario() {
  const [scenario, setScenario] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const simplifiedData = data.results.map((scenario) => {
          //TODO:Mejorar documentos expirados y ESCENARIOS LISTADOS (API)
          //FIXME: Ruta para gestion de Documentos
          return {
            scenario_codigo: scenario.id,
            scenario_nombre: scenario.name,
            scenario_expirados: scenario.info,
          };
        });
        setScenario(simplifiedData);
      });
  }, []);

  const filteredScenario = scenario.filter((scenario) =>
    scenario.scenario_nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={style.containerScenario}>
        <div className={style.searchBar}></div>
        <div className={style.grid}>
          {filteredScenario.length > 0 ? (
            filteredScenario.map((item, index) => (
              <div key={index} className={style.card}>
                <div className={style.tittle + " " + style.common}>
                  <h4>{item.scenario_nombre}</h4>
                </div>
                <div className={style.body}>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="div"
                    color="#960D0D"
                    textAlign="left"
                  >
                    * {item.scenario_expirados}
                    1 documento expirado 
                  </Typography>
                </div>
                <div className={style.buttons}>
                  <Link to={"/TabComponent/" + item.scenario_codigo}>
                    <button className={style.common}>
                      GESTIONAR DOCUMENTOS
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
    </>
  );
}

export default Scenario;
