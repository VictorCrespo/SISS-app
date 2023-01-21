import * as React from 'react';
import { TextField,OutlinedInput,InputAdornment,IconButton,FormControl,InputLabel } from "@mui/material"
import {Visibility,VisibilityOff } from '@mui/icons-material/';
import { ThemeProvider} from "@mui/material/styles"
import { Purple } from "./themes/themecofig"



export function InputUser({text}){
    return(
        <ThemeProvider theme={Purple}>
            
            <TextField variant="outlined" label={text} sx={{width:"60%"}}/>

        </ThemeProvider>
    )
}

export function InputPassword({text}){

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <ThemeProvider theme={Purple}>
            <FormControl variant={"outlined"}  sx={{width:"60%"}}>
                <InputLabel htmlFor="outlined-adornment-password">{text}</InputLabel>
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
                    label={text}
                />
            </FormControl>
        </ThemeProvider>
    )
}