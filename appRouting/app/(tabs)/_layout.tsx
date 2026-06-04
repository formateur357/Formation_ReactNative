import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Ionicons  from '@expo/vector'};
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0d47a1',
        tabBarInactiveTintColor: '#64748b',
        headerTitleStyle: {
          fontWeight: '900',
        },
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons size={size} name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="recherche"
        options={{
          title: 'Recherche',
          tabBarIcon: ({ color, size }) => <Ionicons size={size} name="search-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <Ionicons size={size} name="person-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="swipe-cards"
        options={{
          title: 'SwipeCards',
          tabBarIcon: ({ color, size }) => <Ionicons size={size} name="cards-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
