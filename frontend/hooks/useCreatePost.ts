import { useApiClient } from "@/utils/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import * as ImagePicker from 'expo-image-picker'
import { Alert } from "react-native"


export const useCreatePost = () => {

  const [content, setContent] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const api = useApiClient()
  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: async (newPost: { content: string; imageUrl?: string }) => {
      const formData = new FormData()

      if (newPost.content) {
        formData.append('content', newPost.content)
      }

      if (newPost.imageUrl) {
        const extensionMatch = newPost.imageUrl.match(/\.(\w+)$/)
        const extension = extensionMatch ? extensionMatch[1].toLowerCase() : 'jpg'

        const mimeTypeMap: Record<string, string> = {
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          png: 'image/png',
          gif: 'image/gif',
          webp: 'image/webp',
        }

        formData.append('image', {
          uri: newPost.imageUrl,
          name: `post_image.${extension}`,
          type: mimeTypeMap[extension] || 'image/jpeg',
        } as any)
      }

      // ✅ FIXED ENDPOINT
      return api.post("/post", formData)
    },

    onSuccess: () => {
      setContent("")
      setSelectedImage(null)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },

    onError: (error: any) => {
      console.error(
        "Create post failed",
        error?.response?.data || error.message
      )
    },
  })

  const handleImagePicker = async (useCamera = false) => {
    const permissionResult = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert(
        `Permission to access ${useCamera ? 'camera' : 'gallery'} is required`
      )
      return
    }

    const pickerOptions = {
      allowsEditing: true,
      aspect: [4, 3] as [number, number],
      quality: 0.8,
    }

    const pickerResult = useCamera
      ? await ImagePicker.launchCameraAsync(pickerOptions)
      : await ImagePicker.launchImageLibraryAsync({
          ...pickerOptions,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        })

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri)
    }
  }

  const createPost = () => {
    if (!content.trim() && !selectedImage) {
      Alert.alert("Post content cannot be empty")
      return
    }

    createPostMutation.mutate({
      content: content.trim(),
      imageUrl: selectedImage || undefined,
    })
  }

  return {
    content,
    setContent,
    selectedImage,
    createPost,
    isCreating: createPostMutation.isPending,
    pickImageFromGallery: () => handleImagePicker(false),
    takePhotoWithCamera: () => handleImagePicker(true),
    removeImage: () => setSelectedImage(null),
  }
}
