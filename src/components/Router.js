import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LandingPage } from '../views/Landing'
import { BasicsPage } from '../views/Basics'
export const Routes = () => {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={LandingPage}></Route>
            <Route path="/basics" component={BasicsPage}></Route>
         </Switch>
      </Router>
   )
}
