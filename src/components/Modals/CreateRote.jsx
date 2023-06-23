import { React, useState, useEffect } from "react";
import RoteList from "./ListRote";
import { environment } from "../../hooks/environment";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import "./stylesCreateRote.css";

function CreateRote() {

  // bring the data backent teacher
  const [options, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {  //docentes asociados a la asignatura
      const response = await fetch("http://132.226.60.71:8080/api/docentes/listado/?id_asignatura=1");
      const json = await response.json();
      setData(json.docentes);
    }
    fetchData();
  }, []); 

    /*    console.log("este es el array"+data.docentes); */
    

  //HORARIOS
  





    //Asignacion Controller  Servicios relacionados con asignacion
  const [dataAsignaciones, setdataAsignaciones] = useState(" ");
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://132.226.60.71:8080/api/asignaciones/listar/1");
      const json = await response.json();
      setdataAsignaciones(json);
      /* console.log("TEST array schedule") */
    }
    fetchData();
  }, []);
  console.log(dataAsignaciones);

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

//Todo reemplazar por el endpoint de horarios configurados



  const StyledButtonAdd = styled(Button)({
    color: "white",
    fontWeight: 'bold',
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


  // listado de profesores para el rote
  const [selectedValue, setSelectedValue] = useState("");
 
/*   const options = [
    { nombre: "Maria Paz", id: 1 },
    { nombre: "Jorge Ruiz", id: 2 },
    { nombre: "Christian Escobar", id: 3 },
    { nombre: "Magdalena Falla", id: 4 },
    { nombre: "Cristina Mar", id: 5 },
    
  ]; */





  // listado de tareas del horario rote
/**
 * /api/horarios/listado
 */

  const [selectHorario, setselectHorario] = useState("");
  const horarios = [
    { label: "Horario 1 SJ", value: 1 },
    { label: "Horario 2 SJ", value: 2 },
    { label: "Horario 3 H4", value: 3 },
    { label: "Horario 4 H4", value: 4 },
  ];

  useEffect(() => {
    setlistRotes(Rotes); //cuando cargue el documento voy a establecer el array de tareas
  }, []);


  const deleteAllListRotes = () => {
    setlistRotes([]);
  };

  const deleteListRotes = (taskId) => {
    setlistRotes(listRotes.filter((task) => task.id !== taskId)); 
  };

return (
    <div style={{ width: "800px" }}>
      <form onSubmit={SaveRote}>
        <h4>Asignar horario al rote</h4>

        <select className="container-selectTeachers"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)} 
        >
          <option hidden defaultValue>
            Seleccione el nombre del docente
          </option>

          {options.map((option) => (
            <option key={option.id} value={option.nombre}>
              {option.nombre}
            </option>
          ))}
        </select>

        <select className="container-selectSchedule"
          value={selectHorario}
          onChange={(e) => setselectHorario(e.target.value)}
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
      <RoteList listRotes={listRotes} deleteAllListRotes = {deleteAllListRotes} deleteListRotes = {deleteListRotes} />
    </div>
  );

}

export default CreateRote;
