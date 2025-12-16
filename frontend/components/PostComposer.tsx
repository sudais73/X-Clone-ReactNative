import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useCreatePost } from '@/hooks/useCreatePost'
import { useUser } from '@clerk/clerk-expo';
import { Feather } from '@expo/vector-icons';

const PostComposer = () => {
    const { content, setContent, selectedImage, isCreating, pickImageFromGallery, takePhotoWithCamera,
        removeImage, createPost } = useCreatePost();

    const { user } = useUser();
    return (
        <View className='border-b border-gray-100 p-4 bg-white'>
            <View className='flex-row '>
                <Image source={{ uri: user?.imageUrl }} className='w-10 h-10 rounded-full mr-3' />
                <View className='flex-1'>
                    <TextInput
                        className='text-gray-900 text-lg items-center outline-none'
                        placeholder="What's happening?"
                        placeholderTextColor={"#657786"}
                        multiline
                        value={content}
                        onChangeText={setContent}
                        editable={!isCreating}
                        maxLength={300}
                    />

                </View>
            </View>
           {selectedImage && (
  <View className='mt-4 ml-4'>
    <View className='relative w-full'>
      <Image
        source={{ uri: selectedImage }}
        resizeMode='cover'
        className='w-full h-48 rounded-2xl'
      />

      <TouchableOpacity
        className='absolute top-2 right-2 bg-gray-800 rounded-full p-1'
        onPress={removeImage}
      >
        <Feather name="x" size={20} color="white" />
      </TouchableOpacity>
    </View>
  </View>
)}

            <View className='flex-row justify-between items-center mt-4'>
                <View className='flex-row gap-4'>
                    <TouchableOpacity onPress={pickImageFromGallery}>
                        <Feather name="image" size={25} color="blue" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={takePhotoWithCamera}>
                        <Feather name="camera" size={25} color="blue" />
                    </TouchableOpacity>
                </View>
                <View className='mt-4 flex-row justify-end'>
                    <TouchableOpacity
                        className={`bg-blue-500 rounded-full px-4 py-2 ${isCreating ? 'opacity-50' : ''}`}
                        onPress={createPost}
                        disabled={isCreating || !content.trim() && !selectedImage}
                    >
                        <Text className='text-white font-semibold'>{isCreating ? 'Posting...' : 'Post'}</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

export default PostComposer