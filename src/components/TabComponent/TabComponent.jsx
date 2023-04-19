import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useParams } from "react-router";
import Toolbar from "../Toolbar/Toolbar";
import Navbar from "../Navbar";
import style from "./TabComponent.module.css";
import "react-tabs/style/react-tabs.css";

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
            <div className={style.grid}>
              <div className={style.card}>
                <h4>{id}</h4>
                {/* GUAIRSE DE LA TARJETA SUBJECT */}
                {/* CUERPO DE LA TARJETA ESTUDIANTES*/}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={style.grid}>
              <div className={style.card}>
                {/* CUERPO DE LA TARJETA PROFESORES*/}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={style.grid}>
              <div className={style.card}>
                {/* CUERPO DE LA TARJETA ROTES*/}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={style.grid}>
              <div className={style.card}>
                {/* CUERPO DE LA TARJETA TURNOS*/}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={style.grid}>
              <div className={style.card}>
                {/* CUERPO DE LA TARJETA DOCUMENTOS*/}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <Navbar />
    </>
  );
}

export default TabComponents;
