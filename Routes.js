import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Spaces from './views/Space/index'

const Routes = () => (
   <Router>
      <Scene key="root">
         <Scene key="spaces" component={Spaces} title="Spaces" initial={true} />
      </Scene>
   </Router>
)
export default Routes