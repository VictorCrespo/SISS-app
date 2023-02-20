import { useState, useEffect } from 'react';

import { 
    Alert,
    Autocomplete,
    Avatar,
    Badge,
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
    Divider,
    Typography,
    Tooltip,
} from '@mui/material'

import {AddAPhotoOutlined,Save} from '@mui/icons-material';

import ImagenMicuenta from './images/Micuenta.svg'
import { width } from '@mui/system';


export function Micuenta() {

    const [nuevoregistro,setNuevoregistros] = useState(false);

    //Mensaje toast error
    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [openmensaje,setOpenMensaje] = useState(false);

    const [mensaje,setMensaje] = useState('');

    const [comboCarrera,setcomboCarrera] = useState([]);

    //Valores
    const [foto,setFoto] = useState(null);

    const [nombrecompleto, setNombrecompleto] = useState('');

    const [sexo, setSexo] = useState('');

    const [telefono, setTelefono] = useState('');

    const [direccion, setDireccion] = useState('');

    const [nocontrol, setNocontrol] = useState('');

    const [carrera, setCarrera] = useState('');

    const [periodo, setPeriodo] = useState('');

    const [semestre, setSemestre] = useState('');

    const [creditos, setCreditos] = useState('');

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

    async function getCarreras () {
        try {
            const response = await fetch('http://localhost:8080/carreras')
            const data = await response.json()
            const opciones = data.map(carrera => ({ label: carrera.nombre, id: carrera.id }));
            setcomboCarrera(opciones)
        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
        }
    }

    async function getDatos() {
        try {
            
            const response = await fetch('http://localhost:8080/alumnos/3')
            
            if (response.status === 404){
                setNuevoregistros(true)
                return  
            }

            const data = await response.json()
            console.log(data)
            setFoto(data.foto)
            setNombrecompleto(data.nombrecompleto)
            setSexo(data.sexo)
            setTelefono(data.telefono)
            setDireccion(data.domicilio)
            setNocontrol(data.no_control)
            setCarrera(data.Carrera.id)
            setPeriodo(data.periodo)
            setSemestre(data.semestre.toString())
            setCreditos(data.porcentaje_creditos_a)

        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
        }
    }

    useEffect( () => {
        getCarreras();
        getDatos();
    },[]);

    const submit = async () => {
        
        let expresionregular = /^[A-Za-z ]+$/

        if (!foto){
            setMensajeError('El foto es obligatoria');
            setOpenError(true);
            return
        }

        if (nombrecompleto.trim() === ''){
            setMensajeError('El campo nombre completo es obligatorio');
            setOpenError(true);
            return
        }

        if (!expresionregular.test(nombrecompleto)){
            setMensajeError('El campo nombre completo tiene caracteres no validos');
            setOpenError(true);
            return
        }

        if (sexo.trim() === ''){
            setMensajeError('El campo sexo es campo obligatorio');
            setOpenError(true);
            return
        }

        if (telefono.trim()=== ''){
            setMensajeError('El campo telefono no puede ir vacio');
            setOpenError(true);
            return
        }

        expresionregular = /^[0-9]+$/

        if (!expresionregular.test(telefono)){
            setMensajeError('El campo telefono solo puede tener numeros');
            setOpenError(true);
            return
        }

        if (telefono.length !== 10){
            setMensajeError('El campo telefono solo puede 10 caracteres numericos');
            setOpenError(true);
            return
        }

        if (direccion.trim() === ''){
            setMensajeError('El campo direccion es obligatorio');
            setOpenError(true);
            return
        }

        expresionregular = /^[a-zA-Z0-9#. ]+$/

        if (!expresionregular.test(direccion)){
            setMensajeError('El campo direccion tiene caracteres no validos');
            setOpenError(true);
            return
        }
        
        if (nocontrol.trim() === ''){
            setMensajeError('El campo no. control es obligatorio');
            setOpenError(true);
            return
        }
        
        expresionregular = /^[0-9]+$/

        if (!expresionregular.test(nocontrol)){
            setMensajeError('El campo no. control tiene caracteres no validos');
            setOpenError(true);
            return
        }

        if (nocontrol.length !== 8){
            setMensajeError('El campo no. control solo puede tener 8 caracteres numericos');
            setOpenError(true);
            return
        }

        if (!carrera){
            setMensajeError('El campo carrera es obligatorio');
            setOpenError(true);
            return
        }

        if (periodo.trim()=== ''){
            setMensajeError('El campo periodo es obligatorio');
            setOpenError(true);
            return
        }

        if (!semestre) {
            setMensajeError('El campo semestre es obligatorio');
            setOpenError(true);
            return
        }

        if (!creditos){
            setMensajeError('El campo no creditos aprobados es obligatorio');
            setOpenError(true);
            return
        }

        if (!expresionregular.test(creditos)){
            setMensajeError('El campo no creditos aprobados tiene caracteres no validos');
            setOpenError(true);
            return
        }

        const data = {
            'nombrecompleto': nombrecompleto,
            'sexo': sexo,
            'domicilio': direccion,
            'telefono': telefono,
            'foto': foto,
            'carrera_id': carrera,
            'no_control': nocontrol,
            'periodo': periodo,
            'semestre': parseInt(semestre),
            'porcentaje_creditos_a': parseInt(creditos),
            'usuario_id': 1 //Cambiar el usuario id queda pendiente
        };

        try {

            let response;
            
            if(nuevoregistro){
                response = await fetch('http://localhost:8080/alumnos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }
            else{
                response = await fetch('http://localhost:8080/alumnos', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }
            

            if (!response.ok) {
                throw new Error('Error al enviar los datos');
            }
            
            setMensaje('Datos enviados con éxito');
            setOpenMensaje(true);

        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
        }
    }

    return(
        <Grid container>
            <Grid item xl={5}>
                <Box component={"form"}>
                    <Divider textAlign='left'>
                        <Typography variant="h6" color={"#2b0085"} >Datos Personales</Typography>
                    </Divider>
                    <Stack direction={"row"} mt={3}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <Tooltip title="Subir Foto">
                                    <IconButton aria-label="upload picture" component="label" sx={{ p: 0 }} >
                                        <input 
                                            hidden 
                                            accept="image/*" 
                                            type="file" 
                                            onChange={(event) => {
                                                
                                                const reader = new FileReader();
                                                
                                                reader.onload = function () {
                                                    setFoto(reader.result);
                                                }

                                                reader.readAsDataURL(event.target.files[0]);
                                            }} 
                                        />     
                                        <Avatar>
                                            <AddAPhotoOutlined/>
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <Avatar alt= "Remy Sharp" src={foto} sx={{width: "150px", height: "150px"}} />
                        </Badge>
                    </Stack>
                    <Box display={'flex'} mt={5}>
                        <TextField 
                            id='nombre'
                            value={nombrecompleto}
                            required
                            label="Nombre completo"
                            onChange={ (event) => { setNombrecompleto(event.target.value) }}
                            sx={{width: "70%"}}
                        />
                        <FormControl sx={{width: "30%", marginLeft: "2%"}}>
                            <InputLabel id="sexo" required>Sexo</InputLabel>
                            <Select
                            id='sexo'
                            value={sexo}
                            label="Sexo"
                            onChange={(event) => { setSexo(event.target.value) }}
                            >
                            <MenuItem value={'H'}>Hombre</MenuItem>
                            <MenuItem value={'M'}>Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display={'flex'} mt={5}>
                        <TextField 
                            id='telefono' 
                            value={telefono}
                            required 
                            label="Teléfono" 
                            onChange={(event) => { setTelefono(event.target.value) }} 
                            sx={{width: "25%"}}
                        />
                        <TextField 
                            id='direccion'
                            value={direccion} 
                            required 
                            label="Dirección" 
                            onChange={(event) => { setDireccion(event.target.value) }} 
                            sx={{width: "75%", marginLeft: "2%"}}
                        />
                    </Box>
                    <Divider textAlign='left' sx={{marginTop: "5%"}}>
                        <Typography variant="h6" color={"#2b0085"} >Datos Escolares</Typography>
                    </Divider>
                    <Box display={'flex'} mt={3}>
                        <TextField 
                            id='no_control'
                            value={nocontrol} 
                            required 
                            label="No. Control" 
                            onChange={(event) => { setNocontrol(event.target.value) }} 
                            sx={{width: "40%"}}
                        />
                        <FormControl sx ={{width: "60%", marginLeft: "2%"}}>
                            <InputLabel required>Carrera</InputLabel>
                            <Select
                            value={carrera}
                            label="Carrera"
                            onChange={(event) => { setCarrera(event.target.value) }}
                            MenuProps={{
                                style:{
                                    maxHeight: 160
                                }
                            }}
                            >
                            {comboCarrera.map((option)=> (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display={'flex'} mt={5}>
                        <FormControl sx={{width: "40%"}}>
                            <InputLabel required>Periodo</InputLabel>
                            <Select
                                value={periodo}
                                label="periodo"
                                onChange={(event) => { setPeriodo(event.target.value) }}
                            >
                            <MenuItem value={'Agosto-Diciembre'}>Agosto-Diciembre</MenuItem>
                            <MenuItem value={'Frebrero-Junio'}>Frebrero-Junio</MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx ={{width: "25%", marginLeft: "2%",maxHeight: 50}} >
                            <FormControl sx={{width:"100%"}}>
                                <InputLabel required>Semestre</InputLabel>
                                <Select
                                    value={semestre}
                                    label="semestre"
                                    onChange={(event) => { setSemestre(event.target.value) }}
                                    MenuProps={{
                                        style:{
                                            maxHeight: 180
                                        }
                                    }}
                                >
                                    {Array.from({length:14},(_,index) => (
                                        <MenuItem key={index+1} value={index+1}>
                                        {index+1}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField
                            required
                            value={creditos} 
                            label="No. creditos aprobados" 
                            sx ={{width: "33%", marginLeft: "2%"}}
                            onChange={(event) => { setCreditos(event.target.value) }}  
                        />
                    </Box>
                    <Box mt={5} sx={{display: 'flex'}}>
                        <div style={{flexGrow: 1}}/>
                        <Button 
                            onClick={submit}
                            variant="contained" 
                            endIcon={<Save/>} 
                            sx={{ flexGrow: 0}}>
                            {nuevoregistro ? 'guardar':'guardar cambios'}
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid xl={7} display={'flex'} sx={{alignItems:'flex-end',justifyContent:'center'}}>
                <Box >
                    <img src={ImagenMicuenta} alt="" style={{width:500, height:500, marginLeft: 200}} />
                </Box>
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
        </Grid>     
    );
}