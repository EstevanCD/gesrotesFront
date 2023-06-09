import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  FormHelperText,
} from "@mui/material";
import Modals from "../Modals/Modals";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import Popup from "../Modals/Popup";
import { AsignaturaContext } from "../../context/AsignaturaContext";
import { environment } from "../../hooks/environment";
import ListGroups from "./ListGroups";

function ClassManageGroups() {
  const { idAsignatura } = useContext(AsignaturaContext);

  const [form1, setForm1] = useState("");
  const handleChangeForm1 = (event) => {
    setForm1(event.target.value);
  };
  const [form2, setForm2] = useState("");
  const handleChangeForm2 = (event) => {
    setForm2(event.target.value);
  };
  const [groups, setGroups] = useState([]);
  const [groups1, setGroups1] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const loadGroups = async () => {
    try {
      const response = await fetch(environment.url + `/api/grupos/listar/${idAsignatura}`);
      const data = await response.json();
      setGroupList(data.grupos);
    } catch (error) {
      // Manejar errores de red u otros errores
    }
  };

  const loadGroups1 = async () => {
    const responseGroups1 = await fetch(
      `https://rickandmortyapi.com/api/character`,
      {
        method: "GET",
      }
    );
    const dataGroups1 = await responseGroups1.json();
    console.log(dataGroups1.results[1]);
    setGroups1(dataGroups1.results);
  };

  useEffect(() => {
    loadGroups();
    loadGroups1();
  }, []);

  // visibilidad popup
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Eliminar grupo

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  console.log("Id_asignatura" + idAsignatura);

  const handleEliminar = (id) => {
    const url = environment.url + "/api/grupos/eliminar?id_grupo=" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        setSuccessMessage("Grupo eliminado con éxito");
        setShowPopup(true);
      })
      .catch((error) => {
        // Manejar errores de red u otros errores
      });
  };

  const handleSubmitCreateGroup = (event) => {
    event.preventDefault();
    const url = environment.url + "/api/grupos/crear?"; //TODO:aqui agregar el endpoint para enviar la informacion para la creacion del ciclo
    fetch(
      url +
        new URLSearchParams({
          id_asignatura: idAsignatura,
        }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuccessMessage("Grupo Creado Con Exito");
        setShowPopup(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSuccessMessage("Ha ocurrido un Error al Agregar el Grupo");
        setShowPopup(true);
      });
  };

  return (
    <>
      <Card sx={{ m: 1 }}>
        <br></br>
        <Grid
          sx={{ m: 1 }}
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={6} md={6}>
            <Typography>
              PASO 1: Seleccione el grupo al que le va a registrar estudiantes
            </Typography>
            <Box sx={{ minWidth: 120, maxWidth: 400 }}>
              <FormControl fullWidth>
                <FormHelperText>N° de grupo</FormHelperText>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form1}
                  label=""
                  onChange={handleChangeForm1}
                  displayEmpty
                >
                  <MenuItem disabled value="">
                    <em>Seleccione un grupo</em>
                  </MenuItem>
                  <MenuItem value={10}>{groups.name}</MenuItem>
                  <MenuItem value={20}>{groups.status}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Typography>
              PASO 2: Seleccione los estudiantes que va a registrar en el grupo
              seleccionado
            </Typography>
            <Box sx={{ minWidth: 120, maxWidth: 400 }}>
              <FormControl fullWidth>
                <FormHelperText>Escenario</FormHelperText>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form2}
                  label=""
                  onChange={handleChangeForm2}
                  displayEmpty
                >
                  <MenuItem disabled value="">
                    <em>Seleccione un estudiante</em>
                  </MenuItem>
                  <MenuItem value={10}>{groups.name}</MenuItem>
                  <MenuItem value={20}>{groups.status}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Grid
          sx={{ m: 1 }}
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={6} md={6}></Grid>
          <Grid item xs={6} md={6}>
            <br></br>
            <Box sx={{ minWidth: 120 }}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick=""
              >
                Agregar estudiante
              </Button>
            </Box>
          </Grid>
        </Grid>
        <br></br>
        <Grid container spacing={10} justifyContent="center">
          <Grid item xs={12} md={12}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleSubmitCreateGroup}
            >
              Agregar Grupo
            </Button>
            <Typography textAlign="center">
              Lista de Grupos con Estudiantes
            </Typography>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>N° Grupo</TableCell>
                    <TableCell align="center">Estudiantes</TableCell>
                    <TableCell align="center">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupList.map((row) => (

                   <TableRow
                      key=""
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <center>{row.numero_grupo}</center>
                      </TableCell>

                      <TableCell align="center">
                        {row.estudiantes.length != 0 ? (
                          <ListGroups data={row} />
                        ) : (
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              color: "red",
                              textAlign: "center",
                            }}
                          >
                            * Grupo sin asignación de estudiantes
                          </span>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        <DeleteIcon onClick={() => handleEliminar(row.id)} />
                      </TableCell>
                    </TableRow>




                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
      {showPopup && (
        <Popup message={successMessage} onClose={handleClosePopup} />
      )}
    </>
  );
}

export default ClassManageGroups;