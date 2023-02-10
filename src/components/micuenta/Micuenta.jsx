import * as React from 'react';

import { 
    Avatar,
    Autocomplete,
    Badge,
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Divider,
    Typography,
    Tooltip  

} from '@mui/material'

import {AddAPhotoOutlined,Save} from '@mui/icons-material';

import ImagenMicuenta from './images/Micuenta.svg'

export function Micuenta() {

    const [sexo, setSex] = React.useState('');

    const [periodo, setPeriodo] = React.useState('');

    const [getImage, setImagen] = React.useState(null);

    const comboSexo = (event) => {
        setSex(event.target.value);
    };
    
    const comboPeriodo = (event) => {
        setPeriodo(event.target.value);
    };

    const Imagen = (event) => {
        setImagen(URL.createObjectURL(event.target.files[0]));
    };

    const carreras = [
        {label: 'Ing. Sistemas Computacionales'},
        {label: 'Ing. Electronica'},
        {label: 'Ing. Mecatronica'}
    ];

    const semestres = [
        {label: 1},
        {label: 2},
        {label: 3},
        {label: 4},
        {label: 5},
        {label: 6},
        {label: 7},
        {label: 8},
        {label: 9},
        {label: 10},
        {label: 11},
        {label: 12},
        {label: 13},
        {label: 14},
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
                                    <IconButton aria-label="upload picture" component="label" sx={{ p: 0 }}>
                                        <input hidden accept="image/*" type="file" onChange={Imagen} />     
                                        <Avatar>
                                            <AddAPhotoOutlined/>
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <Avatar alt= "Remy Sharp" src={getImage} sx={{width: "150px", height: "150px"}} />
                        </Badge>
                    </Stack>
                    <Box display={'flex'} mt={5}>
                        <TextField label="Nombre completo" sx={{width: "70%"}}/>
                        <FormControl sx={{width: "30%", marginLeft: "2%"}}>
                            <InputLabel id="sexo">Sexo</InputLabel>
                            <Select
                            value={sexo}
                            label="Sexo"
                            onChange={comboSexo}
                            >
                            <MenuItem value={'Hombre'}>Hombre</MenuItem>
                            <MenuItem value={'Mujer'}>Mujer</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display={'flex'} mt={5}>
                        <TextField label="Teléfono" sx={{width: "25%"}}/>
                        <TextField label="Dirección" sx={{width: "75%", marginLeft: "2%"}}/>
                    </Box>
                    <Divider textAlign='left' sx={{marginTop: "5%"}}>
                        <Typography variant="h6" color={"#2b0085"} >Datos Escolares</Typography>
                    </Divider>
                    <Box display={'flex'} mt={3}>
                        <TextField label="No. Control" sx={{width: "40%"}}/>
                        <Autocomplete 
                            disablePortal 
                            options={carreras} 
                            sx ={{width: "60%", marginLeft: "2%"}} 
                            renderInput={(params) => <TextField {...params} label="Carrera" />}
                        />
                    </Box>
                    <Box display={'flex'} mt={5}>
                        <FormControl sx={{width: "40%"}}>
                            <InputLabel id='Periodo'>Periodo</InputLabel>
                            <Select
                            value={periodo}
                            label="periodo"
                            onChange={comboPeriodo}
                            >
                            <MenuItem value={'Agosto-Diciembre'}>Agosto-Diciembre</MenuItem>
                            <MenuItem value={'Frebrero-Junio'}>Frebrero-Junio</MenuItem>
                            </Select>
                        </FormControl>
                        <Autocomplete 
                            disablePortal  
                            options={semestres} 
                            sx ={{width: "25%", marginLeft: "2%"}} 
                            renderInput={(params) => <TextField {...params} label="Semestre" />}
                        />
                        <TextField label="Creditos aprobados %" sx={{width: "31%", marginLeft: "2%"}}/>
                    </Box>
                    <Box mt={5} sx={{display: 'flex'}}>
                        <div style={{flexGrow: 1}}/>
                        <Button 
                            variant="contained" 
                            endIcon={<Save/>} 
                            sx={{ flexGrow: 0}}>
                            Guardar
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid xl={7} display={'flex'} sx={{alignItems:'flex-end',justifyContent:'center'}}>
                <Box >
                    <img src={ImagenMicuenta} alt="" style={{width:500, height:500, marginLeft: 200}} />
                </Box>
            </Grid>
        </Grid>
    );
}