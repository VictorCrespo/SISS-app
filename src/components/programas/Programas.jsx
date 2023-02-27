import { useState,useEffect } from 'react';

import moment from 'moment';

import PropTypes from 'prop-types';

import {
    Alert,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardActions,
    CardContent, 
    CardMedia,
    Checkbox,
    Collapse,
    Dialog,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    IconButton,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
    Select,
    Snackbar,
    Stack,
    Switch
} from '@mui/material'

import {AddAPhotoOutlined,Article,Edit,Delete} from '@mui/icons-material';

import {  
    DatePicker, 
    LocalizationProvider 
} from '@mui/x-date-pickers/';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import NotImage from './images/Not_image.jpeg'

export function Programas() {
    //Componentes
    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [openmensaje,setOpenMensaje] = useState(false);

    const [expandedCard, setExpandedCard] = useState(null);

    const [activo,setactivo] = useState(true);

    const [filtro, setFiltro] = useState('');

    const [combodependencias,setCombodependencias] = useState([]);

    const [combotipoprogramas,setCombotipoprogramas] = useState([]);

    const [combomodalidades,setCombomodalidades] = useState([]);

    const [mensaje,setMensaje] = useState('');

    //Valores
    const [programa_seleccionado, setPrograma_seleccionado] = useState(null);
    
    const [imagen,setImagen] = useState(null);

    const [programas,setProgramas] = useState([]);

    const [programa,setPrograma] = useState('');

    const [capacidad,setCapacidad] = useState('');

    const [dependencia,setDependencia] = useState('');

    const [tipoprograma,setTipoprograma] = useState('');

    const [modalidad,setModalidad] = useState('');

    const [fecha_inicio,setFecha_inicio] = useState('');

    const [fecha_final,setFecha_final] = useState('');

    //  ventanas emergentes
    const [emergente,setEmergente] = useState(false);

    const [emergente_actividades,setEmergente_actividades] = useState(false);

    const [emergente_crear,setEmergente_crear] = useState(true);

    const [emergente_activo,setEmergente_activo] = useState(true);

    const [emergente_datos,setEmergente_datos] = useState(true);

    const [emergente_programa, setEmergente_programa] = useState(true);

    const [actividad,setActividad] = useState('');

    const [actividades,setActividades] = useState([]);

    const [actividad_seleccionada, setActividad_seleccionada] = useState(null);

    const [botones,setBotones] = useState(true);

    const submitPrograma = async () => {

        let response,mensaje;
        
        if (emergente_datos){
            
            let expresionregular = /^[A-Za-z0-9 ]+$/

            if (programa.trim() === '') {
                setMensajeError('El tipo de programa es obligatorio');
                setOpenError(true);
                return
            }
    
            if (!expresionregular.test(programa)){
                setMensajeError('El tipo de programa tiene caracteres no validos');
                setOpenError(true);
                return
            }

            if (capacidad.trim() === ''){
                setMensajeError('La capacidad es obligatoria');
                setOpenError(true);
                return
            }

            expresionregular = /^[0-9]+$/

            if (!expresionregular.test(capacidad)){
                setMensajeError('La capacidad tiene caracteres no validos');
                setOpenError(true);
                return
            }
            
            if (parseInt(capacidad) < 1){
                setMensajeError('La capacidad no puede cero o menor');
                setOpenError(true);
                return
            }

            if (dependencia === null){
                setMensajeError('La dependencia es obligatoria');
                setOpenError(true);
                return
            }

            if (tipoprograma === null){
                setMensajeError('El tipo de programa es obligatorio');
                setOpenError(true);
                return
            }

            if (modalidad === null){
                setMensajeError('La modalidad es obligatoria');
                setOpenError(true);
                return
            }

            if (fecha_inicio.trim() === ''){
                setMensajeError('La fecha inicial es obligatoria');
                setOpenError(true);
                return
            }

            if (fecha_final.trim() === ''){
                setMensajeError('La fecha final es obligatoria');
                setOpenError(true);
                return
            }

            if (parseInt(fecha_inicio) > parseInt(fecha_final)){
                setMensajeError('La fecha inicio no puede ser mayor a la fecha final');
                setOpenError(true);
                return
            }

            const data = {
                'imagen': imagen,
                'nombre': programa,
                'capacidad': parseInt(capacidad),
                'dependencia_id': parseInt(dependencia),
                'tipo_programa_id': parseInt(tipoprograma),
                'modalidad_id': parseInt(modalidad),
                'fecha_inicio': fecha_inicio,
                'fecha_fin': fecha_final,
                'activo': (emergente_activo ? true:false)
            }; 

            try {
                if (emergente_crear){
                    response = await fetch('http://localhost:8080/programas', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    mensaje = 'Programa creado con éxito'
                }
                else{
                    response = await fetch('http://localhost:8080/programas/'+programa_seleccionado, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    mensaje = 'Programa modificado con éxito'
                }

                if (!response.ok){
                    throw new Error('Error al enviar los datos');
                }

                setMensaje(mensaje);
                setOpenMensaje(true);
                setEmergente(false)
                getProgramas();
                
            } catch (error) {
                setMensajeError(error.message);
                setOpenError(true);
            }
        }
        else{

            try {
                response = await fetch('http://localhost:8080/programas/'+programa_seleccionado,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                mensaje = 'Programa eliminado correctamente '

                if (!response.ok){
                    throw new Error('Error al enviar los datos');
                }

                setMensaje(mensaje);
                setOpenMensaje(true);
                setEmergente(false)
                getProgramas();

            } catch (error) {
                setMensajeError(error.message);
                setOpenError(true);
            }
        }
    }

    const submitActividad = async () => {

        let response,mensaje;
        
        if (emergente_datos){
            
            let expresionregular = /^[A-Za-z0-9 ]+$/

            if (actividad.trim() === '') {
                setMensajeError('La actividad es obligatorio');
                setOpenError(true);
                return
            }
    
            if (!expresionregular.test(actividad)){
                setMensajeError('La actividad tiene caracteres no validos');
                setOpenError(true);
                return
            }

            const data = {
                'descripcion': actividad,
                'programa_id': parseInt(programa_seleccionado)
            }; 

            try {
                if (emergente_crear){
                    response = await fetch('http://localhost:8080/actividades', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    mensaje = 'Actividad creada con éxito'
                }
                else{
                    response = await fetch('http://localhost:8080/actividades/'+actividad_seleccionada, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    mensaje = 'Actividad modificada con éxito'
                }

                if (!response.ok){
                    throw new Error('Error al enviar los datos');
                }

                setMensaje(mensaje);
                setOpenMensaje(true);
                setEmergente_actividades(false);
                setEmergente(false)
                getProgramas();

            } catch (error) {
                setMensajeError(error.message);
                setOpenError(true);
            }
        }
        else{

            try {
                response = await fetch('http://localhost:8080/actividades/'+actividad_seleccionada,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                mensaje = 'Actividad eliminado correctamente '

                if (!response.ok){
                    throw new Error('Error al enviar los datos');
                }

                setMensaje(mensaje);
                setOpenMensaje(true);
                setEmergente(false)
                getProgramas();

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

    const ExpandirCard = (id) => {
        if (expandedCard === id) {
            setExpandedCard(null);
        } else {
            setExpandedCard(id);
        }
    };

    const programaSeleccionar = (id,programa) => {

        const seleccionado = programas.find((programas) => programas.id === id)
        setPrograma_seleccionado(seleccionado.id);

        if (programa){
            setImagen(seleccionado.imagen ? seleccionado.imagen: '');
            setPrograma(seleccionado.nombre);
            setEmergente_activo(activo);
            setCapacidad(seleccionado.capacidad.toString());
            setDependencia(seleccionado.dependencia_id.toString());
            setTipoprograma(seleccionado.tipo_programa_id.toString());
            setModalidad(seleccionado.modalidad_id.toString());
            setFecha_inicio(moment(seleccionado.fecha_inicio).format('YYYYMMDD'));
            setFecha_final(moment(seleccionado.fecha_fin).format('YYYYMMDD'));
        }else{
            setActividades(seleccionado.Actividad);
        }

};

    const actividadSeleccionar = (id) => {
        
        if (actividad_seleccionada === id) {
            setEmergente_crear(true);
            setActividad('');
            setBotones(true);
            setActividad_seleccionada(null);

        } else {
            const seleccionado = programas.find((programa) => programa.Actividad.find((actividad) => actividad.id === id));
            const actividad = seleccionado.Actividad.find((actividad)=> actividad.id === id)
            setEmergente_crear(false);
            setActividad(actividad.descripcion);
            setBotones(false);
            setActividad_seleccionada(id);
        }
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

    async function getProgramas () {
        try {
            const response = await fetch('http://localhost:8080/programas?activo='+(activo ? 1:0))
            const data = await response.json()
            setProgramas(data)
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

    useEffect( () => {
        getDependencias();
        getTipo_Programas();
        getModalidades();
    },[]);

    useEffect( () => {
        getProgramas();
    },[activo]);


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
                                setEmergente_activo(true); 
                                setEmergente_programa(true);
                                setBotones(true);
                                setImagen('');
                                setPrograma('');
                                setEmergente_activo(activo);
                                setCapacidad('');
                                setDependencia('');
                                setTipoprograma('');
                                setModalidad('');
                                setFecha_inicio('');
                                setFecha_final('');
                                setEmergente_crear(true); 
                                setEmergente_datos(true);
                                setEmergente(true); 
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
            <Box>
                <Grid container rowSpacing={5} spacing={7}>
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
                                            onClick={ () => ExpandirCard(id)} sx={{color:"white"}}
                                        >
                                            Leer mas
                                        </Button>
                                    </Tooltip>
                                    <Stack direction="row" spacing={1}>
                                        <Tooltip title="Actividades">
                                            <IconButton onClick={ () => {
                                                    setEmergente_programa(false);
                                                    programaSeleccionar(id,false)
                                                    setEmergente_crear(true);
                                                    setEmergente_datos(true);
                                                    setBotones(true);
                                                    setActividad_seleccionada(null);
                                                    setActividad('');
                                                    setEmergente(true); 
                                                }}
                                            >
                                                <Article sx={{color:'white'}}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Editar programa">
                                            <IconButton onClick={ () => { 
                                                    setEmergente_programa(true);
                                                    programaSeleccionar(id,true)
                                                    setEmergente_crear(false); 
                                                    setEmergente_datos(true);
                                                    setEmergente(true); 
                                                }}
                                            >
                                                <Edit sx={{color: 'white'}}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Borrar programa">
                                            <IconButton onClick={() =>{
                                                    programaSeleccionar(id,true)
                                                    setEmergente_programa(true);
                                                    setEmergente_crear(false); 
                                                    setEmergente_datos(false);
                                                    setEmergente(true); 
                                                }}
                                            >
                                                <Delete sx={{color: 'white'}}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
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
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
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
                onClose={() => { setEmergente(false); setEmergente_actividades(false); }}
                maxWidth={'sm'} 
                fullWidth={true}
            >
            {emergente_datos ? 
                (
                    <>
                        {emergente_programa ? 
                            (
                                <Box>
                                    <DialogTitle variant='h6' align='center'>
                                        {emergente_crear ? 'Crear Programa': 'Modificar Programa'}
                                    </DialogTitle>
                                    <Stack direction={"row"} mt={3}>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={
                                            <Tooltip title="Subir Foto">
                                                <IconButton aria-label="upload picture" component="label" sx={{ p: 0, ml: "200px", mt:"40px" }} >
                                                    <input 
                                                        hidden 
                                                        accept="image/*" 
                                                        type="file" 
                                                        onChange={(event) => {
                                                            
                                                            const reader = new FileReader();
                                                            
                                                            reader.onload = function () {
                                                                setImagen(reader.result);
                                                            }
                                                            reader.readAsDataURL(event.target.files[0]);
                                                        }} 
                                                    />     
                                                    <Avatar sx={{backgroundColor: "#6030c4"}}>
                                                        <AddAPhotoOutlined/>
                                                    </Avatar>
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    >
                                        <Avatar variant='square' src={imagen} sx={{ml:"8%",width:"520px", height:"150px"}}/>
                                    </Badge>
                                    </Stack>
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{mt:"7%"}}>
                                        <TextField 
                                            value={programa}
                                            label='Programa' 
                                            onChange={(event)=>{ setPrograma(event.target.value)}}
                                            sx={{width:"56%"}}
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Switch
                                                checked={emergente_activo}
                                                onChange={ () => { setEmergente_activo(!emergente_activo)}}
                                                />
                                            } 
                                            label={emergente_activo ? "activo":"inactivo"}
                                            sx={{ml:"10%"}}
                                        />
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{mt:"7%"}}>
                                        <TextField
                                            value={capacidad} 
                                            label='Capacidad'
                                            onChange={(event) => { setCapacidad(event.target.value)}}
                                            sx={{width:"27%"}}
                                        />
                                        <FormControl sx ={{width: "56%", marginLeft: "3%"}}>
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
                                        <FormControl sx ={{width: "42%"}}>
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
                                        <FormControl sx ={{width: "42%", ml: "2%"}}>
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
                                                    (params) => <TextField {...params} required error={false} sx={{width: "42%"}}/>
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
                                                    (params) => <TextField {...params} required error={false} sx={{ml: "2%", width: "42%"}} />}
                                            />
                                        </LocalizationProvider> 
                                    </Box>
                                    <Box display={'flex'} justifyContent={'center'} sx={{height:55,mt:"7%"}}>
                                        <Box>
                                            <Button 
                                                variant='contained' 
                                                sx={{ml:3}} 
                                                onClick={submitPrograma}
                                            >
                                                {emergente_crear ? 'Crear': 'Guardar' }
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            ):
                            (
                                <Box>
                                    <DialogTitle variant='h6' align='center'>
                                        {emergente_crear ? 'Crear Actividades': 'Modificar Actividades'}
                                    </DialogTitle>
                                    <Box display={'flex'} justifyContent={'center'} sx={{mt:3}}>
                                    <Button 
                                        variant='contained' 
                                        sx={{ml:4}} 
                                        onClick={ () => 
                                            {  
                                                setBotones(true);
                                                setActividad_seleccionada(null);
                                                setActividad('');
                                                setEmergente_datos(true);
                                                setEmergente_crear(true);
                                                setEmergente_actividades(!emergente_actividades);
                                                
                                            }
                                        }
                                    >
                                        {emergente_crear?'Nuevo':'Editar'}
                                    </Button>
                                    <Button 
                                        variant='contained'
                                        disabled = {botones} 
                                        sx={{ml:4}}
                                        onClick = {() => 
                                            { 
                                                setEmergente_datos(false);
                                            }
                                        }
                                    >
                                        Borrar
                                    </Button>
                                    </Box>
                                    <Collapse in={emergente_actividades} timeout="auto" unmountOnExit>
                                        <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} sx={{mt:5}}>
                                            <TextField 
                                                value={actividad} 
                                                label='Descripción' 
                                                multiline 
                                                minRows={4} 
                                                maxRows={4} 
                                                onChange={(event) => { setActividad(event.target.value)}}
                                                sx={{width:"75%",mt:1}}/
                                            >
                                            <Box>
                                                <Button 
                                                    variant='contained' 
                                                    sx={{justifyContent:'end'}}
                                                    onClick={ submitActividad }
                                                >
                                                    {emergente_crear ? 'Crear':'Guardar' }
                                                </Button>
                                            </Box>
                                                
                                        </Box>
                                        
                                    </Collapse>
                                    <Box sx={{mt:1}}>
                                        <TableContainer component={Paper} sx={{mt:5,mb:5,ml:2,mr:2, width:550}}>
                                            <Table aria-label="simple table">
                                                <TableHead sx={{backgroundColor:'#bfa0ff'}}>
                                                    <TableRow>
                                                        <TableCell  padding="checkbox"/>
                                                        <TableCell>
                                                            <Typography variant='h6'>Actividad</Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody sx={{maxHeight: 150}}>
                                                    {actividades.map(({id,descripcion}) =>  (
                                                        <TableRow
                                                            key={id}
                                                            selected={actividad_seleccionada === id}
                                                            onClick={() => actividadSeleccionar(id)}
                                                        >
                                                            <TableCell padding="checkbox" sx={{borderRight:1}}>
                                                                <Checkbox 
                                                                    color="primary"
                                                                    checked={actividad_seleccionada === id}
                                                                />
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                <Typography>{descripcion}</Typography>
                                                            </TableCell>
                                                        </TableRow> 
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Box>
                            )
                        }
                    </>
                ) : 
                (
                    <>
                        {emergente_programa? 
                            (
                                <>
                                    <DialogTitle variant='h5' align='center'>
                                        Borrar programa
                                    </DialogTitle>
                                    <Box>
                                        <Typography variant='h6' align='center'>
                                            Estas seguro que deseas borrar el programa "{programa}" ?
                                        </Typography>
                                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{height:75}}>
                                            <Button 
                                                variant='contained' 
                                                sx={{mr:5}} 
                                                onClick={ submitPrograma }
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
                            )
                            :
                            (
                                <>
                                    <DialogTitle variant='h5' align='center'>
                                        Borrar actividad
                                    </DialogTitle>
                                    <Box>
                                        <Typography variant='h6' align='center'>
                                            Estas seguro que deseas borrar la actividad "{actividad}" ?
                                        </Typography>
                                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{height:75}}>
                                            <Button 
                                                variant='contained' 
                                                sx={{mr:5}} 
                                                onClick={ submitActividad }
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
                    </>
                )
            }
            </Dialog>
        </Box>
    );
}