import { useState } from 'react';

import PropTypes from 'prop-types';

import {
    Alert,
    Box,
    Button,
    Card,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Link,
    OutlinedInput,
    Tab,
    Tabs,
    TextField,
    Typography,
    Snackbar
} from '@mui/material'

import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material'

import Background from './images/login.jpg'
import Logo from './images/logo.png'

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
                    {children}
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

async function loginUser(credentials) {

    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export function Login({ setToken }){

    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [openmensaje,setOpenMensaje] = useState(false);

    const [mensaje,setMensaje] = useState('');

    const [opciones, setOpciones] = useState(0);

    const [vercontrasenia, setVerContrasenia] = useState(false);

    const [vercontraseniac,setVerContraseniac] = useState(false);

    const [verconfirmacion,setVerConfirmacion] = useState(false);

    const [usuario,setUsuario] = useState('');

    const [contrasenia,setContrasenia] = useState('');

    const [usuarioc,setUsuarioc] = useState('');

    const [contraseniac,setContraseniac] = useState('');

    const [confirmacion,setConfirmacion] = useState('');

    const [correo,setCorreo] = useState('');
    
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

    const cambiarTabs = (event, newValue) => {
        setOpciones(newValue);
    };

    const mostrarContrasenia = () => setVerContrasenia((ver) => !ver);

    const mostrarContraseniac = () => setVerContraseniac((ver) => !ver);

    const mostrarConfirmacion = () => setVerConfirmacion((ver) => !ver);

    const mouseDownContrasenia = (event) => {
        event.preventDefault();
    };

    const mouseDownContraseniac = (event) => {
        event.preventDefault();
    };

    const mouseDownConfirmacion = (event) => {
        event.preventDefault();
    };

    const submit = async () => {
    
        let expresionregular = /^[A-Za-z0-9 ]+$/

        if (opciones === 0){

            if(usuario.trim()===''){
                setMensajeError('Ingresa primero el usuario');
                setOpenError(true);
                return
            }

            if (contrasenia.trim()===''){
                setMensajeError('Ingresa primero la contraseña');
                setOpenError(true);
                return
            }

            const token = await loginUser({
                'Nombre':usuario,
                'Contrasena':contrasenia
            });
            setToken(token);

        }else{
            
            if(usuarioc.trim()===''){
                setMensajeError('El campo usuario es obligatorio');
                setOpenError(true);
                return
            }

            if(!expresionregular.test(usuarioc)){
                setMensajeError('El campo usuario tiene caracteres no validos');
                setOpenError(true);
                return
            }

            if(contraseniac.trim()===''){
                setMensajeError('El campo contraseña es obligatorio');
                setOpenError(true);
                return
            }

            if(!expresionregular.test(contraseniac)){
                setMensajeError('El campo contraseña tiene caracteres no validos');
                setOpenError(true);
                return
            }

            if(contraseniac !== confirmacion){
                setMensajeError('Las contraseñas no coiciden');
                setOpenError(true);
                return
            }

            if(correo.trim() === ''){
                setMensajeError('El correo es un campo obligatorio');
                setOpenError(true);
                return
            }

            expresionregular = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

            if(!expresionregular.test(correo)){
                setMensajeError('El correo no es valido');
                setOpenError(true);
                return
            }

            let data = {
                'nombre': usuarioc,
                'contrasena': contraseniac,
                "correo_electronico": correo,
                'activo': true
            }

            try {

                const response = await fetch('http://localhost:8080/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok){
                    throw new Error('Error al enviar los datos');
                }

                const token = await loginUser({
                    'Nombre':usuarioc,
                    'Contrasena':contraseniac
                });
                setToken(token);

            } catch (error) {
                setMensajeError(error.message);
                setOpenError(true);
            }
        }
    };

    return(
        <Box>
            <Grid container>
                <Grid item xs={6} sm={7}>
                    <Box 
                        height={"99.35vh"} 
                        display={'flex'}
                        alignItems={'center'}    
                        justifyContent={'center'}
                        sx={{
                            backgroundImage: 'url('+Background+')', 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <img  height={300}src={Logo}/>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={5}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{height:"100%",backgroundColor: '#f4f6f6'}}>
                        <Card  sx={{width:"70%"}}>
                            <Box>
                                <Tabs value={opciones} onChange={cambiarTabs}  centered>
                                    <Tab label="Iniciar Sesion" {...a11yProps(0)} />
                                    <Tab label="Registrarse" {...a11yProps(1)} />
                                </Tabs>
                                <TabPanel value={opciones} index={0}>
                                    <Box display={'flex'} justifyContent={'center'}>
                                        <Typography variant='h3'>Iniciar Sesión</Typography>
                                    </Box>
                                    <TextField
                                        value={usuario} 
                                        label='Usuario'
                                        onChange={(event)=>{ setUsuario(event.target.value);}}
                                        sx={{width:"94%",mt:5,ml:"3%",mr:"3%"}}
                                    />
                                    <FormControl variant="outlined" sx={{width:"94%",mt:5,ml:"3%",mr:"3%"}}>
                                        <InputLabel 
                                            htmlFor="outlined-adornment-password" 
                                        >
                                            Contraseña
                                        </InputLabel>
                                        <OutlinedInput
                                            type={vercontrasenia ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={mostrarContrasenia}
                                                        onMouseDown={mouseDownContrasenia}
                                                        edge="end"
                                                    >
                                                    {vercontrasenia ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Contrasenia"
                                            value={contrasenia}
                                            onChange={(event) => { setContrasenia(event.target.value);}}
                                        />
                                    </FormControl>
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} sx={{mt:5,ml:"3%",mr:"3%"}}>
                                        <Button 
                                            variant='contained'
                                            onClick={submit} 
                                        >
                                            Ingresar
                                        </Button>
                                        <Link href="" underline="none">Olvidaste tu contraseña</Link>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={opciones} index={1}>
                                    <Box display={'flex'} justifyContent={'center'}>
                                        <Typography variant='h3'>Registrarse</Typography>
                                    </Box>
                                    <TextField 
                                        value={usuarioc}
                                        label='Usuario'
                                        onChange={(event)=>{ setUsuarioc(event.target.value);}}
                                        sx={{width:"94%",mt:5,ml:"3%",mr:"3%"}}
                                    />
                                    <FormControl variant="outlined" sx={{width:"94%",mt:5,ml:"3%",mr:"3%"}}>
                                        <InputLabel 
                                            htmlFor="outlined-adornment-password" 
                                        >
                                            Contraseña
                                        </InputLabel>
                                        <OutlinedInput
                                            type={vercontraseniac ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={mostrarContraseniac}
                                                        onMouseDown={mouseDownContraseniac}
                                                        edge="end"
                                                    >
                                                    {vercontraseniac ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Contrasenia"
                                            value={contraseniac}
                                            onChange={(event) => { setContraseniac(event.target.value);}}
                                        />
                                    </FormControl>
                                    <FormControl variant="outlined" sx={{width:"94%",mt:5,ml:"3%",mr:"3%"}}>
                                        <InputLabel 
                                            htmlFor="outlined-adornment-password" 
                                        >
                                            Confirmar contraseña 
                                        </InputLabel>
                                        <OutlinedInput
                                            type={verconfirmacion ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={mostrarConfirmacion}
                                                        onMouseDown={mouseDownConfirmacion}
                                                        edge="end"
                                                    >
                                                    {verconfirmacion ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Confirmar contraseña "
                                            value={confirmacion}
                                            onChange={(event) => { setConfirmacion(event.target.value);}}
                                        />
                                    </FormControl>
                                    <TextField
                                        value={correo} 
                                        label='Correo'
                                        onChange={(event)=>{ setCorreo(event.target.value);}}
                                        sx={{width:"94%",mt:5,ml:"3%",mr:"3%"}}
                                    />
                                    <Box display={'flex'} justifyContent={'center'}>
                                        <Button 
                                            variant='contained'
                                            onClick={submit} 
                                            sx={{mt:5,ml:"3%",mr:"3%"}}
                                        >
                                            Crear cuenta
                                        </Button>
                                    </Box>
                                </TabPanel>
                            </Box>
                        </Card>
                    </Box>
                </Grid>
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
        </Box>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};