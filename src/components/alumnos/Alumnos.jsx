import * as React from 'react';

import { 
    Avatar,
    Autocomplete,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Divider,
    Typography  

} from '@mui/material'

import { Purple } from "../themes/themecofig"

export function Alumnos() {

    const [sexo, setSex] = React.useState('');

    const [periodo, setPeriodo] = React.useState('');

    const comboSexo = (event) => {
        setSex(event.target.value);
    };
    
    const comboPeriodo = (event) => {
        setPeriodo(event.target.value);
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
        <Box component={"form"}>
            <Divider textAlign='left'>
                <Typography variant="h6" color={"#2b0085"} >Datos Personales</Typography>
            </Divider>
            <Stack direction={"row"} sx={{marginTop: "1%"}}>
                <Avatar alt= "Remy Sharp" sx={{width: "150px", height: "150px"}} />
            </Stack>
            <Box display={'flex'} mt={5} sx={{ minWidth: 120 }}>
                <TextField label="Nombre completo" sx={{width: "30%"}}/>
                <FormControl sx={{width: "10%", marginLeft: "2%"}}>
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
                <TextField label="Teléfono" sx={{width: "15%", marginLeft: "2%"}}/>
                <TextField label="Dirección" sx={{width: "39%", marginLeft: "2%"}}/>
            </Box>
            <Divider textAlign='left' sx={{marginTop: "2%"}}>
                <Typography variant="h6" color={"#2b0085"} >Datos Escolares</Typography>
            </Divider>
            <Box display={'flex'} mt={5} sx={{ minWidth: 120 }}>
                <TextField label="No. Control" sx={{width: "15%"}}/>
                <Autocomplete 
                    isablePortal  
                    options={carreras} 
                    sx ={{width: "25%", marginLeft: "2%"}} 
                    renderInput={(params) => <TextField {...params} label="Carrera" />}
                />
                <FormControl sx={{width: "15%", marginLeft: "2%"}}>
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
                    isablePortal  
                    options={semestres} 
                    sx ={{width: "10%", marginLeft: "2%"}} 
                    renderInput={(params) => <TextField {...params} label="Semestre" />}
                />
                <TextField label="Creditos aprobados %" sx={{width: "27%", marginLeft: "2%"}}/>
            </Box>
        </Box>
    );
}