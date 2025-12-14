import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useSignOut } from '@/hooks/useSignOut'

export default function SignOutButton() {
    const { handleSignOut } = useSignOut()
    return (
        <TouchableOpacity onPress={handleSignOut}>
            <Feather name='log-out' size={25} color={"#E0245E"} />
        </TouchableOpacity>
    )
}