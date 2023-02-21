import { useState,useEffect } from 'react';

import {
    Alert,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogTitle,
    FormControlLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Snackbar,
    Switch
} from '@mui/material'

export function Tipos_programas(){

    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [openmensaje,setOpenMensaje] = useState(false);

    const [mensaje,setMensaje] = useState('');

    const [programas,setProgramas] = useState([]);

    const [filaseleecionada, setFilaselecionada] = useState(null);

    const [activo,setactivo] = useState(true);

    const [filtro, setFiltro] = useState('');

    // Son de las ventanas emergentes
    
    const [emergente,setEmergente] = useState(false);

    const [emergente_crear,setEmergente_crear] = useState(true);

    const [emergente_activo,setEmergente_activo] = useState(true);

    const [emergente_datos,setEmergente_datos] = useState(true);

    async function getTipos_programas(){
        try {
            const response = await fetch('http://localhost:8080/tipo_programas?activo='+ (activo ? 1:0))
            const data = await response.json()
            setProgramas(data)
        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
        }
    } 

    const filaSeleccionar = (id) => {
        if (filaseleecionada === id) {
            setFilaselecionada(null);
        } else {
            setFilaselecionada(id);
        }
    }

    const cerrarError = (event, reason) => {
        
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    }

    const cerrarMensaje = (event, reason) => {
        
        if (reason === 'clickaway') {
            return;
        }

        setOpenMensaje(false);
    }

    useEffect( () => {
        getTipos_programas();
    },[activo]);
    
    return(
        <Box>
            <Box display={'flex'} sx={{ height: 55}}>
                <TextField label={'Tipo de programa'} sx={{ height:40, flexGrow:1}} onChange={ (event) => {
                    setFiltro(event.target.value)}}
                />
                <Box display={'flex'} alignItems={'end'}>
                    <Button 
                        variant='contained' 
                        sx={{ml:4}} 
                        onClick={ () => { setEmergente(true); setEmergente_crear(true); setEmergente_datos(true); }}
                    >
                        Nuevo
                    </Button>
                    <Button 
                        variant='contained' 
                        sx={{ml:4}} 
                        onClick={ () => { setEmergente(true); setEmergente_crear(false); setEmergente_datos(true); }}
                    >
                        Editar
                    </Button>
                    <Button 
                        variant='contained' 
                        sx={{ml:4}}
                        onClick = {() => { setEmergente(true); setEmergente_datos(false)}}
                    >
                        Borrar
                    </Button>
                </Box>
            </Box>
            <Box display={'flex'} sx={{mt:3, justifyContent:'end' }}>
            <FormControlLabel 
                control={
                    <Switch 
                        defaultChecked 
                        onChange={ () => { setactivo(!activo)}}
                    />
                } 
                label={activo ? "activos":"inactivos"}
            />
            </Box>
            <Box sx={{mt:1}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{backgroundColor:'#bfa0ff'}}>
                            <TableRow>
                                <TableCell  padding="checkbox"/>
                                <TableCell>
                                    <Typography variant='h6'>Tipo de programa</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {programas.filter(({nombre}) => nombre.includes(filtro)).map(({id,nombre}) => (
                            <TableRow
                                key={id}
                                selected={filaseleecionada === id}
                                onClick={() => filaSeleccionar(id)}
                            >
                                <TableCell padding="checkbox" sx={{borderRight:1}}>
                                    <Checkbox 
                                        color="primary"
                                        checked={filaseleecionada === id}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                <Typography>{nombre}</Typography>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
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
                onClose={() => { setEmergente(false) }}
                maxWidth={'sm'} 
                fullWidth={true}
            >
            {emergente_datos ? 
                (
                    <>
                        <DialogTitle>
                            <Typography variant='h5' align='center'>
                                {emergente_crear ? 'Crear tipo de programa': 'Modificar tipo de programa'}
                            </Typography>
                        </DialogTitle>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{height:150}}>
                            <TextField label='Tipo programa' sx={{width:250}}/>
                            <FormControlLabel 
                                control={
                                    <Switch 
                                    defaultChecked 
                                    onChange={ () => { setEmergente_activo(!emergente_activo)}}
                                    />
                                } 
                                label={emergente_activo ? "activo":"inactivo"}
                                sx={{ml:3}}
                            />
                            <Button variant='contained' sx={{ml:3}}>{emergente_crear ? 'Crear': 'Guardar' }</Button>
                        </Box>
                    </>
                ) : 
                (
                    <>
                        <DialogTitle>
                            <Typography variant='h5' align='center'>Borrar tipo de programa</Typography>
                        </DialogTitle>
                    </>
                )}
            </Dialog>
        </Box>
    )
}