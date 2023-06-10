import { Navigate, Route, Routes } from "react-router-dom";
import Subjects from "./components/Subject";
import TabComponents from "./components/TabComponent/TabComponent";
import Documents from "./components/Documents/Documents";
import EditDocument from "./components/Modals/EditDocument";

import { AsignaturaContextProvider } from "./context/AsignaturaContext";

function App() {
  return (
    <>
      {/* <EditDocument />    */}
      <Routes>
        {<Route path="/TabComponent/:id" element={<TabComponents />} />}
        <AsignaturaContextProvider>
          <Route index element={<Subjects />} />
        </AsignaturaContextProvider>
        {/* <Route index element={<Documents />} /> */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
