import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useParams } from "react-router";
import Toolbar from "../Toolbar/Toolbar";
import Navbar from "../Navbar";
import style from "./TabComponent.module.css";
import "react-tabs/style/react-tabs.css";
import SubjectManagement from "../SubjectManagement/subjectManagement";
import ClassManageGroups from "../ManageGroups/ClassManageGroups";

function TabComponents() {
  let { id } = useParams();
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

            </div>

          </TabPanel>
          <TabPanel>
            <div className={style.panel}>
              <SubjectManagement />
            </div>
          </TabPanel>
          <TabPanel>
            <div className={style.panel}>
              
            </div>
          </TabPanel>
          <TabPanel>
            <div className={style.panel}>
            <ClassManageGroups/>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={style.panel}>

            </div>
          </TabPanel>
        </Tabs>
      </div>
      <Navbar />
    </>
  );
}

export default TabComponents;
