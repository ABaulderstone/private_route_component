import React, {Fragment, useReducer, useEffect} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Nav from './components/Nav'
import BlogPosts from './components/BlogPosts'
import BlogPost from './components/BlogPost'
import NewBlogPost from './components/NewBlogPost'
import EditBlogPost from './components/EditBlogPost'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Oopsie from './components/Oopsie'
import stateReducer from './config/stateReducer'
import {StateContext} from './config/store'
import {getPostFromId, getAllBlogPosts} from './services/blogPostServices'
import {Page, Title} from './components/StyledComponents'


const App = () => {

  // initial state for state reducer
  const initialState = {
    blogPosts: [],
    loggedInUser: null,
  }

  function fetchBlogPosts() {
    getAllBlogPosts().then((blogData) => {
      dispatch({
        type: "setBlogPosts",
        data: blogData
      })
    }).catch((error) => {
      dispatch({
        type: "setError",
        data: true
      })
      console.log("An error occurred fetching blog posts from the server:", error) 
    })
  }

  // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer,initialState)
  const {blogPosts, error} = store

  useEffect(() => {
    fetchBlogPosts()
  },[])

  return (
    <Page >
      <StateContext.Provider value={{store,dispatch}}>
        <BrowserRouter> 
          <Nav />
          <Title>Many Mumbling Mice</Title>
          {error ?  (<Oopsie /> )
          : (
            <Fragment>
              <Route exact path="/" component={BlogPosts} />
              <Route exact path="/posts/:id" render={(props) => <BlogPost {...props} post={getPostFromId(blogPosts,props.match.params.id)} showControls /> } />
              <Route exact path="/posts/new" component={NewBlogPost} />
              <Route exact path="/posts/edit/:id" component={EditBlogPost} /> 
              <Route exact path="/auth/login" component={SignIn} />
              <Route exact path="/auth/register" component={Register} />
            </Fragment>
            )
          }
          
        </BrowserRouter>
      </StateContext.Provider>
    </Page>
  )
}

export default App
