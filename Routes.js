import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Spaces from './views/Space/index'
import ShowSpace from './views/Space/show'
import Login from './views/Auth/Login'
import SignUp from './views/Auth/SignUp'

const Routes = () => (
    <Router>
        <Scene key="root" style>
            <Scene key="login" component={Login} title="Iniciar Sesión" />
            <Scene key="signUp" component={SignUp} title="Crear Cuenta" />
            <Scene key="spacesIndex" component={Spaces} title="Facultades" initial={true}/>
            <Scene key="showSpace" component={ShowSpace} title />
        </Scene>
    </Router>
)

export default Routes