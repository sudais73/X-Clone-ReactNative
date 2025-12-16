import { View, Text, Alert, TouchableOpacity, TextInput, ScrollView, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { CONVERSATIONS, ConversationType } from '@/data/conversation';
import { Feather } from '@expo/vector-icons';

export default function MessageScreen() {
    const insets = useSafeAreaInsets();
    const [searchText, setSearchText] = useState("")
    const [conversationList, setConversationList] = useState(CONVERSATIONS)
    const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const deleteConversation = (conversationId: number) => {
        Alert.alert("Delete Conversation", "Are you sure you want to delete this message",
            [
                { text: "cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive",
                    onPress: () => {
                        setConversationList((prev) => prev.filter((conv) => conv.id !== conversationId))
                    }
                },
            ]);

        // setConversationList((prev) => prev.filter((conv) => conv.id !== conversationId))

    };

    const openConversation = (conversation: ConversationType) => {
        setSelectedConversation(conversation)
        setIsChatOpen(true);
    }
    const closeChatModel = () => {
        setIsChatOpen(false);
        setSelectedConversation(null);
        setNewMessage("")

    }


    const sendMessage = () => {
        if (newMessage.trim() && selectedConversation) {
            // update last message in the conversation//
            setConversationList((prev) => prev.map((conv) =>
                conv.id === selectedConversation.id ? {
                    ...conv, lsatMessage: newMessage,
                    time: "now"
                } : conv));
            setNewMessage("");
            Alert.alert("Message Sent !"),
                `Your message has been sent to ${selectedConversation.user.name}`
        }
    }
    return (
        <SafeAreaView className='flex-1 bg-white'>
            {/* Header */}
            <View className='flex-row items-center justify-between px-4 py-3 border-b border-gray-100'>
                <Text className='text-xl font-bold text-gray-900'>Messages</Text>
                <TouchableOpacity>
                    <Feather name='edit' size={24} color={"#1DA1F2"} />
                </TouchableOpacity>
            </View>
            {/* search */}
            <View className='p-4 py-3 border-b border-gray-100' >
                <View className='flex-row gap-2 items-center bg-gray-100 rounded-full px-4 py-3'>
                    <Feather name='search' size={20} color={"#657786"} />
                    <TextInput
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder='Search for people or group'
                        placeholderTextColor={"#657786"}
                        className='flex-1 border-0 outline-0 w-full text-base'

                    />
                </View>
            </View>
            <ScrollView className='flex-1'
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}

            >
                {conversationList.map((conversation) => (
                    <TouchableOpacity key={conversation.id}
                        className='flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50'
                        onPress={() => openConversation(conversation)}
                        onLongPress={() => deleteConversation(conversation.id)}
                    >
                        <Image
                            source={{ uri: conversation.user.avatar }}
                            className='size-12 rounded-full mr-3'

                        />
                        <View className='flex-1'>
                            <View className='flex-row items-center justify-between mb-1'>
                                <View className='flex-row items-center gap-1'>
                                    <Text className='font-semibold text-gray-900'>{conversation.user.name}</Text>
                                    {conversation.user.verified && (
                                        <Feather name='check-circle' size={16} color={"#1dA1F2"} />
                                    )}
                                    <Text className='text-gray-500 text-sm ml-1'>@{conversation.user.username}</Text>

                                </View>
                                <Text className='text-gray-500 text-sm ml-1'>{conversation.time}</Text>


                            </View>
                            <Text className='text-sm text-gray-500' numberOfLines={1}>{conversation.lastMessage}</Text>


                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {/* Quick actions */}
            <View className='px-4 py-2 border-t border-gray-100 bg-gray-50'>
                <Text className='text-xs text-gray-500 text-center'>
                    Tab to open - long press to delete
                </Text>
            </View>
            <Modal visible={isChatOpen} animationType='slide' presentationStyle='pageSheet'>
                {selectedConversation && (
                    <SafeAreaView className='flex-1'>
                        {/* chat Header */}
                        <View className='flex-row items-center px-4 py-3 border-b border-gray-100'>
                            <TouchableOpacity onPress={closeChatModel} className='mr-3'>
                                <Feather name='arrow-left' size={24} color={"#1DA1F2"} />
                            </TouchableOpacity>
                            <Image source={{ uri: selectedConversation.user.avatar }}
                                className='size-10 rounded-full mr-3'
                            />
                            <View className='flex-1'>
                                <View className='flex-row items-center'>
                                    <Text>{selectedConversation.user.name}</Text>
                                    {selectedConversation.user.verified && (
                                        <Feather name='check-circle' size={16} color={"#1DA1F2"} />
                                    )}
                                </View>

                            </View>
                            <Text className='text-gray-500 text-sm'>
                                @{selectedConversation.user.username}
                            </Text>
                        </View>

                        {/* chat message area */}

                        <ScrollView className='flex-1 px-4 py-4'>
                            <View className='mb-4'>
                                <Text className='text-center text-gray-400 tetx-sm mb-4'>This is the conversation with ${selectedConversation.user.name}</Text>

                                {/* messages */}
                                {selectedConversation.messages.map((msg) => (
                                    <View
                                        key={msg.id}
                                        className={`flex-row mb-3 ${msg.fromUser ? "jusify-end" : ""}`}>
                                        {!msg.fromUser && (

                                            <Image source={{ uri: selectedConversation.user.avatar }} className='size-8 rounded-full mr-2' />

                                        )}

                                        <View className={`flex-1 ${msg.fromUser ? "items-end" : ""}`}>
                                            <View className={`rounded-2xl px-4 py-3 max-w-xs ${msg.fromUser ? "bg-blue-500" : "bg-gray-100"}`}>
                                                <Text className={msg.fromUser ? "text-white" : "text-gray-900"}>
                                                    {msg.text}
                                                </Text>

                                            </View>
                                            <Text className='text-xs text-gray-400'>{msg.time}</Text>

                                        </View>
                                    </View>
                                ))}



                            </View>

                        </ScrollView>
                        {/* message input */}

                        <View className='flex-row items-center px-4 py-3 border-t border-gray-100'>
                            <View className='flex-1 flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mr-3'>
                                <TextInput
                                className='flex-1 text-base outline-0 items-center'
                                placeholder='Write message'
                                placeholderTextColor={"#657786"}
                                value={newMessage}
                                onChangeText={setNewMessage}
                                multiline
                                />
                            </View>
                            <TouchableOpacity
                            onPress={sendMessage}
                            className={`size-10 rounded-full items-center justify-center ${newMessage.trim() ?"bg-blue-500":"bg-gray-300"}`}
                            
                            >
                                <Feather name='send' size={20} color={"white"}/>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                )}
            </Modal>
        </SafeAreaView>
    )
}