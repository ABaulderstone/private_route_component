import api from '../config/api'

// Returns a single post based on the id provided
export function getPostFromId(blogPosts,id) {
    const post =  blogPosts.find((post) =>  post._id === id)
    return post
}

// Returns all blog posts from the server
export async function getAllBlogPosts() {
    const response = await api.get("/posts")
    return response.data
}

// Adds a post on the server
export async function addBlogPost(newPost) {
    const response = await api.post("/posts", newPost)
    return response.data
}

// Deletes a post on the server
export async function deleteBlogPost(id) {
    const response = await api.delete(`/posts/${id}`)
    return response.data
}

export async function updateBlogPost(post) {
    const response = await api.put(`/posts/${post._id}`, post)
    return response.data
}