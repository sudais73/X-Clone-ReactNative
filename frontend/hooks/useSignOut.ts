import { useClerk } from "@clerk/clerk-expo"
import { Platform, Alert } from "react-native"


export const useSignOut = () => {
    const { signOut } = useClerk()
    
    const handleSignOut = () => {
        // For React Native
        if (Platform.OS !== 'web') {
            Alert.alert("Logout", "Are you sure you want to logout?", [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout", 
                    style: "destructive",
                    onPress: () => signOut()
                },
            ])
        } else {
            // For web - using browser's confirm dialog
            const isConfirmed = window.confirm("Are you sure you want to logout?")
            if (isConfirmed) {
                signOut()
            }
        }
    }

    return { handleSignOut }
}