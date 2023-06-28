import { React, useState, useEffect, useContext } from "react";
import RoteList from "./ListRote";
import { environment } from "../../hooks/environment";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { AsignaturaContext } from "../../context/AsignaturaContext";
import "./stylesCreateRote.css";

function CreateRote() {
  const { infoRotes } = useContext(AsignaturaContext);

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

  // Este va a ser el array que se listara ESTO ME TOCA LLEVARMELO A OTRA CLASES
  const [listRotes, setlistRotes] = useState([]);

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
  // const horarios = [
  //   { label: "Horario 1 SJ", value: 1 },
  //   { label: "Horario 2 SJ", value: 2 },
  //   { label: "Horario 3 H4", value: 3 },
  //   { label: "Horario 4 H4", value: 4 },
  // ];

  const [horarios, setHorarios] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const url =
        environment.url +
        `/api/horarios/listado?id_docente=${1}&id_asignatura=${1}`;
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      const simplifiedData = data.map((horary) => {
        return {
          codigoAsignatura: horary.codigoAsignatura,
          descripcionAsignatura: horary.descripcionAsignatura,
          nombreModulo: horary.nombreModulo,
          dia: horary.dia,
          horaInicio: horary.horaInicio,
          horaFin: horary.horaFin,
          nombreEscenario: horary.nombreEscenario,
          descripcionServicio: horary.descripcionServicio,
        }
      })
      // const simplifiedData = data.modulos.map((modulo) => {
      //   const horarios = modulo.horarios.map((horario) => {
      //     const [dia, hora] = horario.descripcion.split(" ");
      //     return {
      //       id: horario.id,
      //       descripcion: horario.descripcion,
      //       dia: dia,
      //       hora: hora,
      //     };
      //   });
      //   return {
      //     id: modulo.id,
      //     nombre: modulo.nombre,
      //     horarios: horarios,
      //   };
      // });
      setHorarios(simplifiedData);
    };

    fetchData();
  
  }, [])
  

  useEffect(() => {
    setlistRotes(infoRotes); //cuando cargue el documento voy a establecer el array de tareas
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
          {horarios?.map((option) => (
            <option key="1" value={option.nombreModulo}>
              {option.nombreModulo}
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
