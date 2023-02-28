import React, { useState,useEffect } from 'react';

import {
    Alert, 
    Box,
    Button,
    Card,
    CardActions,
    CardContent, 
    CardMedia,
    Collapse,
    Dialog,
    DialogTitle,
    Grid,
    TextField, 
    Tooltip,
    Typography,
    Snackbar
    } from "@mui/material";

import moment from 'moment';

import NotImage from '../programas/images/Not_image.jpeg'

export function Inscripcion(){

    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [openmensaje,setOpenMensaje] = useState(false);
    
    const [emergente,setEmergente] = useState(false);

    const [mensaje,setMensaje] = useState('');

    const [programas,setProgramas] = useState([]);

    const [alumnoid,setAlumnoid] = useState('');

    const [creacion,setCreacion] = useState(true);

    const [programa_id,setProgramaid] = useState('');

    const [filtro, setFiltro] = useState('');

    const [expandedCard, setExpandedCard] = useState(null);

    const [programa_seleccionado, setPrograma_seleccionado] = useState(null);

    const [nombreprograma,setNombreprograma] = useState('');

    const submit = async () => {

        let response,mensaje;
        
        const data = {
            'alumno_id':parseInt(alumnoid),
            'programa_id': parseInt(programa_seleccionado)
        }

        if(creacion){
            try {
                response = await fetch('http://localhost:8080/alumnos/programas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                mensaje = 'Inscrito al programa con exito'
                setMensaje(mensaje);
                setOpenMensaje(true);
                setExpandedCard(null);
                setEmergente(false)
            } catch (error) {
                setMensajeError(error.message);
                setOpenError(true);
            }

        }else{
            try {
                response = await fetch('http://localhost:8080/alumnos/'+alumnoid+'/programas/'+programa_id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                mensaje = 'Cambiado de programa con exito'
                setMensaje(mensaje);
                setOpenMensaje(true);
                setExpandedCard(null);
                setEmergente(false)
            } catch (error) {
                setMensajeError(error.message);
                setOpenError(true);
            }
        }
        
    }

    const programaSeleccionar = (id) => {
        
        const seleccionado = programas.find((programas) => programas.id === id)
        setPrograma_seleccionado(seleccionado.id);
        setNombreprograma(seleccionado.nombre);
    };

    const ExpandirCard = (id) => {
        if (expandedCard === id) {
            setExpandedCard(null);
        } else {
            setExpandedCard(id);
        }
    };

    const cerrarError = (event, reason) => {
        
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };

    const cerrarMensaje = (event, reason) => {
        
        if (reason === 'clickaway') {
            return;
        }

        setOpenMensaje(false);
    };

    async function getProgramas () {
        try {
            const response = await fetch('http://localhost:8080/programas?activo=1')
            const data = await response.json()
            setProgramas(data)
        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
        }
    }

    async function getAlumnosProgramas () {
        try {
            let response = await fetch('http://localhost:8080/usuarios/2')
            let data = await response.json()

            if(data.length < 1){
                return
            }

            setAlumnoid(data.Alumno[0].id);
            response = await fetch('http://localhost:8080/alumnos/programas?alumno_id='+data.Alumno[0].id)

            data = await response.json()

            if(data.length < 1){
                return
            }

            setProgramaid(data[0].programa_id);
        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
        }
    }

    useEffect( () => {
        getAlumnosProgramas();
        getProgramas();
    },[]);

    return (
        <Box>
            <TextField 
                label={'Programas'} 
                onChange={ (event) => {
                    setFiltro(event.target.value)
                }}
                sx={{width:"50%"}}
            />
            <Grid container rowSpacing={5} spacing={7} sx={{mt:3}}>
                {programas.filter(({nombre}) => nombre.includes(filtro)).map((
                    {id,nombre,fecha_inicio,fecha_fin,imagen,Dependencia,capacidad},index) => (
                    <Grid item xl={3} lg={4} md={6} sm={12} key={id}>
                        <Card
                            sx={{backgroundColor:"#797880d1"}}
                        >
                            <CardMedia  
                                component="img" 
                                src={imagen ? imagen:NotImage}
                                height = "150"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" color={"white"} component="div">
                                    <b>{nombre}</b>
                                </Typography>
                            </CardContent>
                            <CardActions sx={{justifyContent:"space-between"}}>
                                <Tooltip title="Ver información del programa">
                                    <Button 
                                        size="small" 
                                        variant="text" 
                                        onClick={ () => {ExpandirCard(id);  programaSeleccionar(id);} } sx={{color:"white"}}
                                    >
                                        Leer mas
                                    </Button>
                                </Tooltip>
                            </CardActions>
                            <Collapse  in={expandedCard === id} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography  color={"white"} sx={{mt:2}}>
                                        <b>Dependencia:</b> {Dependencia.nombre}
                                    </Typography>
                                    <Typography  color={"white"} sx={{mt:2}}>
                                        <b>Capacidad:</b> {capacidad}
                                    </Typography>
                                    <Typography  color={"white"} sx={{mt:2}}>
                                        <b>Direccion:</b> {Dependencia.domicilio}
                                    </Typography>
                                    <Typography  color={"white"} sx={{mt:2}}>
                                        <b>Fecha de inicio:</b> {moment(fecha_inicio).format("DD/MM/YYYY")}
                                    </Typography>
                                    <Typography color={"white"} sx={{mt:2}}>
                                        <b>Fecha de fin:</b> {moment(fecha_fin).format("DD/MM/YYYY")}
                                    </Typography>
                                    
                                    {programas[index].Actividad.map(({descripcion,id},index) => (
                                        
                                        <Typography key={id} color={"white"} sx={{mt:2}}>
                                            {"Actividad "+(index+1)+": "}{descripcion}
                                        </Typography>
                                    ))}
                                    <CardActions sx={{justifyContent:'center', marginTop:2}}>
                                            <Button 
                                                size="small" 
                                                variant="contained"
                                                onClick={()=>{
                                                    if (programa_id === ''){
                                                        setCreacion(true);
                                                        setEmergente(true);
                                                    }else{
                                                        if(programa_id === programa_seleccionado){
                                                            setMensajeError('No puedes inscribirte al mismo programa');
                                                            setOpenError(true);
                                                            return
                                                        }
                                                        setCreacion(false);
                                                        setEmergente(true);
                                                    }
                                                    
                                                }}
                                            >
                                                Inscribirse
                                            </Button> 
                                    </CardActions>
                                </CardContent>
                            </Collapse>
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
            <Snackbar 
                open={openmensaje} 
                autoHideDuration={6000} 
                anchorOrigin={{vertical:'bottom',horizontal:'right'}}
                spacing={2} 
                sx={{ width: '25%' }}
                onClose={cerrarMensaje}
                >
                <Alert onClose={cerrarMensaje} severity='success' sx={{ width: '100%' }}>
                    {mensaje}
                </Alert>
            </Snackbar>
            <Dialog 
                open={emergente} 
                onClose={() => { setEmergente(false);}}
                maxWidth={'sm'} 
                fullWidth={true}
            >
                {creacion? 
                    (
                        <>
                            <DialogTitle variant='h5' align='center'>
                                Inscripción a un programa
                            </DialogTitle>
                            <Box>
                                <Typography variant='h6' align='center'>
                                    Estas seguro de inscribirte al programa "{nombreprograma}" ?
                                </Typography>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{height:75}}>
                                    <Button 
                                        variant='contained' 
                                        sx={{mr:5}} 
                                        onClick={ submit }
                                    >
                                        Aceptar
                                    </Button>
                                    <Button 
                                        variant='contained'
                                        onClick={ () => { setEmergente(false); }}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                            </Box>
                        </>
                    )
                    :
                    (
                        <>
                            <DialogTitle variant='h5' align='center'>
                                Cambiar de programa
                            </DialogTitle>
                            <Box>
                                <Typography variant='h6' align='center'>
                                    Estas seguro de cambiar de programa ?
                                </Typography>
                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{height:75}}>
                                    <Button 
                                        variant='contained' 
                                        sx={{mr:5}} 
                                        onClick={ submit }
                                    >
                                        Aceptar
                                    </Button>
                                    <Button 
                                        variant='contained'
                                        onClick={ () => { setEmergente(false); }}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                            </Box>
                        </>
                    )
                }
            </Dialog>
        </Box>
        
    )
}