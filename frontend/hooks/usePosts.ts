import { postApi, useApiClient } from "@/utils/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const usePosts = () => {
    const api = useApiClient()
    const queryClient = useQueryClient()

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => postApi.getPosts(api),
        select: (res) => res.data.posts,
    })

    const likePostMutuation = useMutation({
        mutationFn: (postId: string) => postApi.toggleLike(api, postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })

    const deletePostMutation = useMutation({
        mutationFn: (postId: string) => postApi.deletePost(api, postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            queryClient.invalidateQueries({ queryKey: ['userPosts'] })
        }
    })

    const checkIsLiked = (postLikes: string[], currentUser: any) => {
        const isLiked = postLikes.includes(currentUser?._id)
        return isLiked

    }



    return {
        posts: data || [],
        isLoading,
        error,
        refetch,
        toggleLike: (postId: string) => likePostMutuation.mutate(postId),
        deletePost: (postId: string) => deletePostMutation.mutate(postId),
        checkIsLiked
    }
}