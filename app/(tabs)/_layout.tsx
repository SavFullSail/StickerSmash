import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerShadowVisible: false,
        headerTintColor: '#fff',
        headerTransparent: true,
        headerStyle: {
        backgroundColor: 'transparent',
        },
        tabBarStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        borderTopWidth: 0,
        elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView experimentalBlurMethod="dimezisBlurView" intensity={80} tint="systemMaterialDark" style={{ flex: 1 }} />
        ),
        }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
