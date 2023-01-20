import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from 'react';

import ThemeProvider from "@mui/material/styles/ThemeProvider"

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

import { Purple } from "../themes/themecofig"

export function Header(){

    const drawerWidth = 240;

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
        <Box 
            sx={{ flexGrow: 1 }}
        >
            <Container maxWidth="xl">
                <ThemeProvider theme={Purple}>
                    <AppBar>
                        <Toolbar>
                            <IconButton 
                                size="large" 
                                edge="start" 
                                color="inherit" 
                                aria-label="menu"
                                onClick={handleDrawerOpen} 
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography 
                                variant="h4" 
                                component="div" 
                                sx={{ flexGrow: 1 }}
                            >
                                Logo
                            </Typography>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
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
                        sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                        }}
                        anchor="left"
                        open={open}
                        onClose={handleDrawerClose}
                    >
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </ThemeProvider> 
            </Container>
        </Box>
    )
}