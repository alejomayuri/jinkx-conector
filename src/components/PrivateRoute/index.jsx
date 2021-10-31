import { Route, Redirect } from "react-router";
import { useAuth } from "../../cotext/AuthContext";

export const PrivateRoute = ({component: Component, ...rest}) => {

    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render = {props => {
                return currentUser ? <Component {...props} /> : <Redirect to='/login' />
            }}
        >

        </Route>
    )
}