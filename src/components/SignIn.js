import React, {useState} from 'react'
import {useGlobalState} from '../config/store'
import {loginUser} from '../services/authServices'
import {InputButton, Input, Label, Block, ErrorText} from './StyledComponents'

const SignIn = ({history}) => {
    const initialFormState = {
        username: "",
        password: ""
    } 
    const [userDetails,setUserDetails] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState(null)
    const {dispatch} = useGlobalState()

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        // Attempt login on server
        loginUser(userDetails).then((response) => {
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            history.push("/")

        }).catch((error) => {
            if (error.response && error.response.status === 401)
                setErrorMessage("Authentication failed. Please check your username and password.")
            else   
                setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
        })		
    }

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <Block>
                <Label>Username</Label>
                <Input required type="text" name="username" placeholder="Enter a username" onChange={handleChange}></Input>
            </Block>
            <Block>
                <Label>Password</Label>
                <Input required type="password" name="password" placeholder="Enter a password" onChange={handleChange}></Input>
            </Block>
            <Block>
                <InputButton type="submit" value="Login"></InputButton>
            </Block>
            
        </form>
    )
}
export default SignIn