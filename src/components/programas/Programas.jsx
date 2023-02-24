import { useState,useEffect } from 'react';

import {
    Alert,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Select,
    Snackbar,
    Switch
} from '@mui/material'

import {  
    DatePicker, 
    LocalizationProvider 
} from '@mui/x-date-pickers/';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export function Programas() {

    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [openmensaje,setOpenMensaje] = useState(false);

    //Componentes
    const [combodependencias,setCombodependencias] = useState([]);

    const [combotipoprogramas,setCombotipoprogramas] = useState([]);

    const [combomodalidades,setCombomodalidades] = useState([]);

    const [mensaje,setMensaje] = useState('');

    const [programas,setProgramas] = useState([]);

    const [dependencia,setDependencia] = useState('');

    const [tipoprograma,setTipoprograma] = useState('');

    const [modalidad,setModalidad] = useState('');

    const [fecha_inicio,setFecha_inicio] = useState('');

    const [fecha_final,setFecha_final] = useState('');

    const [botones,setBotones] = useState(true);

    const [activo,setactivo] = useState(true);

    const [filtro, setFiltro] = useState('');

    // Son de las ventanas emergentes
    
    const [emergente,setEmergente] = useState(false);

    const [emergente_crear,setEmergente_crear] = useState(true);

    const [emergente_activo,setEmergente_activo] = useState(true);

    const [emergente_datos,setEmergente_datos] = useState(true);

    const submit = async () => {

        let response,mensaje;

        if (emergente_datos){
            
            let expresionregular = /^[A-Za-z0-9 ]+$/

            if (nombre_selccionado.trim() === '') {
                setMensajeError('El tipo de programa es obligatorio');
                setOpenError(true);
                return
            }
    
            if (!expresionregular.test(nombre_selccionado)){
                setMensajeError('El tipo de programa tiene caracteres no validos');
                setOpenError(true);
                return
            }
            
            const data = {
                'nombre': nombre_selccionado,
                'activo': (emergente_activo ? true:false)
            };

            try {
                if (emergente_crear){
                    response = await fetch('http://localhost:8080/modalidades', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    mensaje = 'tipo de programa creado con éxito'
                }
                else{
                    response = await fetch('http://localhost:8080/modalidades/'+fila_selecionada, {
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
                getModalidades();
                
            } catch (error) {
                setMensajeError(error.message);
                setOpenError(true);
            }
        }
        else{

            try {
                response = await fetch('http://localhost:8080/modalidades/'+fila_selecionada,{
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
                getModalidades();

            } catch (error) {
                setMensajeError(error.message);
                setOpenError(true);
            }
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

    async function getDependencias () {
        try {
            const response = await fetch('http://localhost:8080/dependencias?activo=1')
            const data = await response.json()
            const opciones = data.map(dependencias => ({ label: dependencias.nombre, id: dependencias.id }));
            setCombodependencias(opciones)
        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
        }
    }

    async function getTipo_Programas () {
        try {
            const response = await fetch('http://localhost:8080/tipo_programas?activo=1')
            const data = await response.json()
            const opciones = data.map(tipos_programas => ({ label: tipos_programas.nombre, id: tipos_programas.id }));
            setCombotipoprogramas(opciones)
        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
        }
    }

    async function getModalidades () {
        try {
            const response = await fetch('http://localhost:8080/modalidades?activo=1')
            const data = await response.json()
            const opciones = data.map(modalidades => ({ label: modalidades.nombre, id: modalidades.id }));
            setCombomodalidades(opciones)
        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
        }
    }

    useEffect( () => {
        getDependencias();
        getTipo_Programas();
        getModalidades();
    },[]);

    return (
        <Box>
            <Box display={'flex'} sx={{ height: 55}}>
                <TextField label={'Programas'} sx={{ height:40, flexGrow:1}} onChange={ (event) => {
                    setFiltro(event.target.value)}}
                />
                <Box display={'flex'} alignItems={'end'}>
                    <Button 
                        variant='contained' 
                        sx={{ml:4}} 
                        onClick={ () => 
                            {  
                                setBotones(true); 
                                setEmergente_activo(true); 
                                setEmergente(true); 
                                setEmergente_crear(true); 
                                setEmergente_datos(true); 
                            }
                        }
                    >
                        Nuevo
                    </Button>
                </Box>
            </Box>
            <Box display={'flex'} sx={{mt:3, justifyContent:'end'}}>
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
                            {emergente_crear ? 'Crear programa': 'Modificar programa'}
                        </DialogTitle>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{mt:"5%"}}>
                            <TextField 
                                label='Programa' 
                                sx={{width:"50%"}}
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
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{mt:"7%"}}>
                            <TextField 
                                label='Capacidad'
                                sx={{width:"27%"}}
                            />
                            <FormControl sx ={{width: "50%", marginLeft: "2%"}}>
                                <InputLabel required>Dependencia</InputLabel>
                                <Select
                                    value={dependencia}
                                    label="Dependencia"
                                    onChange={(event) => { setDependencia(event.target.value) }}
                                    MenuProps={{
                                        style:{
                                            maxHeight: 160
                                        }
                                    }}
                                >
                                {combodependencias.map((option)=> (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{mt:"7%"}}>
                            <FormControl sx ={{width: "37%"}}>
                                <InputLabel required>Tipo programa</InputLabel>
                                <Select
                                    value={tipoprograma}
                                    label="Tipo Programa"
                                    onChange={(event) => { setTipoprograma(event.target.value) }}
                                    MenuProps={{
                                        style:{
                                            maxHeight: 160
                                        }
                                    }}
                                >
                                {combotipoprogramas.map((option)=> (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <FormControl sx ={{width: "40%", ml: "2%"}}>
                                <InputLabel required>Modalidad</InputLabel>
                                <Select
                                    value={modalidad}
                                    label="Modalidad"
                                    onChange={(event) => { setModalidad(event.target.value) }}
                                    MenuProps={{
                                        style:{
                                            maxHeight: 160
                                        }
                                    }}
                                >
                                {combomodalidades.map((option)=> (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{mt:"7%"}}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    label="Fecha inicio"
                                    value={fecha_inicio}
                                    inputFormat = "DD/MM/YYYY"
                                    onChange={ (date) => {
                                        setFecha_inicio(date.format('YYYYMMDD'));
                                    }}
                                    renderInput={
                                        (params) => <TextField {...params} required error={false} sx={{width: "38%"}}/>
                                    }
                                    
                                />
                                <DatePicker
                                    label="Fecha final"
                                    value={fecha_final}
                                    inputFormat = "DD/MM/YYYY"
                                    onChange={ (date) => {
                                        setFecha_final(date.format('YYYYMMDD'));
                                    }}
                                    renderInput={
                                        (params) => <TextField {...params} required error={false} sx={{ml: "2%", width: "40%"}} />}
                                />
                            </LocalizationProvider> 
                        </Box>
                        <Box display={'flex'} justifyContent={'center'} sx={{height:70,mt:6}}>
                            <Box>
                                <Button 
                                    variant='contained' 
                                    sx={{ml:3}} 
                                    onClick={() => {submit}}
                                >
                                    {emergente_crear ? 'Crear': 'Guardar' }
                                </Button>
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
                                Estas seguro que deseas Borrar al modalidad "{nombre_selccionado}" ?
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
    );
}