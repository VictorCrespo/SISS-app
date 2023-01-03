import { Buttons } from "../Buttons"
import { InputUser,InputPassword } from "../Inputs"
import { Links } from "../Links"
import './Login.css'

export function Login(){
    return (
        <>
            <div className="grid-container-design">
            <div id="imagen-login" className="flex-center-items-center">
                <div id="imagen-logo"></div>
            </div>
            <div className="grid-container-data">
                <div className="grid-container-create-acount">
                    <div id="crear-cuenta" className="flex-center-items-left">
                        <Buttons text="Crear una nueva cuenta"/>
                    </div>
                </div>
                <div className="flex-center-items-center">
                    <div className="iniciar-session">Inicia Sesión</div>
                </div>
                <div className="flex-center-items-center">
                    <InputUser text={"Usuario"}/>
                </div>
                <div className="flex-center-items-center">
                    <InputPassword text={"Contraseña"}/>
                </div>
                <div className="grid-container-interactions">
                    <div id="flex-button" className="flex-center-items-left">
                        <Buttons text="Ingresar"/>
                    </div>
                    <div id="link" className="flex-center-items-right">
                        <Links text={"olvidaste tu contraseña"}/>
                    </div>
                </div>
            </div> 
        </div>
        </>
    )
}