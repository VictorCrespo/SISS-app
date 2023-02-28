import { useState,useEffect } from "react"

import { 
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Grid,
    Typography,
    Snackbar
} from "@mui/material"


export function Alumnos_Inscritos() {

    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [expand,setExpand] = useState(false);

    const [alumnos,setAlumnos]= useState([]);

    const cerrarError = (event, reason) => {
        
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    }

    const ExpandirCard = (id) => {
        if (expand === id) {
            setExpand(null);
        } else {
            setExpand(id);
        }
    };

    async function getAlumnos(){
        try {
            const response = await fetch('http://localhost:8080/alumnos/programas')
            const data = await response.json()
            setAlumnos(data)
        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
        }
    } 

    useEffect( () => {
        getAlumnos();
    },[]);

    return(
        <Box>
            <Grid container rowSpacing={5} spacing={7}>
                {alumnos.map((Alumnos) => (
                    <Grid key={Alumnos.Alumno.id} item xl={3} lg={4} md={6} sm={12}>
                        <Card >
                            <Box display={ "flex" } sx={{justifyContent: "center"}}>
                                <Avatar src={Alumnos.Alumno.foto} sx={{ width: 150, height: 150 }}/>    
                            </Box>
                            <CardContent>
                                <Box sx={{height: 70}}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {Alumnos.Alumno.nombrecompleto}
                                    </Typography>
                                </Box>
                                <Typography mt={1}>
                                    <b>Carrera:</b> {Alumnos.Alumno.Carrera.nombre}
                                </Typography>
                                
                                <Typography mt={1}>
                                    <b>No. Control:</b> {Alumnos.Alumno.no_control}
                                </Typography>
                                <Collapse in={expand === Alumnos.Alumno.id}>
                                        <Typography mt={1}>
                                            <b>Sexo: </b>{Alumnos.Alumno.sexo === 'H'?'Hombre':'Mujer'}
                                        </Typography>
                                        <Typography mt={1}>
                                            <b>Domicilio: </b>{Alumnos.Alumno.domicilio}
                                        </Typography>
                                        <Typography mt={1}>
                                            <b>Telefono: </b>{Alumnos.Alumno.telefono}
                                        </Typography>
                                        <Typography mt={1}>
                                            <b>Periodo: </b>{Alumnos.Alumno.periodo}
                                        </Typography>
                                        <Typography mt={1}>
                                            <b>Semestre: </b>{Alumnos.Alumno.semestre}
                                        </Typography>
                                        <Typography mt={1}>
                                            <b>Porcentaje de creditos aprobados: </b>{Alumnos.Alumno.porcentaje_creditos_a}%
                                        </Typography>
                                </Collapse>
                                <CardActions sx={{display: "flex", justifyContent: "center", alignItems: "center", mt:2}}>
                                    <Button variant="contained" onClick={() => { ExpandirCard(Alumnos.Alumno.id)}}>{expand === Alumnos.Alumno.id ?'ver menos':'Leer mas'}</Button>
                                </CardActions>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Snackbar 
                open={openerror} 
                autoHideDuration={6000} 
                anchorOrigin={{vertical:'bottom',horizontal:'right'}}
                spacing={2} 
                sx={{ width: '25%' }}
                onClose={cerrarError}
                >
                <Alert onClose={cerrarError} severity='error' sx={{ width: '100%' }}>
                    {mensajeerror}
                </Alert>
            </Snackbar>
        </Box>
    )
}