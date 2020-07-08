import React from 'react'
import {useGlobalState} from '../config/store'
import {getAllBlogPosts} from '../services/blogPostServices'

const Oopsie = () => {
    const divStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
    const imageStyles = {
        height: "50vh",
        margin: "1em"
    } 
    const buttonStyles = {
        backgroundColor: "black",
        color: "white",
        padding: ".5em",
        fontSize: "1.2em",
        textDecoration: "none"

    }
    function handleClick(event) {
        event.preventDefault()
        getAllBlogPosts().then((blogPosts) => {
            dispatch({
                type: "setBlogPosts",
                data: blogPosts
            })
            dispatch({
                type: "setError",
                data: false
            })
        })
    }
    const { dispatch} = useGlobalState()

    return (
        <div style={divStyles}>
            <h2>Oops! There's been a problem. Please try to reload.</h2>
            <img style={imageStyles} src="error.jpg" alt="error"></img>
            <button style={buttonStyles} onClick={handleClick}>Reload</button>
        </div>
    )
}
export default Oopsie