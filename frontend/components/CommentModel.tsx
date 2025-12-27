import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { Post } from '@/types';
import { useComments } from '@/hooks/useComments';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Image } from 'react-native';
import { formatRelativeTime } from '@/utils/formatters';
interface CommentModelProps {
  selectedPost: Post | null;
  onClose: () => void;
}

const CommentModel = ({ selectedPost, onClose }: CommentModelProps) => {

  console.log('====================================');
  console.log("selectedpost",selectedPost);
  console.log('====================================');
  const { commentText, setCommentText, createComment, isSubmitting } = useComments()
  const { currentUser } = useCurrentUser()

  const handleClose = () => {
    onClose();
    setCommentText("");
  }

  return (
    <Modal visible={!!selectedPost} animationType="slide" presentationStyle='pageSheet' onRequestClose={handleClose}>
      {/* model top */}
      <View className='flex-row items-center justify-between px-4 py-3 border-b border-gray-100'>
        <TouchableOpacity onPress={handleClose} className='p-4'>
          <Text className='text-blue-500 font-semibold text-lg'>Close</Text>
        </TouchableOpacity>
        <Text className='font-bold text-lg'>Comments</Text>
        <View className='w-13' />
      </View>
      {selectedPost && (
        <ScrollView className='flex-1'>
          <View className='p-4'>
            <Text className='font-semibold text-gray-900 mb-2'>
              Commenting as {currentUser.firstName} {currentUser.lastName}
            </Text>
          </View>
          <View className='border-b border-gray-100 bg-white p-4'>
           
            <View className='flex-row items-center'>
              <Image
                source={{ uri: selectedPost.user.profilePicture || "" }}
                className="w-12 h-12 rounded-full mr-3"
              />
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-1">
                  <View className="flex-row items-center">
                    <Text className="font-bold text-gray-900 mr-1">
                      {selectedPost.user.firstName} {selectedPost.user.lastName}
                    </Text>
                    <Text className="text-gray-500 ml-1">
                      @{selectedPost.user.username} · {formatRelativeTime(selectedPost.createdAt)}
                    </Text>
                  </View>

                </View>

              </View>
            </View>

            {selectedPost.content && (
              <Text className="text-gray-900 text-base leading-5 mb-3">{selectedPost.content}</Text>
            )}

            {selectedPost.image ? (
              <Image
                source={{ uri: selectedPost.image || "https://via.placeholder.com/400x300" }}
                className="w-full h-48 rounded-2xl mb-3"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{ uri: "https://via.placeholder.com/400x300" }}
                className="w-full h-48 rounded-2xl mb-3 bg-gray-200"
                resizeMode="cover"
              />
            )}
          </View>

          {/* comment list */}
          {selectedPost.comments.map((comment) => (
              <View key={comment._id} className='border-b border-gray-100 bg-white p-4 flex-row'>
                <Image
                  source={{ uri: comment.user.profilePicture || "" }}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <View className="flex-row items-center">
                      <Text className="font-bold text-gray-900 mr-1">
                        {comment.user.firstName} {comment.user.lastName}
                      </Text>
                      <Text className="text-gray-500 ml-1">
                        @{comment.user.username} · {formatRelativeTime(comment.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-gray-900 text-base leading-5">{comment.content}</Text>
                </View>
              </View>
          ))}
          {/* add comment */}
          <View className='p-4 border-t border-gray-100 bg-white'>
            <Text className='font-semibold text-gray-900 mb-2'>Add a Comment</Text> 
            <View className='flex-row items-center'>
              <Image
                source={{ uri: currentUser.profilePicture || "" }}  
                className="w-10 h-10 rounded-full mr-3"
              />
              <View className='flex-1'>
                <TextInput
                  value={commentText}
                  onChangeText={setCommentText}
                  placeholder="Write your comment..."
                  className='border border-gray-300 rounded-lg px-4 py-2 mb-2'
                  multiline
                />
                <TouchableOpacity
                  className={`bg-blue-500 px-4 py-2 rounded-lg items-center ${isSubmitting ? 'opacity-50' : ''}`}
                  onPress={() => createComment(selectedPost._id)}
                  disabled={isSubmitting}
                >
                  <Text className="text-white font-semibold">Post Comment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </Modal>
  )
}

export default CommentModel