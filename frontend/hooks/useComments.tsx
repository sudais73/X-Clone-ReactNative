import { commentApi, useApiClient } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "react-native";

export const useComments = () => {
    const [commentText, setCommentText] = useState("");
    const api = useApiClient();
    const queryClient = useQueryClient();


const createCommentMutation = useMutation({
    mutationFn: async ({postId, content}: {postId: string, content: string}) => {
       const res =  await commentApi.addComment(api, postId, content); 
       return res.data;
    },
    onSuccess: () => {
        setCommentText("");
        queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {
        Alert.alert("Error", "Failed to add comment. Please try again.");
        console.error("Failed to add comment");
    }
});

const createComment = (postId: string) => {
    if(commentText.trim().length === 0){
        Alert.alert("Error", "Comment cannot be empty.");
        return;
    }
    createCommentMutation.mutate({postId, content: commentText});
}

    return {
        commentText,
        setCommentText,
        createComment,
        isSubmitting: createCommentMutation.isPending
    }
};