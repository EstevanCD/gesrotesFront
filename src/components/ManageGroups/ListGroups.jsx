import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./stylesListGroups.css";
import Popup from "../Modals/Popup";

function ListGroups({ data, id_grupo }) {
  useEffect(() => {
  }, [data]);

  const retirarItem = (id) => {
    data = data.filter((item) => item.id != id)
  }

  const handleDeleteEstudiante = (id) => {
    const url = "http://localhost:8083/api/grupos/retirarEstudiante?" +
      new URLSearchParams({
        id_estudiante: id,
        id_grupo: id_grupo
      }); 
      fetch(url, {
        method: "DELETE"
      })
        .then(retirarItem(id))
        .catch((error) => {
        });
  };


return (
    <>
    <div className="container-flexG" >
        <div className="container-flex-columnsG" >
        {data.map((task) => (
            <div className="container-cardsG" focus key={task.id} >
            {task.nombre}
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
      {showPopup && (
        <Popup message={successMessage} onClose={handleClosePopup} />
      )}
    </>
  );
}

export default ListGroups;
