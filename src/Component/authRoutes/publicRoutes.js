import React from 'react';
import { Route, Redirect } from 'react-router-dom'

// if the restriction is false then just go to the component
// if the restriction is true, then check if they are auth, if yes dont bring them to component but to dashboard instead 

const PublicRoutes = ({
    user,
    component: Comp,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props)=>(
            rest.restricted ?
                (user?
                    <Redirect to='/dashboard' />
                    :
                    <Comp {...props} user={user}/>
                )
            :
            <Comp {...props} user={user}/>

        )} />
    )
}

export default PublicRoutes;