import PropTypes from "prop-types"
import { Button } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { Purple,Red } from "./themes/themecofig"

export function Buttons({text,type}){
    
    return(
        <ThemeProvider theme={Purple}>
            <Button variant={type}>{text}</Button>
            <ThemeProvider theme={Red}>
                <Button variant={type}>{text}</Button>
            </ThemeProvider>
        </ThemeProvider>
        
    )
}

Buttons.propTypes = {
    text: PropTypes.string.isRequired
}

Buttons.defaultProps = {
    type: 'contained'
}