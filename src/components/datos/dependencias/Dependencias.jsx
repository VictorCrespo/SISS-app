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

export function Dependencias(){

    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [openmensaje,setOpenMensaje] = useState(false);

    const [mensaje,setMensaje] = useState('');

    const [dependencias,setDependencias] = useState([]);

    const [fila_selecionada, setFila_selecionada] = useState(null);

    const [nombre_selccionado,setNombre_seleccionado] = useState('');

    const [titular,setTitular] = useState('');

    const [puesto,setPuesto] = useState('');

    const [domicilio,setDomicilio] = useState('');

    const [botones,setBotones] = useState(true);

    const [activo,setactivo] = useState(true);

    const [filtro, setFiltro] = useState('');

    // Son de las ventanas emergentes
    
    const [emergente,setEmergente] = useState(false);

    const [emergente_crear,setEmergente_crear] = useState(true);

    const [emergente_activo,setEmergente_activo] = useState(true);

    const [emergente_datos,setEmergente_datos] = useState(true);

    async function getTipos_programas(){
        try {
            const response = await fetch('http://localhost:8080/dependencias?activo='+ (activo ? 1:0))
            const data = await response.json()
            setDependencias(data)
        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
        }
    } 

    const submit = async () => {

        let response,mensaje;

        if (emergente_datos){
            
            let expresionregular = /^[A-Za-z0-9 ]+$/

            if (nombre_selccionado.trim() === '') {
                setMensajeError('La dependencia es obligatorio');
                setOpenError(true);
                return
            }
    
            if (!expresionregular.test(nombre_selccionado)){
                setMensajeError('El tipo de programa tiene caracteres no validos');
                setOpenError(true);
                return
            }

            if (titular.trim() === ''){
                setMensajeError('El titular es obligatorio');
                setOpenError(true);
                return
            }
            
            expresionregular = /^[A-Za-z ]+$/

            if (!expresionregular.test(titular)){
                setMensajeError('El titular tiene caracteres no validos');
                setOpenError(true);
                return
            }

            if (puesto.trim() === ''){
                setMensajeError('El puesto es obligatorio');
                setOpenError(true);
                return
            }

            if(!expresionregular.test(puesto)){
                setMensajeError('El puesto tiene caracteres no validos');
                setOpenError(true);
                return
            }

            if(domicilio.trim() === ''){
                setMensajeError('El domicilio es obligatorio');
                setOpenError(true);
                return
            }

            expresionregular = /^[A-Za-z0-9#. ]+$/

            if(!expresionregular.test(domicilio)){
                setMensajeError('El domicilio tiene caracteres no validos');
                setOpenError(true);
                return
            }

            const data = {
                'nombre': nombre_selccionado,
                'titular': titular,
                'puesto': puesto,
                'domicilio': domicilio,
                'activo': (emergente_activo ? true:false)
            };

            try {
                if (emergente_crear){
                    response = await fetch('http://localhost:8080/dependencias', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    mensaje = 'tipo de programa creado con éxito'
                }
                else{
                    response = await fetch('http://localhost:8080/dependencias/'+fila_selecionada, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    mensaje = 'tipo de programa modificado con éxito'
                }

                if (!response.ok){
                    throw new Error('Error al enviar los datos');
                }

                setFila_selecionada(null);
                setMensaje(mensaje);
                setOpenMensaje(true);
                setEmergente(false)
                setBotones(true)
                getTipos_programas();
                
            } catch (error) {
                setMensajeError(error.message);
                setOpenError(true);
            }
        }
        else{

            try {
                response = await fetch('http://localhost:8080/dependencias/'+fila_selecionada,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                mensaje = 'Se elimino correctamente'

                if (!response.ok){
                    throw new Error('Error al enviar los datos');
                }

                setMensaje(mensaje);
                setOpenMensaje(true);
                setEmergente(false)
                setBotones(true)
                getTipos_programas();

            } catch (error) {
                setMensajeError(error.message);
                setOpenError(true);
            }
        }
    }

    const filaSeleccionar = (id) => {
        if (fila_selecionada === id) {
            setNombre_seleccionado('');
            setTitular('');
            setPuesto('');
            setDomicilio('');
            setBotones(true);
            setFila_selecionada(null);
        } else {
            const seleccionado = dependencias.find((dependencias) => dependencias.id === id );
            setNombre_seleccionado(seleccionado.nombre);
            setTitular(seleccionado.titular);
            setPuesto(seleccionado.puesto);
            setDomicilio(seleccionado.domicilio);
            setEmergente_activo(seleccionado.activo);
            setBotones(false);
            setFila_selecionada(id);
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
                <TextField label={'Dependencia'} sx={{ height:40, flexGrow:1}} onChange={ (event) => {
                    setFiltro(event.target.value)}}
                />
                <Box display={'flex'} alignItems={'end'}>
                    <Button 
                        variant='contained' 
                        sx={{ml:4}} 
                        onClick={ () => 
                            {  
                                setBotones(true); 
                                setFila_selecionada(null);
                                setNombre_seleccionado(''); 
                                setTitular('');
                                setPuesto('');
                                setDomicilio('');
                                setEmergente_activo(true);
                                setEmergente(true); 
                                setEmergente_crear(true); 
                                setEmergente_datos(true); 
                            }
                        }
                    >
                        Nuevo
                    </Button>
                    <Button 
                        variant='contained' 
                        sx={{ml:4}} 
                        onClick={ () => 
                            {   
                                setEmergente(true); 
                                setEmergente_crear(false); 
                                setEmergente_datos(true); 
                            }
                        }
                        disabled={botones}
                    >
                        Editar
                    </Button>
                    <Button 
                        variant='contained' 
                        sx={{ml:4}}
                        onClick = {() => 
                            { 
                                setEmergente(true); 
                                setEmergente_datos(false) 
                            }
                        }
                        disabled={botones}
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
                                    <Typography variant='h6'>Dependencia</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='h6'>Titular</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='h6'>Puesto</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant='h6'>Domicilio</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dependencias.filter(({nombre}) => nombre.includes(filtro)).map(({id,nombre,titular,puesto,domicilio}) => (
                            <TableRow
                                key={id}
                                selected={fila_selecionada === id}
                                onClick={() => filaSeleccionar(id)}
                            >
                                <TableCell padding="checkbox" sx={{borderRight:1}}>
                                    <Checkbox 
                                        color="primary"
                                        checked={fila_selecionada === id}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Typography>{nombre}</Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Typography>{titular}</Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Typography>{puesto}</Typography>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Typography>{domicilio}</Typography>
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
                        <DialogTitle variant='h6' align='center'>
                            {emergente_crear ? 'Crear dependencia': 'Modificar dependencia'}
                        </DialogTitle>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{height:150}}>
                            <TextField 
                                value={nombre_selccionado} 
                                label='Dependencia' 
                                onChange={(event) => { setNombre_seleccionado(event.target.value) }}  
                                sx={{width:300}}
                            />
                            <FormControlLabel 
                                control={
                                    <Switch
                                    checked={emergente_activo}
                                    onChange={ () => { setEmergente_activo(!emergente_activo)}}
                                    />
                                } 
                                label={emergente_activo ? "activo":"inactivo"}
                                sx={{ml:7}}
                            />
                        </Box>
                        <TextField 
                            value={titular} 
                            label='Titular'
                            onChange={(event) => { setTitular(event.target.value) }} 
                            sx={{width:470, ml:8}}
                        />
                        <TextField 
                            value={puesto} 
                            label='Puesto'
                            onChange={(event) => { setPuesto(event.target.value) }}  
                            sx={{width:470, ml:8, mt:6}}
                        />
                        <TextField 
                            value={domicilio} 
                            label='Domicilio'
                            onChange={(event) => { setDomicilio(event.target.value) }}  
                            sx={{width:470, ml:8,mt:6}}
                        />
                        <Box display={'flex'} justifyContent={'center'} sx={{height:70,mt:6}}>
                            <Box>
                                <Button variant='contained' sx={{ml:3}} onClick={submit}>{emergente_crear ? 'Crear': 'Guardar' }</Button>
                            </Box>
                        </Box>
                    </>
                ) : 
                (
                    <>
                        <DialogTitle variant='h5' align='center'>
                            Borrar tipo de programa
                        </DialogTitle>
                        <Box>
                            <Typography variant='h6' align='center'>
                                Estas seguro que deseas borrar la dependencia "{nombre_selccionado}" ?
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
                                    onClick={ () => { setEmergente(false) }}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Box>
                    </>
                )}
            </Dialog>
        </Box>
    )
}