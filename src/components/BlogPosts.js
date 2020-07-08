import React from 'react'
import BlogPost from './BlogPost'
import {useGlobalState} from '../config/store'

const BlogPosts = () => {
    const {store} = useGlobalState()
    const {blogPosts} = store
    return (
        <div>
            {blogPosts.sort((a,b) => b.modified_date - a.modified_date).map((post) => <BlogPost key={post._id} post={post} />)}        
        </div>
    )
}

export default BlogPosts