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


export function Micuenta() {

    let nuevoregistro = false;

    //Mensaje toast error
    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [openmensaje,setOpenMensaje] = useState(false);

    const [mensaje,setMensaje] = useState('');

    //Componentes cargando algun valor
    const [urlfoto, setUrlFoto] = useState(null);
    
    const [comboCarrera,setcomboCarrera] = useState([]);

    //Valores
    const [foto,setFoto] = useState(null);

    const [nombrecompleto, setNombrecompleto] = useState('');

    const [sexo, setSexo] = useState('');

    const [telefono, setTelefono] = useState('');

    const [direccion, setDireccion] = useState('');

    const [nocontrol, setNocontrol] = useState('');

    const [carrera, setCarrera] = useState(null);

    const [periodo, setPeriodo] = useState('');

    const [semestre, setSemestre] = useState(null);

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
                nuevoregistro = true;
                return
            }
            const data = await response.json()

            setUrlFoto(data.foto)
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
        
        // const data = {
        //     'nombrecompleto': nombrecompleto,
        //     'sexo': sexo,
        //     'domicilio': direccion,
        //     'telefono': telefono,
        //     'foto': foto,
        //     'carrera_id': carrera,
        //     'no_control': nocontrol,
        //     'periodo': periodo,
        //     'semestre': parseInt(semestre),
        //     'porcentaje_creditos_a': parseInt(creditos),
        //     'usuario_id': 1
        // };

        // try {
        //     const response = await fetch('http://localhost:8080/alumnos', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     });

        //     if (!response.ok) {
        //         throw new Error('Error al enviar los datos');
        //     }
            
        //     setMensaje('Datos enviados con éxito');
        //     setOpenMensaje(true);

        // } catch (error) {
        //     setMensajeError(error.message);
        //     setOpenError(true);
        // }
        console.log(comboCarrera)
        console.log(carrera)

    }

    const semestres = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
    ]

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
                                                
                                                setUrlFoto(URL.createObjectURL(event.target.files[0]));
                                            }} 
                                        />     
                                        <Avatar>
                                            <AddAPhotoOutlined/>
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <Avatar alt= "Remy Sharp" src={urlfoto} sx={{width: "150px", height: "150px"}} />
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
                            <MenuItem value={'Hombre'}>Hombre</MenuItem>
                            <MenuItem value={'Mujer'}>Mujer</MenuItem>
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
                        <Autocomplete
                            disablePortal 
                            options={comboCarrera}
                            getOptionLabel={(option) => option.label}
                            sx ={{width: "60%", marginLeft: "2%"}} 
                            renderInput={(params) => <TextField required {...params} label="Carrera" />}
                            onChange={(event, value) => { value && setCarrera(value.id) }}
                        />
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
                        <Autocomplete
                            disablePortal 
                            value={semestre}
                            options={semestres}
                            sx ={{width: "25%", marginLeft: "2%"}} 
                            renderInput={(params) => <TextField required {...params} label="Semestre" />}
                            onChange={(event, value) => { setSemestre(value) }}
                        />
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