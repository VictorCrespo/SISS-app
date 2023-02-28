import { useState } from 'react';

import PropTypes from 'prop-types';

import {
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
    Typography
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
    
    console.log(credentials)

    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export function LoginRK({ setToken }){

    const [opciones, setOpciones] = useState(0);

    const [vercontrasenia, setVerContrasenia] = useState(false);

    const [usuario,setUsuario] = useState('');

    const [contrasenia,setContrasenia] = useState('');

    const cambiarTabs = (event, newValue) => {
        setOpciones(newValue);
    };

    const handleClickShowPassword = () => setVerContrasenia((ver) => !ver);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const submit = async () => {
        const token = await loginUser({
            'Nombre':usuario,
            'Contrasena':contrasenia
        });
        setToken(token);
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
                        <Card  sx={{height: "50%",width:"70%"}}>
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
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                    {vercontrasenia ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Contrasenia"
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
                                </TabPanel>
                            </Box>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

LoginRK.propTypes = {
    setToken: PropTypes.func.isRequired
};