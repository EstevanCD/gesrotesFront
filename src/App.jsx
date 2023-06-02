import { Navigate, Route, Routes } from "react-router-dom";
import Subjects from "./components/Subject";
import TabComponents from "./components/TabComponent/TabComponent";
import Documents from "./components/Documents/Documents"
import EditDocument from "./components/Modals/EditDocument";

function App() {
  return (
    <>
      {/* <EditDocument />    */}
      <Routes>
        {<Route path="/TabComponent/:id" element={<TabComponents />} />}
        <Route index element={<Subjects />} />
        {/* <Route index element={<Documents />} /> */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
