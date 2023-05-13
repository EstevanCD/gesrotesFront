import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Box } from "@mui/material";
import Modals from "../Modals/Modals";

import { useState, useEffect } from "react";

function SubjectManagement({ idAsignatura }) {
  console.log("id que trae ", idAsignatura);
  const [teachers, setTeachers] = useState([]);
  const [teachersInfo, setTeachersInfo] = useState([]);
  const loadTeachers = async () => {
    const responseTeachers = await fetch(
      `http://132.226.60.71:8080/api/docentes/listado/1`,
      {
        method: "GET",
      }
    );
    const dataTeachers = await responseTeachers.json();
    console.log(dataTeachers.info);
    setTeachers(dataTeachers.docentes);
    setTeachersInfo(dataTeachers.info);
  };
  useEffect(() => {
    loadTeachers();
  }, []);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOpen = () => {
    setModalContent("Forms");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modals open={open} handleClose={handleClose} modalContent={modalContent} title="GESTIÓN DE HORARIOS" />
      <Box
        sx={{
          height: 10,
        }}
      >
        <Typography
          gutterBottom
          variant="subtitle2"
          component="div"
          color="#960D0D"
          textAlign="left"
        >
          {teachersInfo} *
        </Typography>
        <br></br>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          columnSpacing={2}
        >
          {teachers == null ? (
            <Alert severity="error">Error al cargar los datos</Alert>
          ) : (
            teachers.map((teacher) => (
              <Grid item md={3} sm={6} xs={12}>
                <Card style={{ marginBottom: "1rem" }} sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                      border: 1,
                      margin: "auto",
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      textAlign="center"
                    >
                      {teacher.nombre}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      color="#960D0D"
                      textAlign="center"
                    >
                      {teacher.info} *
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                      color="grey"
                      textAlign="center"
                    >
                      _____________________________
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button
                      style={{backgroundColor:"#04048b"}}
                      size="small"
                      variant="contained"
                      onClick={handleOpen}
                    > 
                      GESTIONAR HORARIOS
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
}

export default SubjectManagement;
