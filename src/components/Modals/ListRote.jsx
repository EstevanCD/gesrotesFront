import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "./styles.css";

/*estilos de css TODO DESPUES PASARLOS A UN ARCHIVO APARTE*/

const StyledButtonDelete = styled(Button)({
  color: "white",
  backgroundColor: "#960D0D",
  border: "1px solid red", // Agregar un borde rojo
   marginLeft: '30px',
  fontSize: "10px",
  "&:hover": {
    backgroundColor: "#C21111",
  },
});

function RoteList({ listRotes }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(listRotes);
  }, [listRotes]);

  console.log(tasks);

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleDeleteAllTask = () => {
    setTasks([]);
  };

  if (tasks.length === 0) {
    return <h1>No hay tareas aun</h1>;
  }

  /*   return (
    <>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {tasks.map((task) => (
      <div key={task.id} style={{ width: '33%', display: 'inline-block' }}>
        <h1>{task.profesor}</h1>
        <p>{task.horario}</p>
        <button onClick={() => handleDeleteTask(task.id)}>X</button>
      </div>
    ))}
  </div>
  <StyledButtonDelete onClick={() => handleDeleteAllTask()}> ELIMINAR TODAS<br/>LAS ASIGNACIONES </StyledButtonDelete>
  </>
  ); */

  return (
    <>
      <br /> <hr />
      <h4>Asignaciones</h4>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 200px 200px",
            gridGap: "20px",
            gap: "20px",
          }}
        >
          {tasks.map((task) => (
            <div
              className="elemento"
              focus
              key={task.id}
              style={{
                height: "15px",
                width: "95%",
                //background: "white",
                border: "1px solid #0A2168",
                borderRadius: "25px",
                fontSize: "12px",
                color: "#0A2168",
                boxShadow: "5px 5px 5px #0A2168",
                position: "relative", // Agregar posicion relativa
                textAlign: "left",
                paddingLeft: "20px",
                
              }}
            >
              <h7>
                {task.profesor} {" | "} {task.horario}{" "}
              </h7>
              <Button
                className="botonBorrar"
                variant="text"
                style={{color: "#0A2168", position: "absolute", top: "-11px", right: "-15px" }} // Agregar posicion absoluta y ajustar el top y right
                onClick={() => handleDeleteTask(task.id)}
              >
                X
              </Button>
            </div>
          ))}
        </div>

        <div>
          <StyledButtonDelete
            className="deleteAll"
            onClick={() => handleDeleteAllTask()}
          >
            ELIMINAR TODAS
            <br />
            LAS ASIGNACIONES
          </StyledButtonDelete>
        </div>
      </div>
    </>
  );
}

export default RoteList;
