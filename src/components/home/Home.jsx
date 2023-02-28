import { useState,useEffect } from "react"

import {
    Alert, 
    Box, 
    Typography,
    Snackbar,
    Link
} from "@mui/material"


export function Home({usuario_id}){

    const [micuenta,setMicuenta] = useState(false);

    const [Inscripcion,setInscripcion] = useState(false);

    const [texto,setTexto] = useState('Hola bebe');

    const [openerror,setOpenError] = useState(false);

    const [mensajeerror,setMensajeError] = useState('');

    const [openmensaje,setOpenMensaje] = useState(false);

    const [mensaje,setMensaje] = useState('');

    async function getDatos() {
        try {

            let response = await fetch('http://localhost:8080/usuarios/'+usuario_id)

            let data = await response.json()

            if (data.Alumno.length === 0){
                setMicuenta(true);
                return
            }

            response = await fetch('http://localhost:8080/alumnos/programas?alumno_id='+data.Alumno[0].id)

            data = await response.json()

            if(data.length < 1){
                setInscripcion(true);
                return
            }

        } catch (error) {
            setMensajeError(error.message);
            setOpenError(true);
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

    useEffect( () => {
        getDatos();
    },[]);


    return(
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{height:250}}>
            {micuenta || Inscripcion ? 
            
                (
                    <>
                        <Box display={'flex'} flexDirection={"column"} sx={{backgroundColor:" #f2fa91 "}} justifyContent={'center'} alignItems={'center'}>
                            <Typography variant="h3" sx={{mt:2}}>  
                                Aviso
                            </Typography>
                            <Typography variant="h6" sx={{mt:2,ml:2,mr:2}}>  
                                {micuenta ?
                                        "Parece que aun no haz registrado tus datos puedes hacerlo desde el siguiente enlace"
                                    :
                                        "Parece que aun no te haz registrado en un programa puedes hacerlo desde el siguiente enlace"
                                }
                            </Typography>
                            <Link href={micuenta?"/mi_cuenta":"/inscripcion"} underline="none" sx={{mt:2,mb:2}}>
                                <Typography variant="h6">
                                    {micuenta?"Mi cuenta":"Inscripción"}
                                </Typography>
                            </Link>
                        </Box>
                    </>
                )
                :
                (
                    <>
                        <Box display={'flex'} flexDirection={"column"} sx={{backgroundColor:" #b4fa91 "}} justifyContent={'center'} alignItems={'center'}>
                            <Typography variant="h6" sx={{mt:2,ml:2,mr:2,mb:2}}>  
                                Parece que estas al corriente. Sigue asi!
                            </Typography>
                        </Box>
                    </>
                )
            }
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
    )
}