import { Navigate, Route, Routes } from "react-router-dom";
import Subjects from "./components/Subject";
import TabComponents from "./components/TabComponent/TabComponent";
import Documents from "./components/Documents/Documents";
import EditDocument from "./components/Modals/EditDocument";

import { AsignaturaContextProvider } from "./context/AsignaturaContext";

function App() {
  return (
    <>
      <AsignaturaContextProvider>
        {/* <EditDocument />    */}
        <Routes>
          {<Route path="/TabComponent/:id" element={<TabComponents />} />}

          <Route index element={<Subjects />} />

          {/* <Route index element={<Documents />} /> */}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </AsignaturaContextProvider>
    </>
  );
}

export default App;
