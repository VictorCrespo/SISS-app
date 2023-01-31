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
    MenuItem,
    Tooltip,
    Toolbar,
    Typography,
} from "@mui/material"


import ThemeProvider from "@mui/material/styles/ThemeProvider"

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { Purple } from "./themes/themecofig"

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>pruebas1</h1>
    },
    {
        path: "/pruebas2",
        element: <h1>pruebas2</h1>
    },
    {
        path: "/pruebas3",
        element: <h1>pruebas3</h1>
    },
    {
        path: "/pruebas4",
        element: <h1>pruebas4</h1>
    }
])

export function App(){

    let botones = [
        {
            "text": "pruebas1",
            "path": "/"
        },
        {
            "text": "pruebas1",
            "path": "/"
        },
        {
            "text": "pruebas1",
            "path": "/"
        },
        {
            "text": "pruebas1",
            "path": "/"
        }
    ]

    const drawerWidth = 200;

    /*UserMenu*/
    const profilesettings = ['Cuenta', 'Cerrar sesion'];

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return(
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <ThemeProvider theme={Purple}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography 
                            variant="h4" 
                            component="div" 
                            sx={{ flexGrow: 1 }}
                        >
                            Logo
                        </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Abrir opciones">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                                onClose={handleCloseUserMenu}
                            >
                                {profilesettings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
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
                            {['pruebas1', 'pruebas2', 'pruebas3', 'pruebas4'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                <ListItemButton href='/'>
                                    <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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