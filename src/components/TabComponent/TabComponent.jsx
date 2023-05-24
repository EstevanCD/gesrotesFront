import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useParams } from "react-router";
import Toolbar from "../Toolbar/Toolbar";
import Navbar from "../Navbar";
import style from "./TabComponent.module.css";
import "react-tabs/style/react-tabs.css";
import SubjectManagement from "../SubjectManagement/subjectManagement";
import Index from "../layout/index";
import Routine from "../Routine/Routine";
import Docs from "../Documents/index";

//TODO: Cambiar layout "index" por la implementacion

function TabComponents() {
  let { idAsignatura } = useParams();
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
              <SubjectManagement idAsignatura={idAsignatura}/>
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
              <Docs />
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <Navbar />
    </>
  );
}

export default TabComponents;
