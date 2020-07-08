import React, {useState} from 'react'
import {useGlobalState} from '../config/store'
import {registerUser} from '../services/authServices'
import {Label, Input, Block, InputButton, ErrorText} from './StyledComponents'

const Register = ({history}) => {
    const initialFormState = {
        username: "",
        email: "",
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
        registerUser(userDetails).then(() => {
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            history.push("/")
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
			if(status === 409) {
				// This username is already registered. Let the user know.
				setErrorMessage("This username already exists. Please login, or specify another username.")				
            }
            else {
                // There was some other error - maybe the server or db is down
                setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
            }
			console.log(`registration failed with error: ${error} and status ${status}`)
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
                <Label>Email</Label>
                <Input required type="email" name="email" placeholder="Enter an email" onChange={handleChange}></Input>
            </Block>
            <Block>
                <Label>Password</Label>
                <Input required type="password" name="password" placeholder="Enter a password" onChange={handleChange}></Input>
            </Block>
            <Block>
                <InputButton type="submit" value="Register"></InputButton>
            </Block>
            
        </form>
    )
}
export default Register