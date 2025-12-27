import { useApiClient, userApi } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"



export const useCurrentUser = () => {
    const api = useApiClient()

    const {
        data: currentUser,
        isLoading,
        isError,
        refetch

    } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => userApi.getCurrentUser(api),
        select: (res) => res.data.user,

    })
    return { currentUser, isLoading, isError, refetch }
}