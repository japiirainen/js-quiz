import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LandingPage } from '../views/Landing'
export const Routes = () => {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={LandingPage}></Route>
         </Switch>
      </Router>
   )
}
