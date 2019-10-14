import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Spaces from './views/Space/index'
import showSpace from './views/Space/show'

const Routes = () => (
   <Router>
        <Scene key="root">
            <Scene key="spacesIndex" component={Spaces} title="Spaces" initial={true} />
            <Scene key="showSpace" component={showSpace} title />
        </Scene>
   </Router>
)

export default Routes