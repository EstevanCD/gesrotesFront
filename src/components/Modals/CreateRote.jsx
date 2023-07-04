import { React, useState, useEffect, useContext } from "react";
import RoteList from "./ListRote";
import { environment } from "../../hooks/environment";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { AsignaturaContext } from "../../context/AsignaturaContext";
import "./stylesCreateRote.css";

function CreateRote() {
  const { infoRotes, idGrupo, idCiclo } = useContext(AsignaturaContext);
  
  const [selectHorario, setselectHorario] = useState("");
  const [listRotes, setlistRotes] = useState([]);
  const [options, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {  //docentes asociados a la asignatura
      const response = await fetch("http://localhost:8083/api/docentes/listado/?id_asignatura=1");
      const json = await response.json();
      setData(json.docentes);
    }
    fetchData();
  }, []); 

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
    fetch("http://132.226.60.71:8080/api/rotes/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_grupo: idGrupo,
        id_ciclo: idCiclo,
        id_horario: +selectHorario
      }),
    })
      .then((response) => response.json())
      .then((data) => {

        setlistRotes(data);

        setSuccessMessage("Rote creado con exito");
        setShowPopup(true);
        setNameModule("");
      })
      .catch((error) => {
      });
  }


  // listado de profesores para el rote
  const [selectedValue, setSelectedValue] = useState("");
 
  const [horarios, setHorarios] = useState();

  useEffect(() => {

    if (!selectedValue) return;

    const fetchData = async () => {
      const url =
        // environment.url +
        `http://localhost:8083/api/horarios/listado?id_docente=${selectedValue}&id_asignatura=${1}`;
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      const simplifiedData = data.modulos.map((modulo) => {
        const horarios = modulo.horarios.map((horario) => {
          const [dia, hora] = horario.descripcion.split(" ");
          return {
            id: horario.id,
            descripcion: horario.descripcion,
            dia: dia,
            hora: hora,
          };
        });
        return {
          id: modulo.id,
          nombre: modulo.nombre,
          horarios: horarios,
        };
      });
      setHorarios(simplifiedData);
    };

    fetchData();
  
  }, [selectedValue])
  

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
            <option key={option.id} value={option.id}>
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
            <>
              {option.horarios.map((horario) => (
                <option key={horario.id} value={horario.id}>
                  {option.nombre}{" - "}{horario.descripcion}
                </option>
              ))}            
            </>
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
