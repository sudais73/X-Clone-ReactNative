import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '@/components/SignOutButton'
import { useUserSync } from '../../hooks/useUserSync'

export default function HomeScreen() {
useUserSync()
  return (
    <SafeAreaView className='flex-1'>
      <Text>index</Text>
      <SignOutButton/>
    </SafeAreaView>
  )
}