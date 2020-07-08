import styled from 'styled-components'
import {Link} from 'react-router-dom'

// settings
const titleFontFamily = 'Lobster'
const fontFamily = 'Roboto'
const accentColor = '#E00DDD'

// container formatting
export const Page = styled.div `
    margin: 1em;
    font-family: ${fontFamily};
    width: 90vw;
`
export const Block = styled.div `
    display: grid;
    width: 100vw;
`
export const Row = styled.div `
    display: flex;
`

// text formatting
export const Title = styled.h1 `
    font-family: ${titleFontFamily};
    font-size: 3em;
`
export const PostTitle = styled.h1 `
    color: ${accentColor};
`
export const ErrorText = styled.p `
    color: red;
`

// form formatting
export const InputButton = styled.input `
    background-color: ${accentColor};
    color: white;
    padding: .2em;
    border: none;
    font-size: 1.2em;
    width: 200px;
`
export const Input = styled.input `
    width: 60vw;
    margin: .5em;
`

export const Label = styled.label `
    font-size: 1.2em;
`
export const TextArea = styled.textarea `
    height: 200px;
    margin: .5em;
    width: 70vw;
`

// edit and delete buttons
export const Button = styled.button `
    background-color: ${accentColor};
    color: white;
    width: 100px;
    padding: .2em;
    border: none;
    font-size: 1.2em;
    margin: 1em;
`

// link formatting
export const Navvie = styled(Link) `
    font-size: 1.2em;
    text-decoration: none;
    color: ${accentColor};
    margin: 1em;
    padding: .2em .5em;
`
export const BlogLink = styled(Link) `
    color: black;
    text-decoration: none;
`
