import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from 'react';
import { useParams } from "react-router";
import Toolbar from "../Toolbar/Toolbar";
import Navbar from "../Navbar";
import style from "./TabComponent.module.css";
import "react-tabs/style/react-tabs.css";
import SubjectManagement from "../SubjectManagement/subjectManagement";
import Index from "../layout/index";
import Routine from "../Routine/Routine";
import Docs from "../Documents/index";
import Documents from "../Documents/Documents";

//TODO: Cambiar layout "index" por la implementacion

function TabComponents() {
  let idAsignatura = useParams();

  const [showDocumentsView, setShowDocumentsView] = useState(false);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);

  const handleManageDocuments = (scenarioId) => {
    console.log("asdasdas", scenarioId);
    setSelectedScenarioId(scenarioId);
    setShowDocumentsView(true);
  };

  return (
    <>
      <Toolbar />
      <div className={style.containerTabComponent}>
        <Tabs>
          <TabList>
            <Tab>Estudiantes</Tab>
            <Tab>Profesores</Tab>
            <Tab>Rotes</Tab>
            <Tab>Turnos</Tab>
            <Tab>Documentos</Tab>
          </TabList>

          <TabPanel>
            <div className={style.panel}>
              <Index />
            </div>
          </TabPanel>

          <TabPanel>
            <div className={style.panel}>
              <SubjectManagement idAsignatura={idAsignatura} />
            </div>
          </TabPanel>

          <TabPanel>
            <div className={style.panel}>
              <Routine />
            </div>
          </TabPanel>

          <TabPanel>
            <div className={style.panel}>
              <Index />
            </div>
          </TabPanel>

          <TabPanel>
        <div className={style.panel}>
          {showDocumentsView ? (
            <Documents scenarioId={selectedScenarioId} />
          ) : (
            <Docs handleManageDocuments={handleManageDocuments} />
          )}
        </div>
      </TabPanel>
        </Tabs>
      </div>
      <Navbar />
    </>
  );
}

export default TabComponents;
