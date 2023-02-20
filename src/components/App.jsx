import { useState } from 'react';

import { 
    createBrowserRouter,
    RouterProvider 
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

import { Micuenta } from './micuenta/Micuenta';

import { Inscripcion } from './inscripcion/Inscripcion'

import { Programas } from './programas/Programas'

import { Alumnos_Inscritos } from './alumnos-inscritos/Alumnos-inscritos';

import Logo from './image/SISS.png'

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home</h1>
    },
    {
        path: "/cuenta",
        element: <Micuenta/>
    },
    {
        path: "/inscripcion",
        element: <Inscripcion/>
    },
    {
        path: "/alumnos_inscritos",
        element: <Alumnos_Inscritos/>
    },
    {
        path: "/programas",
        element: <Programas/>
    }
])

export function App(){

    const drawerWidth = 200;

    const [abrirmenu,setAbrirmenu] = useState(false);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const abrirMenuPerfil = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const cerrarMenuPerfil = () => {
        setAnchorElUser(null);
    };
    
    const opcionesPerfil = [
        {
            "text": "Cuenta",
            "route": "/Cuenta",
            "icon": <AccountCircle/>
        },
        {
            "text": "Cerra sesión",
            "route": "/Login",
            "icon": <Logout/>
        }
    ];

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
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <School/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Alumnos'} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <School/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Dependencias'} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <School/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Modalidades'} />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <School/>
                                        </ListItemIcon>
                                        <ListItemText primary={'Tipo de programas'} />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <RouterProvider router={router}/>
                </Box>
            </ThemeProvider> 
        </Box>
    )
}