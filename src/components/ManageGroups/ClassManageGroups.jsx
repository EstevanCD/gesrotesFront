import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { environment } from "../../hooks/environment";
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

function ClassManageGroups() {
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

  const loadGroups = async () => {
    const responseGroups = await fetch(
      `https://rickandmortyapi.com/api/character/1`,
      {
        method: "GET",
      }
    );
    const dataGroups = await responseGroups.json();
    //console.log(dataGroups);
    setGroups(dataGroups);
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

  const handleSubmitCreateGroup = (event) => {
    event.preventDefault();
    const url = environment.url + "/api/grupos/crear?id_asignatura=1"; //TODO:aqui agregar el endpoint para enviar la informacion para la creacion del ciclo
    let data = {
      id: 13,
      numero_grupo: 4,
      asignaciones: [],
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Grupo creado"+data);
      })
      .catch((error) => {
        console.error("Error:", error);
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
            <Typography textAlign="center">
              Lista de Grupos con Estudiantes
            </Typography>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleSubmitCreateGroup}
            >
              Agregar Grupo
            </Button>
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
                  {groups1.map((row) => (
                    <TableRow
                      key=""
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        1
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ maxWidth: 200 }}>
                          <Alert
                            size="small"
                            onClose={() => {}}
                            severity="info"
                          >
                            {row.name}
                          </Alert>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <DeleteIcon />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default ClassManageGroups;
