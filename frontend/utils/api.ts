
import { useAuth } from '@clerk/clerk-expo';
import axios, { AxiosInstance } from 'axios'

// const API_BASE_URL = "http://192.168.8.100:5000/api"
const API_BASE_URL = "http://192.168.8.104:5000/api"

export const createApiClient = (getToken: () => Promise<string | null>): AxiosInstance => {

    const api = axios.create({ baseURL: API_BASE_URL })
    api.interceptors.request.use(async (config) => {
        const token = await getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    });
    return api;
}
export const useApiClient = (): AxiosInstance => {
    const { getToken } = useAuth()
    return createApiClient(getToken)

}

export const userApi = {
    syncUser: (api: AxiosInstance) => api.post("/user/sync"),
    getCurrentUser: (api: AxiosInstance) => api.get("/user/me"),
    updateProfile: (api: AxiosInstance) => api.put('/user/profile')
}

export const postApi = {
    createPost: (api: AxiosInstance, postData:{content:string, imageUrl?:string}) => api.post("/post", postData),
    getPosts: (api: AxiosInstance) => api.get("/post"),
    getUserPosts: (api: AxiosInstance, username: string) => api.get(`/post/user/${username}`),
    deletePost: (api: AxiosInstance, postId: string) => api.delete(`/post/${postId}`),
    toggleLike: (api: AxiosInstance, postId: string) => api.post(`/post/${postId}/like`),
    checkIsLiked: (api: AxiosInstance, postId: string) => api.get(`/post/${postId}/like`)
}

export const commentApi = {
    addComment: (api: AxiosInstance, postId: string, content: string) => api.post(`/comment/post/${postId}`, { content }),
    getComments: (api: AxiosInstance, postId: string) => api.get(`/post/${postId}/comments`)
}