/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, View } from 'react-native';
import Colors from '../constants/Colors';
import {Octicons, MaterialCommunityIcons, FontAwesome5, MaterialIcons} from '@expo/vector-icons';


import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import MainTavNavigator from './MainTavNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import ContactsScreen from '../screens/ContactsScreen';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity: 0,
          elevation: 0,
      },
      headerTintColor: Colors.light.background,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
      
    }}
     >
      <Stack.Screen 
        name="Root" 
        component={MainTavNavigator} 
        options={{
          title: "ChatAppByAli",
          headerRight: () => {
            return (
                <View style={{
                  flexDirection: 'row', 
                  width:60, 
                  justifyContent: "space-between", 
                  marginRight: 10}}>
                  <Octicons name="search" size={22} color={"white"} />
                  <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
                </View>
            )
          }
          
        }}
        
        />
      <Stack.Screen 
          name="ChatRoom" 
          component={ChatRoomScreen} 
          // options={{ title: 'Chat Room' }} 
          options={ ({route}:any) => ({
            title: route.params.name,
            headerRight: ()=> {
              return (
                <View style={{
                  flexDirection: 'row', 
                  width:120, 
                  justifyContent: "space-between", 
                  marginRight: 10}}>
                  <FontAwesome5 name="video" size={20} color={"white"} />
                  <MaterialIcons name="call" size={20} color={"white"} />
                  <MaterialCommunityIcons name="dots-vertical" size={20} color="white" />
                </View>
            )
            }
          
          })        

        }
          />

      <Stack.Screen name="Contacts" component={ContactsScreen} options={{ title: 'Contacts' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
