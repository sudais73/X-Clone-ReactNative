import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '@/components/SignOutButton'
import { useUserSync } from '../../hooks/useUserSync'
import { Ionicons } from '@expo/vector-icons'
import PostComposer from '@/components/PostComposer'
import { useAuth } from '@clerk/clerk-expo'
import PostList from '@/components/PostList'

export default function HomeScreen() {
  const{getToken} = useAuth()
  console.log("Token:", getToken())
useUserSync()
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-row justify-between items-center px-4 py-3 border-b border-gray-200'>
        <Ionicons name ='logo-twitter' size={24} color={"#1DA1F2"}/>
        <Text className='text-xl font-bold text-gray-900'>Home</Text>
          <SignOutButton/>
      </View>
      <ScrollView className='flex-1'
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:80}}
      
      >
          <PostComposer/>
          <PostList/>
      </ScrollView>
    </SafeAreaView>
  )
}