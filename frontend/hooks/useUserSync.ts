import { useApiClient, userApi } from "@/utils/api"
import { useAuth } from "@clerk/clerk-expo"
import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"


export const useUserSync = () => {
    const { isSignedIn } = useAuth()
    const api = useApiClient()

    const SyncUserMutation = useMutation({
        mutationFn: () => userApi.syncUser(api),
        onSuccess: (response: any) => console.log("Useer inserted to db", response.data.user),
        onError: (error) => console.error("User sync failed", error)
    });

    useEffect(() => {
        // if user is signed in and that user not synced yet, sync user
        if (isSignedIn && !SyncUserMutation.data) {
            SyncUserMutation.mutate()
        }

    }, [isSignedIn])
}