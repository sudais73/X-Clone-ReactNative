
import { useAuth } from '@clerk/clerk-expo';
import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = "https://x-clone-react-native-mu.vercel.app/api"

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