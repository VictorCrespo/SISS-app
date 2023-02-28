import { useState } from 'react';

import { 
    BrowserRouter as Router, 
    Route, 
    Routes
} from 'react-router-dom'

import {
    AppBar,
    Avatar,
    Box,
    Collapse,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    Tooltip,
    Toolbar
} from "@mui/material"


import ThemeProvider from "@mui/material/styles/ThemeProvider"

import {
    AddTask, 
    AccountCircle,
    Assignment,
    Create,
    ExpandLess,
    ExpandMore,
    HowToReg,
    Logout, 
    School,
    TextSnippet
} from '@mui/icons-material';

import { Purple } from "./themes/themecofig"

import useToken from '../components/App/useToken'

import { Login } from '../components/login/Login';

import { Alumnos_Inscritos } from './alumnos-inscritos/Alumnos-inscritos';

import { Dependencias } from './datos/dependencias/Dependencias';

import { Inscripcion } from './inscripcion/Inscripcion'

import { Micuenta } from './micuenta/Micuenta';

import { Modalidades } from './datos/modalidades/Modalidades'

import { Programas } from './programas/Programas'

import { Tipos_programas } from './datos/tipos-programas/Tipos_programas'

import { Usuarios } from './datos/usuarios/Usuarios'

import { Carreras } from './datos/carreras/Carreras';

import Logo from './image/SISS.png'

export function App(){

    const { token, setToken } = useToken();

    const drawerWidth = 200;

    const [abrirmenu,setAbrirmenu] = useState(false);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const [usuarioid,setUsuarioid] = useState(localStorage.getItem('usuario_id'));

    const abrirMenuPerfil = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const cerrarMenuPerfil = () => {
        setAnchorElUser(null);
    };
    
    const opcionesPerfil = [
        {
            "text": "Cuenta",
            "route": "/mi_cuenta",
            "icon": <AccountCircle/>
        }
    ];

    if(token  === "" || token === undefined) {
        return (
            <ThemeProvider theme={Purple}>
                <Login setToken={setToken} />
            </ThemeProvider>
        )
    }

    return(
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <ThemeProvider theme={Purple}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <a href='/'>
                            <img src={Logo} width = {150}/>
                        </a>
                        <div style={{flexGrow: 1}}/>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Abrir opciones">
                            <IconButton onClick={abrirMenuPerfil} sx={{ p: 0 }}>
                                <Avatar alt="" src="" />
                            </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={cerrarMenuPerfil}
                            >
                                <List>
                                    {opcionesPerfil.map(({ text, route, icon }) => (
                                        <ListItem key={text} disablePadding>
                                            <ListItemButton onClick={cerrarMenuPerfil} href={route}>
                                                <ListItemIcon>
                                                    {icon}
                                                </ListItemIcon>
                                                <ListItemText primary={text} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                    <ListItem disablePadding>
                                        <ListItemButton 
                                            onClick={()=>{localStorage.removeItem('token'); location.reload();}}
                                        >
                                            <ListItemIcon>
                                                <Logout/>
                                            </ListItemIcon>
                                            <ListItemText primary={"Cerrar Session"} />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItemButton href={'/alumnos_inscritos'} >
                                <ListItemIcon>
                                    <HowToReg/>
                                </ListItemIcon>
                                <ListItemText primary={'Alumnos Inscritos'} />
                            </ListItemButton>
                            <ListItemButton href={'/inscripcion'}>
                                <ListItemIcon>
                                    <AddTask/>
                                </ListItemIcon>
                                <ListItemText primary={'Inscripción'} />
                            </ListItemButton>
                            <ListItemButton href={'/programas'}>
                                <ListItemIcon>
                                    <HowToReg/>
                                </ListItemIcon>
                                <ListItemText primary={'Programas'} />
                            </ListItemButton>
                            <ListItemButton onClick={ () => { setAbrirmenu(!abrirmenu) }}>
                                <ListItemIcon>
                                    <TextSnippet/>
                                </ListItemIcon>
                                <ListItemText primary={'Datos'} />
                                {abrirmenu ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>
                            <Collapse in={abrirmenu} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton href='/usuarios' sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <School/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Usuarios'} />
                                    </ListItemButton>
                                    <ListItemButton href='/dependencias' sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <School/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Dependencias'} />
                                    </ListItemButton>
                                    <ListItemButton href='/modalidades' sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <School/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Modalidades'} />
                                    </ListItemButton>
                                    <ListItemButton href='/tipos_programas' sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <School/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Tipo de programas'} />
                                    </ListItemButton>
                                    <ListItemButton href='/carreras' sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <School/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Carreras'} />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Toolbar />
                        <Router>
                            <Routes>
                                <Route path="/" element={<h1>home</h1>} />
                                <Route path="/alumnos_inscritos" element={<Alumnos_Inscritos/>} />
                                <Route path="/inscripcion" element={<Inscripcion usuario_id={usuarioid}/>} />
                                <Route path="/mi_cuenta" element={<Micuenta usuarioid={usuarioid}/>} />
                                <Route path="/programas" element={<Programas/>} />
                                <Route path="/tipos_programas" element={<Tipos_programas/>} />
                                <Route path="/usuarios" element={<Usuarios/>} />
                                <Route path="/dependencias" element={<Dependencias/>}/>
                                <Route path="/modalidades" element={<Modalidades/>}/>
                                <Route path="/tipo_programas" element={<Tipos_programas/>}/>
                                <Route path="/carreras" element={<Carreras/>}/>
                            </Routes>
                        </Router>
                    </Box>
            </ThemeProvider> 
        </Box>
    )
}