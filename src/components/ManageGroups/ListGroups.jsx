import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "./stylesListGroups.css";

const StyledButtonDelete = styled(Button)({
  color: "white",
  fontWeight: 'bold',
  backgroundColor: "#960D0D",
  border: "1px solid red", // Agregar un borde rojo
  marginLeft: '30px',
  fontSize: "10px",
  "&:hover": {
    backgroundColor: "#C21111",
  },
});

function ListGroups({ data, id_grupo }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(data);
  }, []);


  const handleDeleteEstudiante = (id) => {
      //eliminar ciclo
    const url = "http://132.226.60.71:8080/api/grupos/retirarEstudiante?" +
      new URLSearchParams({
        id_estudiante: id,
        id_grupo: id_grupo
      }); 
      fetch(url, {
        method: "DELETE"
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });
  };


return (
    <>
    <div className="container-flexG" >
        <div className="container-flex-columnsG" >
        {tasks.map((task) => (
            <div className="container-cardsG" focus key={task.id} >
            <h7> {task.nombre} </h7>
            <Button 
                className="Button-DeleteCardG"
                variant="text"
                style={{color: "#black", position: "absolute", top: "-11px", right: "-15px" }} // Agregar posicion absoluta y ajustar el top y right
              onClick={() => handleDeleteEstudiante(task.id)}
            > X </Button>
            </div>
        ))}
        </div>

    
      </div>
    </>
  );
}

export default ListGroups;
