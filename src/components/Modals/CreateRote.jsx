import { React, useState, useEffect } from "react";
import RoteList from "./ListRote";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

function CreateRote() {

 
  // Este va a ser el array que se listara ESTO ME TOCA LLEVARMELO A OTRA CLASES
  const [listRotes, setlistRotes] = useState([]);

  const Rotes = [
    {
      id: 1,
      profesor: "mario Castaneda",
      horario: "horario 1",
    },
    {
      id: 2,
      profesor: "juan sebastian",
      horario: "horario 2",
    },
    {
      id: 3,
      profesor: "luisa",
      horario: "horario 3",
    },
    {
      id: 4,
      profesor: "camila",
      horario: "horario 4",
    },
  ];

  const StyledButtonAdd = styled(Button)({
    color: "white",
    backgroundColor: "#0A2168",
    border: "1px solid blue", // Agregar un borde rojo
    fontSize: "10px",
    marginTop: '10px',
    "&:hover": {
      backgroundColor: "#1035A6",
    },
  });

  function SaveRote(e) {
    e.preventDefault();
    console.log(selectedValue);
    console.log(selectHorario);
    setlistRotes([
      ...listRotes,
      {
        id: listRotes.length + 1,
        profesor: selectedValue,
        horario: selectHorario,
      },
    ]);
  }


  // listado de tareas del rote
  const [selectedValue, setSelectedValue] = useState("");
  const options = [
    { label: "Maria Paz", value: 1 },
    { label: "Jorge Ruiz", value: 2 },
    { label: "Christian Escobar", value: 3 },
    { label: "Magdalena Falla", value: 4 },
  ];

  // listado de tareas del horario rote
  const [selectHorario, setselectHorario] = useState("");
  const horarios = [
    { label: "Horario 1 SJ", value: 1 },
    { label: "Horario 2 SJ", value: 2 },
    { label: "Horario 3 H4", value: 3 },
    { label: "Horario 4 H4", value: 3 },
  ];

  useEffect(() => {
    setlistRotes(Rotes); //cuando cargue el documento voy a establecer el array de tareas
  }, []);

 return (
    <>
      <form onSubmit={SaveRote}>
        <h4>Asignar horario al rote</h4>
       
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          style={{
            width: '40%',
            marginLeft: '20px',
            marginRight: '10px',
            borderRadius: '25px',
            
          }}
        >
          <option hidden defaultValue>
            Seleccione el nombre del docente
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={selectHorario}
          onChange={(e) => setselectHorario(e.target.value)}
          style={{
            width: '40%',
            marginLeft: '10px',
            marginRight: '20px',
            borderRadius: "25px",
          }}
        >
          <option hidden defaultValue>
            Seleccione el Horario
          </option>
          {horarios.map((option) => (
            <option key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
        
       
        {/* <input type="submit" value="Agregar" style={{ marginTop: '10px'   }} /> */}


      <StyledButtonAdd
            className="deleteAll"
            type="submit"
          >
           AGREGAR
          </StyledButtonAdd>

      </form>
      <RoteList listRotes={listRotes} />
    </>
  );

}

export default CreateRote;
