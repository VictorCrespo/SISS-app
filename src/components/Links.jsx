import { Link } from "@mui/material"
import { ThemeProvider} from "@mui/material/styles"
import { Gray } from "./themes/themecofig"
export function Links({text}){
    return(
        <ThemeProvider theme={Gray}>
            <Link href="#" underline="hover">{text}</Link>
        </ThemeProvider>
        
    )
}