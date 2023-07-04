import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "./stylesCreateRote.css";

/*estilos de css TODO DESPUES PASARLOS A UN ARCHIVO APARTE*/

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

function RoteList({ listRotes, deleteAllListRotes, deleteListRotes} ) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(listRotes);
  }, [listRotes]);

  if (tasks?.length === 0 || !tasks) {
    return <h1></h1>;
  }


  return (
    <>
      <br /> <hr />
      <h4>Asignaciones</h4>
      <div className="container-flex" >
        <div className="container-flex-columns" >
            <div className="container-cards h-10" focus >
              {listRotes?.docentes?.map((docenteItem) => (
                <div key={docenteItem.id} >
                  <>
                    {docenteItem.docente} {" | "}
                    {docenteItem.modulos.map((moduloItem) => (
                      <>
                        {moduloItem.nombre}
                        {moduloItem.horarios.map((horario) => (
                          <>{horario.descripcion}</>
                        ))}
                      </>
                    ))}
                  </>
                </div>
              ))}
            </div>
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
