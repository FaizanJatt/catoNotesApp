import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StatusBar} from 'react-native';
import SettingsScreen from './src/screens/SettingsScreen';
import Locked from './src/screens/Locked';
import NoteList from './src/screens/NoteList';
import AuthenticateContextProvider from './store/context/Authenticate-context';
import Authorized from './src/screens/Authorized';
import SettingContextProvider from './store/context/Settings-context';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false, headerShown: false}}>
      <Tab.Screen
        name="Locked"
        component={Locked}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="lock" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={NoteList}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Authorized"
        component={Authorized}
        options={{
          tabBarItemStyle: {display: 'none'},
        }}
      />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle="default" />
      <AuthenticateContextProvider>
        <SettingContextProvider>
          <NavigationContainer>{MyTabs()}</NavigationContainer>
        </SettingContextProvider>
      </AuthenticateContextProvider>
    </>
  );
}

export default App;
