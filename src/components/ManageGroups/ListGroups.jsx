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

function ListGroups({ data } ) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(data);
  }, [data]);


  const handleDeleteEstudiante = () => {
      //eliminar ciclo
    const url = environment.url + `/api/grupos/listar/1`; 
      fetch(url, {
        method: "DELETE"
      })
        .then((response) => response.json())
        .then((data) => {
          setAlertMessage("* Ciclo eliminado exitosamente");
          console.log(data);
        })
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
                onClick={() => handleDeleteEstudiante}
            > X </Button>
            </div>
        ))}
        </div>

    
      </div>
    </>
  );
}

export default ListGroups;
