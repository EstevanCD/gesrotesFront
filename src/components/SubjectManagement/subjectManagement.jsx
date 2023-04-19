import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Box } from "@mui/material";


import { useState, useEffect } from "react";

function SubjectManagement() {
    const [teachers, setTeachers] = useState([])

    const loadTeachers = async () => {

        const responseTeachers = await fetch(`https://rickandmortyapi.com/api/character`, {
            method: "GET",
        })
        const dataTeachers = await responseTeachers.json()
        console.log(dataTeachers.results[1]);
        setTeachers(dataTeachers.results)
    }
    useEffect(() => {
        loadTeachers()
    }, [])
    return (
        <>
            <Box sx={{
        height: 10}}>
                <Grid container direction="row" alignItems="center" justifyContent="center" columnSpacing={2}>
                    {teachers == null ?
                        <Alert severity="error">Error al cargar los datos</Alert>
                        : teachers.map((teacher) =>
                            <Grid item md={3} sm={6} xs={12}>
                                <Card style={{ marginBottom: "1rem"}} sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 100,width: 100, borderRadius: 50, border: 1, margin:"auto"}}
                                        image={teacher.image}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div" textAlign= "center">
                                            {teacher.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions style={{justifyContent: 'center'}}>
                                        <Button size="small" variant="contained" >GESTIONAR HORARIOS</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )}
                </Grid>
            </Box>
           
        </>
    );
}

export default SubjectManagement;