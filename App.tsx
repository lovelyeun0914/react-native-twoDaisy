/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screen/HomeScreen';
import MyDiaryCalendar from './screen/MyDiaryCalendar';
import MyDiary from './screen/MyDiary';
import Write from './screen/Write';

// 필요하다면 다른 스크린도 import

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'help-outline'; // 기본값 설정

            if (route.name === '홈') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === '일기장') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === '내일기 상세') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === '일기 쓰기') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6750A3',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: '#F3EDF7',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        })}
      >
        <Tab.Screen name="홈" component={HomeScreen} />
        <Tab.Screen name="일기장" component={MyDiaryCalendar} />
        <Tab.Screen name="내일기 상세" component={MyDiary} />
        <Tab.Screen name="일기 쓰기" component={Write} />

        {/* 필요하다면 추가 */}
        {/* <Tab.Screen name="3" component={Screen3} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
