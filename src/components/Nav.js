import React from 'react'
import {useGlobalState} from '../config/store'
import {logoutUser} from '../services/authServices'
import {Navvie, Row} from './StyledComponents'

const Nav = () => {
    // Logout user
    function handleLogout() {
        logoutUser().then((response) => {
            console.log("Got back response on logout", response.status)
        }).catch ((error) => {
            console.log("The server may be down - caught an exception on logout:", error)
        })
        // Even if we catch an error, logout the user locally
        dispatch({
            type: "setLoggedInUser",
            data: null
        })
    }
    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store
    return (
        <Row>
            {loggedInUser 
            ? (<div>
                <Navvie to="/">{loggedInUser}</Navvie>
                <Navvie onClick={handleLogout} to="/">Logout</Navvie>
                <Navvie to="/posts/new">Add a post</Navvie>
                </div>)
            : (<div>
                <Navvie to="/">guest</Navvie>
                <Navvie to="/auth/login">Login</Navvie>
                <Navvie to="/auth/register">Register</Navvie>
                </div>)
            }
            <div >
                <Navvie to="/">Home</Navvie>
            </div>
        </Row>
    )
}

export default Nav