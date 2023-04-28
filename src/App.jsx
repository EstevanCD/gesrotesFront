import { Navigate, Route, Routes } from 'react-router-dom';
import Subjects from "./components/Subject";
import TabComponents from "./components/TabComponent/TabComponent";
import CycleCreations from "./components/Modals/cycleCreation";

function App() {
  return (
    <>
      <Routes>
            { <Route path='/TabComponent/:id' element={<TabComponents />}/> }
            <Route index element={<CycleCreations />}/>
            {/* <Route index element={<Subjects />}/> */}
            <Route path='*' element={<Navigate replace to="/"/>}/>
      </Routes>
    </>
  );
}

export default App;
