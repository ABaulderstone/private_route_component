import React from 'react'
import TimeAgo from 'react-timeago'
import {useGlobalState} from '../config/store'
import {deleteBlogPost} from '../services/blogPostServices'
import {BlogLink, Button, PostTitle} from './StyledComponents'

const BlogPost = ({history, post, showControls}) => {

    const {store, dispatch} = useGlobalState()
    const {blogPosts, loggedInUser} = store
    // If we don't have a post, return null
    if (!post) return null

    const {title, username, modified_date, category, content} = post 
    const allowEditDelete = loggedInUser && loggedInUser === post.username
    // Handle the delete button
    function handleDelete(event) {
        event.preventDefault()
        deleteBlogPost(post._id).then(() => {
            console.log("deleted post")
            const updatedPosts = blogPosts.filter((blogPost) => blogPost._id !== post._id)
            dispatch({
                type: "setBlogPosts",
                data: updatedPosts
            })
            history.push("/")
        }).catch((error) => {
            console.log("error deleting post", error)
        })
    }

    // Handle the edit button
    function handleEdit(event) {
        event.preventDefault()
        history.push(`/posts/edit/${post._id}`)
    }

    return (
        <div>
            <BlogLink to={`/posts/${post._id}`} >
                <PostTitle>{title}</PostTitle>
                <p>{username}</p>
                <TimeAgo date={modified_date}/>
                <p>{category}</p>
                <p>{content}</p>
                {showControls && allowEditDelete && (
                    <div>
                        <Button onClick={handleDelete}>Delete</Button>
                        <Button onClick={handleEdit}>Edit</Button>
                    </div>
                )}
            </BlogLink>
        </div>
    )
}

export default BlogPost