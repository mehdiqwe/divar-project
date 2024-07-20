import api from "configs/api"

const getProfile = () => api.get("user/whoami").then(res => res || false)

const getPosts = () => api.get("post/my").then(res => res || false)

const getAllPosts = () => api.get()

const deletePosts = (id) => api.delete(`post/delete/${id}`)

export { getProfile, getPosts, deletePosts, getAllPosts }