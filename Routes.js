import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './views/Auth/Login'
import SignUp from './views/Auth/SignUp'
import Spaces from './views/Space/Index'
import ShowSpace from './views/Space/Show'
import SpaceForm from './views/Space/Form'
import RoomForm from './views/Room/Form'
import ToolForm from './views/Tool/Form'

const Routes = () => (
    <Router>
        <Scene key="root" style>
            <Scene key="login" component={Login} title="Iniciar Sesión" />
            <Scene key="signUp" component={SignUp} title="Crear Cuenta" />

            <Scene key="spacesIndex" component={Spaces} title="Facultades" initial={true}/>
            <Scene key="showSpace" component={ShowSpace} title />
            <Scene key="createSpace" component={SpaceForm} title="Crear Espacio" />
            <Scene key="editSpace" component={SpaceForm} title="Editar Espacio" />

            <Scene key="createRoom" component={RoomForm} title="Crear Sala" />

            <Scene key="createTool" component={ToolForm} title="Crear Herramienta" />
        </Scene>
    </Router>
)

export default Routes