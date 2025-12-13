import { useSocialAuth } from "@/hooks/useSocialAuth";
import { useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  // const [isLoading, setIsLoading] = useState(true)
const {isLoading, handleSocialAuth} = useSocialAuth()
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-between">

        <View className="flex-1 justify-center">
          <View className="items-center">
            <Image
              source={require("../../assets/images/auth2.png")}
              style={{ width: 330, height: 330 }}
              resizeMode="contain"
            />
          </View>
          <View className="flex-col gap-2">
            <TouchableOpacity className="flex-row gap-4 items-center justify-center bg-white 
            border border-gray-300 rounded-full px-8 py-3"
              onPress={() => { handleSocialAuth("oauth_google") }}
              disabled={isLoading}
            >
              {isLoading?(
                  <ActivityIndicator size="small" color="#4285FA"/>
              ):(
                <View className="flex-row items-center">
            <Image source={require("../../assets/images/google.png")}
                style={{ width: 50, height: 30 }}
                resizeMode="contain"
              />
              <Text className="font-semibold">Continue with Google</Text>
             </View>

              )}

            </TouchableOpacity>

            <TouchableOpacity className="flex-row gap-4 items-center justify-center bg-white 
            border border-gray-300 rounded-full px-8 py-3"
              onPress={() => {handleSocialAuth("oauth_apple") }}
              disabled={isLoading}

            >
              {isLoading?(
                  <ActivityIndicator size="small" color="#4285FA"/>
              ):(
                <View className="flex-row items-center">
            <Image source={require("../../assets/images/apple.png")}
                style={{ width: 50, height: 30 }}
                resizeMode="contain"
              />
              <Text className="font-semibold">Continue with Apple</Text>
             </View>

              )}
              
              
            </TouchableOpacity>
          </View>
          <View>
            <Text className="text-center text-gray-500 text-xs leading-4 mt-6 px-2">By signing up, you agree to our <Text className="text-blue-500">Terms</Text>{", "} <Text className="text-blue-500">privacy policy</Text> and <Text className="text-blue-500">Cookie Use</Text></Text>

          </View>
        </View>
      </View>

    </View>
  );
}