import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "./stylesCreateRote.css";

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

function RoteList({ listRotes, deleteAllListRotes, deleteListRotes} ) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(listRotes);
  }, [listRotes]);

  console.log(tasks);


  if (tasks.length === 0) {
    return <h1>No hay tareas aun</h1>;
  }


  return (
    <>
      <br /> <hr />
      <h4>Asignaciones</h4>
      <div className="container-flex" >
        <div className="container-flex-columns" >
          {tasks.map((task) => (
            <div className="container-cards" focus key={task.id} >
              <h7>
                {task.profesor} {" | "} {task.horario}{" "}
              </h7>
              <Button 
                className="Button-DeleteCard"
                variant="text"
                style={{color: "#0A2168", position: "absolute", top: "-11px", right: "-15px" }} // Agregar posicion absoluta y ajustar el top y right
                onClick={() => deleteListRotes(task.id)}
              >
                X
              </Button>
            </div>
          ))}
        </div>

        <div>
          <StyledButtonDelete
            className="deleteAll"
            onClick={() => deleteAllListRotes()}
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
