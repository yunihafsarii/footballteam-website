import React, { Component } from 'react';
import Layout from './Hoc/layout'
import { Switch, Route } from 'react-router-dom'

import Home from './Component/home'
import SignIn from './Component/SignIn'
import Theteam from './Component/theTeam'
import TheMatches from './Component/theMatches'
import NotFound from './Component/ui/not_found'

import Dashboard from './Component/admin/dashboard'
import AdminMatches from './Component/admin/matches'
import AddEditMatch from './Component/admin/matches/addEditMatch'
import AdminPlayers from './Component/admin/players/'
import AddEditPlayers from './Component/admin/players/addEditPlayers'

// if user is auth, then send him/her to dashboard (considered :private route), if not send them to somewhere else maybe sign_in
// that logic is mananged in <PrivateRoutes/> here we just pass the props to be carried out 
import PrivateRoutes from './Component/authRoutes/privateRoutes'
// as for public routes, if user is signed in, then redirect them to dashboard, not sign in again, the meaning of restricted={true}
// if user is not signed in then ridirect them to home
import PublicRoutes from './Component/authRoutes/publicRoutes'

const Routes = (props) => {
  return (
    <Layout>
       <Switch>
          <PrivateRoutes {...props} path='/admin_players/add_players' exact component={AddEditPlayers}/>
          <PrivateRoutes {...props} path='/admin_players/add_players:id' exact component={AddEditPlayers}/>
          <PrivateRoutes {...props} path='/admin_players' exact component={AdminPlayers}/>
          <PrivateRoutes {...props} path='/admin_matches/edit_match/' exact component={AddEditMatch}/>
          <PrivateRoutes {...props} path='/admin_matches/edit_match/:id' exact component={AddEditMatch}/>
          <PrivateRoutes {...props} path='/admin_matches' exact component={AdminMatches}/>
          <PrivateRoutes {...props} path='/dashboard' exact component={Dashboard}/>
          <PublicRoutes {...props} restricted={false} path='/the_matches' exact component={TheMatches}/>
          <PublicRoutes {...props} restricted={true} path='/sign_in' exact component={SignIn}/>
          <PublicRoutes {...props} restricted={false} path='/the_team' exact component={Theteam}/>
          <PublicRoutes {...props} restricted={false} path='/' exact component={Home}/>
          <PublicRoutes {...props} restricted={false} exact component={NotFound}/>
       </Switch>
    </Layout>
  );
}

export default Routes;
 