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
    Collapse,
    Dialog,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    IconButton,
    MenuItem,
    Tab,
    Tabs,
    TextField,
    Tooltip,
    Typography,
    Select,
    Snackbar,
    Stack,
    Switch
} from '@mui/material'

import {AddAPhotoOutlined} from '@mui/icons-material';

import {  
    DatePicker, 
    LocalizationProvider 
} from '@mui/x-date-pickers/';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import NotImage from './images/Not_image.jpeg'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
            </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function Programas() {

    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [openmensaje,setOpenMensaje] = useState(false);

    const [expandedCard, setExpandedCard] = useState(null);

    //Componentes
    const [combodependencias,setCombodependencias] = useState([]);

    const [combotipoprogramas,setCombotipoprogramas] = useState([]);

    const [combomodalidades,setCombomodalidades] = useState([]);

    const [mensaje,setMensaje] = useState('');
    
    const [imagen,setImagen] = useState(null);

    const [programas,setProgramas] = useState([]);

    const [programa,setPrograma] = useState('');

    const [capacidad,setCapacidad] = useState('');

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

    const [tab, setTab] = useState(0);

    const submit = async () => {

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
                    mensaje = 'tipo de programa creado con éxito'
                }
                else{
                    response = await fetch('http://localhost:8080/programas/'+fila_selecionada, {
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

                setMensaje(mensaje);
                setOpenMensaje(true);
                setEmergente(false)
                setBotones(true)
                getProgramas();
                
            } catch (error) {
                setMensajeError(error.message);
                setOpenError(true);
            }
        }
        else{

            try {
                response = await fetch('http://localhost:8080/programas/'+fila_selecionada,{
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

    const ExpandirCard = (id) => {
        if (expandedCard === id) {
            setExpandedCard(null);
        } else {
            setExpandedCard(id);
        }
    };

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
            console.log(data)
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
            <Box>
                <Grid container rowSpacing={5} spacing={7}>
                    {programas.filter(({nombre}) => nombre.includes(filtro)).map(({id,nombre,fecha_inicio,fecha_fin,imagen}) => (
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
                                        {nombre}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent:"space-between"}}>
                                    <Button size="small" variant="text" onClick={() => ExpandirCard(id)} sx={{color:"white"}}>Leer mas</Button>
                                </CardActions>
                                <Collapse  in={expandedCard === id} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography variant="body2" color={"white"} sx={{mt:2}}>
                                            Fecha de inicio: {moment(fecha_inicio).format("DD/MM/YYYY")}
                                        </Typography>
                                        <Typography variant="body2" color={"white"} sx={{mt:2}}>
                                            Fecha de fin: {moment(fecha_fin).format("DD/MM/YYYY")}
                                        </Typography>
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
                        <Box>
                            <Tabs value={tab} onChange={(event,newValue) =>{ setTab(newValue)}}>
                                <Tab label="Programa" {...a11yProps(0)}/>
                                <Tab label="Actividades" {...a11yProps(1)}/>
                            </Tabs>
                        </Box>
                        <Box>
                            <TabPanel value={tab} index={0}>
                                <Stack direction={"row"} mt={3}>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={
                                            <Tooltip title="Subir Foto">
                                                <IconButton aria-label="upload picture" component="label" sx={{ p: 0, ml: "180px", mt:"40px" }} >
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
                                        <Avatar variant='square' src={imagen} sx={{ml:"7%",width:"480px", height:"150px"}}/>
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
                                            onClick={submit}
                                        >
                                            {emergente_crear ? 'Crear': 'Guardar' }
                                        </Button>
                                    </Box>
                                </Box>
                            </TabPanel>
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