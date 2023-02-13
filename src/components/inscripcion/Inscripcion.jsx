import * as React from 'react';

import { 
    Box,
    Button,
    Card,
    CardActions,
    CardContent, 
    CardMedia,
    Collapse,
    Grid, 
    Typography 
    } from "@mui/material";

import Imagen from "../inscripcion/image/image.jpg"

export function Inscripcion(){

    const [expadir, setExpandir] = React.useState(false);

    const ExpandirCard = () => {
        setExpandir(!expadir);
    };

    let programas = [
        {
            "titulo": "Oficina servicio social",
            "texto": "Apoyo en las oficinas del servicio social atendiendo a gente via correo",
            "image": Imagen
        },
        {
            "titulo": "Oficina servicio social",
            "texto": "Apoyo en las oficinas del servicio social atendiendo a gente via correo",
            "image": Imagen
        },
        {
            "titulo": "Oficina servicio social",
            "texto": "Apoyo en las oficinas del servicio social atendiendo a gente via correo",
            "image": Imagen
        },
        {
            "titulo": "Oficina servicio social",
            "texto": "Apoyo en las oficinas del servicio social atendiendo a gente via correo",
            "image": Imagen
        },
    ];

    return (
            <Box>
                <Grid container rowSpacing={5} spacing={7}>
                    {programas.map(({titulo,texto,image}) => (
                        <Grid item xl={3} lg={4} md={6} sm={12}>
                            <Card 
                                sx={{backgroundColor:"#1e1e1e"}}
                            >
                                <CardMedia  
                                    component="img" 
                                    title="" 
                                    image={image}
                                    height = "150"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" color={"white"} component="div">
                                        {titulo}
                                    </Typography>
                                    <Typography variant="body2" color={"white"}>
                                        {texto}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{justifyContent:"space-between"}}>
                                    <Button size="small" variant="text" onClick={ExpandirCard} sx={{color:"white"}}>Leer mas</Button> 
                                    {/* <Button size="small" variant="contained">Inscribirse</Button>  */}
                                </CardActions>
                                <Collapse  in={expadir} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph color={'white'}>Method:</Typography>
                                        <Typography paragraph color={'white'}>
                                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                            aside for 10 minutes.
                                        </Typography>
                                        <Typography paragraph color={'white'}>
                                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                            large plate and set aside, leaving chicken and chorizo in the pan. Add
                                            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                            stirring often until thickened and fragrant, about 10 minutes. Add
                                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                        </Typography>
                                        <Typography paragraph color={'white'}>
                                            Add rice and stir very gently to distribute. Top with artichokes and
                                            peppers, and cook without stirring, until most of the liquid is absorbed,
                                            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                            mussels, tucking them down into the rice, and cook again without
                                            stirring, until mussels have opened and rice is just tender, 5 to 7
                                            minutes more. (Discard any mussels that don&apos;t open.)
                                        </Typography>
                                        <Typography color={'white'}>
                                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                                        </Typography>
                                        <CardActions sx={{justifyContent:'center', marginTop:2}}>
                                            <Button size="small" variant="contained" sx={{backgroundColor: "#a7a7a7"}}>Inscribirse</Button> 
                                        </CardActions>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        
    )
}