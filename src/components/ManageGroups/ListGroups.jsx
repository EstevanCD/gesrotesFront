import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "./stylesListGroups.css";
import { environment } from "../../hooks/environment";
import Popup from "../Modals/Popup";
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
    setTasks(data.estudiantes);
  }, [data]);

  
    // visibilidad popup  ALERTAS
    const [showPopup, setShowPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
  
    const handleClosePopup = () => {
      setShowPopup(false);
    };

  const handleDeleteEstudiante = (task) => {
    const url = environment.url + `/api/grupos/retirarEstudiante?id_estudiante=${task.id}&id_grupo=${data.id}`; 
      fetch(url, {
        method: "DELETE"
      })
        .then((response) => response.json())
        .then((data) => {
          setSuccessMessage("Estudiante eliminado");
          setShowPopup(true);
          console.log(data);
        })
        .catch((error) => {
          setSuccessMessage("Error al eliminar estudiante");
          setShowPopup(true);
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
                onClick={() => handleDeleteEstudiante(task)}
            > X </Button>
            </div>
        ))}
        </div>

    
      </div>
      {showPopup && (
        <Popup message={successMessage} onClose={handleClosePopup} />
      )}
    </>
  );
}

export default ListGroups;
