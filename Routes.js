import React, {Component} from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './views/Auth/Login'
import SignUp from './views/Auth/SignUp'
import Spaces from './views/Space/Index'
import ShowSpace from './views/Space/Show'
import SpaceForm from './views/Space/Form'
import RoomForm from './views/Room/Form'
import ShowRoom from './views/Room/Show'
import ToolForm from './views/Tool/Form'
import ShowTool from './views/Tool/Show'
import ReservationForm from './views/Reservation/Form'
const SessionService = require('./services/sessionService');
const sessionService = new SessionService();

export default class Routes extends Component {
    _isMounted = false;

    state = {
        currentUser: undefined
    };

    componentDidMount() {
        this._isMounted = true;
        sessionService.getCurrentUser().then(response => {
            if (response.status === 'success' && this._isMounted) {
                this.setState({ currentUser: response.currentUser });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { currentUser } = this.state;

        return (this._isMounted &&
            <Router>
                <Scene key='root'>
                    <Scene key='login' component={Login} title='Iniciar Sesión' initial={true}/>
                    <Scene key='signUp' component={SignUp} title='Crear Cuenta' />

                    <Scene key='spacesIndex' component={Spaces} title='Facultades' currentUser={currentUser}/>
                    <Scene key='showSpace' component={ShowSpace} title />
                    <Scene key='createSpace' component={SpaceForm} title='Crear Espacio' />
                    <Scene key='editSpace' component={SpaceForm} title='Editar Espacio' />

                    <Scene key='createRoom' component={RoomForm} title='Crear Sala' />
                    <Scene key='showRoom' component={ShowRoom} title />

                    <Scene key='createTool' component={ToolForm} title='Crear Herramienta' />
                    <Scene key='showTool' component={ShowTool} title />

                    <Scene key='createReservation' component={ReservationForm} title='Crear Reserva' currentUser={currentUser}/>
                </Scene>
            </Router>
        )
    }
}
