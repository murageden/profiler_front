import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import React from "react"
import Protected from "./protected"
import Logout from "./login/logout"
import Login from "./login/login"
import Register from "./register/signup"
import Profile from "./profile/profile"
import EditProfile from "./profile/editprofile";

export default function AppRouter() {
    return (<Router>
        <div>
            <Switch>
                <Protected path="/logout" exact={true} component={Logout}/>
                <Protected path="/profile" exact={true} component={Profile}/>
                <Protected path="/profile/edit" exact={true} component={EditProfile}/>
                <Route path="/register" exact={true} component={Register}/>
                <Route path="/">
                    <Login/>
                </Route>
            </Switch>
        </div>
    </Router>)
}
