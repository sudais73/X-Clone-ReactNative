import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'

export default function SearchScreen() {
    const TrendingTopics =[
        {topic:"#Ai Engineer", category:"Technology", tweets:"100K"},
        {topic:"#Java Script",category:"Technology", tweets:"120K"},
        {topic:"#TypeScript",category:"Technology", tweets:"10K"},
        {topic:"#Tech News",category:"Tech Neews", tweets:"14K"},
        {topic:"#Business News",category:"Business", tweets:"100K"}, {topic:"#Ai Engineer", tweets:"100K"},
        {topic:"#Java Script",category:"Technology", tweets:"120K"},
        {topic:"#TypeScript",category:"Technology", tweets:"10K"},
        {topic:"#Tech News", tweets:"14K"},
        
    ]
  return (
    <SafeAreaView className='flex-1 bg-white'>
        {/* //header */}
     <View className='p-4 py-3 border-b border-gray-100' >
        <View className='flex-row gap-2 items-center bg-gray-100 rounded-full px-4 py-3'>
        <Feather name='search' size={20} color={"#657786"}/>
        <TextInput 
        placeholder='Search Here'
        placeholderTextColor={"#657786"}
        className='flex-1 border-0 outline-0 w-full text-base'

        />
        </View>
     </View>
{/* scrollable trend content */}
<ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
    <View className='p-4'>
        <Text className='text-xl font-bold text-gray-900 mb-4'>Trending for you</Text>
        {TrendingTopics.map((item,index)=>(
            <TouchableOpacity key={index} className='py-3 border-b border-gray-100'>
                <View className='flex flex-row gap-2 items-center'>
            <Text className='text-lg fornt-bold'>Category</Text>:<Text className='text-blue-900'>{item.category}</Text>

                </View>
            <Text className='text-bold text-gray-900 text-lg'>{item.topic}</Text>
            <Text className='text-gray-500 text-sm'>{item.tweets} Tweets</Text>

            </TouchableOpacity>
        ))}
    </View>

</ScrollView>
    </SafeAreaView>
  )
}