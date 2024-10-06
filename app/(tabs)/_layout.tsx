import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Ionicons name='home' size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name='features'
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={32} name="local-pharmacy" color={color} />,
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (<Ionicons size={32} name='settings' color={color} />)
        }}
      />
    </Tabs>
  );
}
