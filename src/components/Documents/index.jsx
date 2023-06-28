import React from "react";
import { useEffect, useState } from "react";
import style from "../Subject/Subject.module.css";
import BlockIcon from "@material-ui/icons/Block";
import Typography from "@mui/material/Typography";
import { environment } from "../../hooks/environment";

function Scenario({ handleManageDocuments }) {
  const [scenario, setScenario] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleManageDocumentsClick = (scenarioId) => {
    handleManageDocuments(scenarioId);
  };

  const url = environment.url + "/api/escenarios/estado_documentos"
  useEffect(() => {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const simplifiedData = data.escenarios.map((scenario) => {
          return {
            scenario_codigo: scenario.id,
            scenario_nombre: scenario.nombre,
            scenario_expirados: scenario.documentos_expirados,
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
                    * {item.scenario_expirados} documentos expirados
                  </Typography>
                </div>
                <div className={style.buttons}>
                  <button
                    className={style.common}
                    onClick={() => handleManageDocumentsClick(item.scenario_codigo)}
                  >
                    GESTIONAR DOCUMENTOS
                  </button>
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
