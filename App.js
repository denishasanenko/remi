import React, {useState} from 'react';
import { StyleSheet, Image, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ApplianceScreen from './screens/ApplianceScreen'
import EditApplianceScreen from "./screens/EditApplianceScreen";
import LoginScreen from "./screens/LoginScreen";
import {auth} from "./firebase";
import {signOut} from "firebase/auth"

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

const Stack = createNativeStackNavigator();
const App = () => {
    const [userData, setUserData] = useState(false);
    auth.onAuthStateChanged((user) => {
        if(!user) {
            navigationRef.navigate('Login');
        }
        setUserData(user);
    })

    if (!userData) {
        return <Text>{userData} - Loading APP...</Text>
    }

  return (
      <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
              screenOptions={{
                  headerStyle: {
                      backgroundColor: '#EEEEEE',
                      borderWidth: 1,
                      borderColor: '#DADADA',
                      margin: 12,
                      width: 'auto'
                  },
                  headerTitle: () => (
                      <Image
                          style={{ flex: 1, width: 120, height: 20 }}
                          source={require('./assets/logo.png')}
                          resizeMode={'contain'}
                      />
                  ),
                  headerRight: () => (
                      <Button
                          onPress={() => signOut(auth)}
                          title="Info"
                          color="#fff"
                      />
                  ),
              }}
          >
              <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{title: 'HoReMi'}}
              />
              <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
              <Stack.Screen name="Appliance" component={ApplianceScreen} />
              <Stack.Screen name="EditAppliance" component={EditApplianceScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
export default App;