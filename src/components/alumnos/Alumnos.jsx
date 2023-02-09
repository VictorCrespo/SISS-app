import { 
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Typography
} from "@mui/material"

export function Alumnos() {

    let alumnos = [
        {
            "Nombre": "Victor Gregorio Cuellar Crespo",
            "Carrera": "Ing. Sistemas Computacionales",
            "Semestre": 14
        },
        {
            "Nombre": "Angel Gregorio Cuellar Crespo",
            "Carrera": "Ing. Mecatronica",
            "Semestre": 1
        },
        {
            "Nombre": "Angelica Elizabeth Cuellar Crespo",
            "Carrera": "Lic. Comunicacion",
            "Semestre": 10
        },
        {
            "Nombre": "Martha Elizabeth Crespo Romero",
            "Carrera": "Lic. Marketing",
            "Semestre": 9
        },
        {
            "Nombre": "Gregorio Cuellar Rojas",
            "Carrera": "ing. Electromecanico",
            "Semestre": 9
        },
        {
            "Nombre": "Martha Elizabeth Crespo Romero",
            "Carrera": "Lic. Marketing",
            "Semestre": 9
        },
        {
            "Nombre": "Gregorio Cuellar Rojas",
            "Carrera": "ing. Electromecanico",
            "Semestre": 9
        },
        
        {
            "Nombre": "Martha Elizabeth Crespo Romero",
            "Carrera": "Lic. Marketing",
            "Semestre": 9
        },
        {
            "Nombre": "Gregorio Cuellar Rojas",
            "Carrera": "ing. Electromecanico",
            "Semestre": 9
        }
    ]

    return(
        <Box>
            <Grid container rowSpacing={5} spacing={7}>
                {alumnos.map(({Nombre,Carrera,Semestre}) => (
                    <Grid item xl={3} lg={4} md={6} sm={12}>
                        <Card >
                            <Box display={ "flex" } sx={{justifyContent: "center"}}>
                                <Avatar sx={{ width: 150, height: 150 }}>
                                </Avatar>
                            </Box>
                            <CardContent>
                                <Box sx={{height: 70}}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {Nombre}
                                    </Typography>
                                </Box>
                                <Typography variant="body2">
                                    Carrera: {Carrera}
                                </Typography>
                                <Typography variant="body2">
                                    Semestre: {Semestre}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Button variant="contained">Leer mas</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}