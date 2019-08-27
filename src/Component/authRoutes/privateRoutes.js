import React from 'react';
import { Route, Redirect } from 'react-router-dom'

// if user is auth, send them to dashboard, if not redirect them to sign in 
const PrivateRoutes = ({
    user,
    component: Comp,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props)=>(
            user?
                <Comp {...props} user={user} />
                :
                <Redirect to='/sign_in'/>
        )}/>
    )
    
};

export default PrivateRoutes;