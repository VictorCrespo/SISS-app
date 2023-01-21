import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import Link from "@mui/material/Link"
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography'

import * as React from 'react';

import ThemeProvider from "@mui/material/styles/ThemeProvider"
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {Purple,Gray} from "../themes/themecofig"

import Background from './images/login.jpg'
import Logo from './images/logo.png'


export function LoginRK(){
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <Box sx={{ flexGrow: 1}}>
            <Grid  
                container
                direction="row"
            >
                <Grid item xs={7}>
                    
                </Grid>
                <Grid item xs={5}>
                    <Box>
                        <Box 
                            display={"flex"}
                            marginTop={5}
                            marginLeft={5}
                        >
                            <ThemeProvider theme={Purple}>
                                <Button variant='contained'>Crear cuenta</Button>
                            </ThemeProvider>
                        </Box>
                        <Box
                            marginTop={10}
                            borderRadius={5}
                            marginLeft={5}
                            marginRight={5}
                            boxShadow={" 10px 10px 10px 10px #ccc"}
                        >
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                paddingTop={5}
                            >
                                <Typography variant='h2'>Iniciar Sesion</Typography>
                                <ThemeProvider theme={Purple}>
                                    <TextField 
                                        label="Usuario" 
                                        variant='outlined' 
                                        sx={{width:"60%", marginTop:"3%"}}
                                    />
                                    <FormControl 
                                        variant={"outlined"}  
                                        sx={{width:"60%", marginTop:"3%"}}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label={"Contraseña"}
                                        />
                                    </FormControl>
                                </ThemeProvider>
                            </Box>
                            <Box
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                marginTop={2}
                                paddingBottom={5}
                                width={"60%"}
                                marginLeft={"20%"}
                            >
                                <ThemeProvider theme={Purple}>
                                    <Button variant='contained'>Ingresar</Button>
                                </ThemeProvider>
                                <ThemeProvider theme={Gray}>
                                    <Link href="#" underline="hover">olvidaste tu contraseña</Link>
                                </ThemeProvider>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}