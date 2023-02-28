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
    TextField,
    Typography,
    Snackbar
} from "@mui/material"

import { FileDownload } from "@mui/icons-material";

export function Alumnos_Inscritos() {

    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [expand,setExpand] = useState(false);

    const [alumnos,setAlumnos]= useState([]);

    const [filtro, setFiltro] = useState('');

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
            <Box display={'flex'} sx={{ height: 55}}>
                <TextField label={'Nombre'} sx={{ height:40, flexGrow:1}} onChange={ (event) => {
                    setFiltro(event.target.value)}}
                />
                <Button variant="contained"  endIcon={<FileDownload/>} sx={{ml:3,flexGrow:0}}>Exportar excel</Button>
            </Box>
            <Grid container rowSpacing={5} spacing={7} sx={{mt:1}}>
                {alumnos.filter((alumno) =>  alumno.Alumno.nombrecompleto.includes(filtro)).map((alumno) => (
                    <Grid key={alumno.Alumno.id} item xl={3} lg={4} md={6} sm={12}>
                        <Card >
                            <Box display={ "flex" } sx={{justifyContent: "center"}}>
                                <Avatar src={alumno.Alumno.foto} sx={{ width: 150, height: 150 }}/>    
                            </Box>
                            <CardContent>
                                <Box sx={{height: 70}}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {alumno.Alumno.nombrecompleto}
                                    </Typography>
                                </Box>
                                <Typography mt={1}>
                                    <b>Carrera:</b> {alumno.Alumno.Carrera.nombre}
                                </Typography>
                                
                                <Typography mt={1}>
                                    <b>No. Control:</b> {alumno.Alumno.no_control}
                                </Typography>
                                <Collapse in={expand === alumno.Alumno.id}>
                                        <Typography mt={1}>
                                            <b>Sexo: </b>{alumno.Alumno.sexo === 'H'?'Hombre':'Mujer'}
                                        </Typography>
                                        <Typography mt={1}>
                                            <b>Domicilio: </b>{alumno.Alumno.domicilio}
                                        </Typography>
                                        <Typography mt={1}>
                                            <b>Telefono: </b>{alumno.Alumno.telefono}
                                        </Typography>
                                        <Typography mt={1}>
                                            <b>Periodo: </b>{alumno.Alumno.periodo}
                                        </Typography>
                                        <Typography mt={1}>
                                            <b>Semestre: </b>{alumno.Alumno.semestre}
                                        </Typography>
                                        <Typography mt={1}>
                                            <b>No. de creditos aprobados: </b>{alumno.Alumno.porcentaje_creditos_a}
                                        </Typography>
                                </Collapse>
                                <CardActions sx={{display: "flex", justifyContent: "center", alignItems: "center", mt:2}}>
                                    <Button variant="contained" onClick={() => { ExpandirCard(alumno.Alumno.id)}}>{expand === alumno.Alumno.id ?'ver menos':'Leer mas'}</Button>
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