import { StyleSheet, Text, View } from 'react-native'
import React ,{  useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import TabNavigators from './src/navigators/TabNavigators';
import SplashScreen from 'react-native-splash-screen';
const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Tab'
          component={TabNavigators}
          options={{ animation: 'slide_from_bottom' }}
        ></Stack.Screen>
        <Stack.Screen
          name='Details'
          component={DetailsScreen}
          options={{ animation: 'slide_from_bottom' }}
        ></Stack.Screen>
        <Stack.Screen
          name='Payments'
          component={PaymentScreen}
          options={{ animation: 'slide_from_bottom' }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})