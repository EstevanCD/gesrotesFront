import { useState } from "react";
import Navbar from "./components/Navbar";
import Toolbar from "./components/Toolbar/Toolbar";
import Layout from "./components/layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toolbar/>
      <Layout/>
      <Navbar/>
    </>
  );
}

export default App;
