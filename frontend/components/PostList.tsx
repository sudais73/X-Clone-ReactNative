import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { usePosts } from '@/hooks/usePosts'
import { Post } from '@/types'
import PostCard from './PostCard'
import CommentModel from './CommentModel'

const PostList = () => {
    const{currentUser} = useCurrentUser()
    console.log("Current User in PostList:", currentUser)

    const{posts, isLoading, error,refetch, toggleLike, deletePost, checkIsLiked} = usePosts()
    const[selectdPostId, setSelectedPostId] = useState<string|null>(null)

    const selectedPost = selectdPostId ? posts.find((post:Post) => post._id === selectdPostId) : null;
    console.log("Posts:", posts);
    if(isLoading){
        return (
            <View className='p-8 items-center'>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text className='text-gray-500 mb-4'>Loading posts...</Text>
            </View>
        )
    }   

    if(error){
        return (
            <View className='p-8 items-center'>
                <Text className='text-gray-500 mb-4'>Error loading posts.</Text>
                <TouchableOpacity className='bg-blue-500 px-4 py-2 rounded-lg' onPress={() => refetch()}>
                    <Text className='text-white font-semibold'>Retry</Text>
                </TouchableOpacity>
            </View>
        )
    }
     
    if(posts.length === 0){
        return (
            <View className='p-8 items-center'>
                <Text className='text-gray-500 mb-4'>No posts available.</Text>
            </View>
        )
    }




   

  return (

    <>
      {posts.map((post:Post) => (
        <PostCard
            key={post._id}
            post={post}
            onLike={() => toggleLike(post._id)}
            onDelete={() => deletePost(post._id)}
            currentUser={currentUser}
            isLiked={checkIsLiked(post.likes, currentUser)}
            onComment={(post:Post) => setSelectedPostId(post._id)}
        
        />
      ))}
      <CommentModel selectedPost={selectedPost} onClose={() => setSelectedPostId(null)} />
    </>
  )
}

export default PostList