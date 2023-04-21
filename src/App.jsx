import { Navigate, Route, Routes } from 'react-router-dom';
import Subjects from "./components/Subject";
import TabComponents from "./components/TabComponent/TabComponent";
import Forms from './components/Modals/Forms';
// import subjectManagements from "./components/SubjectManagement/subjectManagement";

function App() {
  return (
    <>
      <Routes>
            { <Route path='/TabComponent/:id' element={<TabComponents />}/> }
            {/* {<Route path='/subjectManagement' element={<subjectManagements />}/> } */}
            <Route index element={<Subjects />}/>
            {/* <Route path='Docentes' element={<Docentes />}/> */}
            <Route path='*' element={<Navigate replace to="/"/>}/>
      </Routes>
    </>
  );
}

export default App;
