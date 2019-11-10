import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Login from './views/Auth/Login';
import SignUp from './views/Auth/SignUp';
import Spaces from './views/Space/index';
import ShowSpace from './views/Space/show';
import SpaceForm from './views/Space/form';
import RoomForm from './views/Room/Form';

const SessionService = require('./services/sessionService');
const sessionService = new SessionService();

export default class SpaceForm extends Component {
    state = {
        currentUser: undefined
    };

    componentDidMount() {
        sessionService.getCurrentUser().then(response => {
            if (response.status === 'success') {
                this.setState({ currentUser: response.currentUser });
            }
        });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <Router>
                <Scene key="root" style>
                    <Scene key="login" component={Login} title="Iniciar Sesión" />
                    <Scene key="signUp" component={SignUp} title="Crear Cuenta" />

                    <Scene key="spacesIndex" component={Spaces} title="Facultades" initial={true} currentUser={currentUser} />
                    <Scene key="showSpace" component={ShowSpace} title currentUser={currentUser} />
                    <Scene key="createSpace" component={SpaceForm} title="Crear Espacio" currentUser={currentUser} />
                    <Scene key="editSpace" component={SpaceForm} title="Editar Espacio" currentUser={currentUser} />

                    <Scene key="createRoom" component={RoomForm} title="Crear Sala" currentUser={currentUser} />
                </Scene>
            </Router>
        );
    }
}
