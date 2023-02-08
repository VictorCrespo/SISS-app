import * as React from 'react';

import { 
    createBrowserRouter,
    RouterProvider 
} from 'react-router-dom'

import {
    AppBar,
    Avatar,
    Box,
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
    Toolbar,
    Typography,
} from "@mui/material"


import ThemeProvider from "@mui/material/styles/ThemeProvider"

import { Create,School,Assignment,AccountCircle,Logout } from '@mui/icons-material';

import { Purple } from "./themes/themecofig"

import { Micuenta } from './micuenta/Micuenta';

import { Inscripcion } from './inscripcion/Inscripcion'

import Logo from './image/SISS.png'

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home</h1>
    },
    {
        path: "/Cuenta",
        element: <Micuenta/>
    },
    {
        path: "/Inscripcion",
        element: <Inscripcion/>
    },
    {
        path: "/Alumnos",
        element: <h1>Alumnos</h1>
    },
    {
        path: "/Programas",
        element: <h1>Programas</h1>
    }
])

export function App(){

    const drawerWidth = 200;

    let botones = [
        {
            "text": "Inscripción",
            "route": "/Inscripcion",
            "icon": <Create/>
        },
        {
            "text": "Alumnos",
            "route": "/Alumnos",
            "icon": <School/>
        },
        {
            "text": "Programas",
            "route": "/Programas",
            "icon": <Assignment/>
        }
    ]

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

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const abrirMenuPerfil = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const cerrarMenuPerfil = () => {
        setAnchorElUser(null);
    };

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
                            {botones.map(({ text, route, icon }) => (
                                <ListItem key={text} disablePadding>
                                <ListItemButton href={route}>
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                                </ListItem>
                            ))}
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