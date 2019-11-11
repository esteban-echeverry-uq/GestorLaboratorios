import React, {Component} from 'react';
import {Router, Scene, Drawer, Actions} from 'react-native-router-flux';
import Login from './views/Auth/Login';
import SignUp from './views/Auth/SignUp';
import Spaces from './views/Space/Index';
import ShowSpace from './views/Space/Show';
import SpaceForm from './views/Space/Form';
import RoomForm from './views/Room/Form';
import ShowRoom from './views/Room/Show';
import ToolForm from './views/Tool/Form';
import ShowTool from './views/Tool/Show';
import ReservationForm from './views/Reservation/Form';
import DrawerContent from "./components/DrawerContent";
import MenuButton from "./components/MenuButton";

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

	logout() {
		sessionService.logout().then(response => {
			if (response.status === 'success') {
				this.setState({ currentUser: undefined });
				//Actions.refresh('drawer');
				//Actions.reset('login');
			}
		});
	}

	setCurrentUser(currentUser) {
		//Actions.reset('spacesIndex');
		this.setState({ currentUser });
	}

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { currentUser } = this.state;

        return (this._isMounted &&
            <Router>
                <Scene
					key='root'
					renderRightButton={<MenuButton />}
				>
                    <Scene
						key='login'
						component={Login}
						title='Iniciar Sesión'
						initial={!currentUser}
						setCurrentUser={(currentUser) => this.setCurrentUser(currentUser)}
					/>
                    <Scene
						key='signUp'
						component={SignUp}
						title='Crear Cuenta'
						setCurrentUser={(currentUser) => this.setCurrentUser(currentUser)}
					/>
					<Scene
						key='menuDrawer'
						component={DrawerContent}
						currentUser={currentUser}
						logout={() => this.logout()}
						drawerPosition='right'
					/>

                    <Scene key='spacesIndex' component={Spaces} title='Facultades' initial={currentUser} currentUser={currentUser}/>
                    <Scene key='showSpace' component={ShowSpace} title />
                    <Scene key='createSpace' component={SpaceForm} title='Crear Espacio' />
                    <Scene key='editSpace' component={SpaceForm} title='Editar Espacio' />

                    <Scene key='createRoom' component={RoomForm} title='Crear Sala' />
                    <Scene key='showRoom' component={ShowRoom} title />

                    <Scene key='createTool' component={ToolForm} title='Crear Herramienta' />
                    <Scene key='showTool' component={ShowTool} title />

                    <Scene key='createReservation' component={ReservationForm} title='Crear Reserva' currentUser={currentUser}/>
					<Scene key='myReservations' component={ReservationForm} title='Crear Reserva' currentUser={currentUser}/>
                </Scene>
            </Router>
        )
    }
}
