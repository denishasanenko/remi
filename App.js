import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ApplianceScreen from './screens/ApplianceScreen'
import EditApplianceScreen from "./screens/EditApplianceScreen";
import {ApplianceProvider} from "./contexts/ApplianceContext";
import LoginScreen from "./screens/LoginScreen";
import {auth, provider} from "./firebase";
import {getRedirectResult, GoogleAuthProvider, signOut} from "firebase/auth"

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

const Stack = createNativeStackNavigator();
const App = () => {
    console.log(Stack)
    auth.onAuthStateChanged((user) => {
        console.log(user)
        if(!user) {
            console.log(navigationRef, navigationRef.isReady())
            navigationRef.navigate('Login');
        } else {
            // signOut(auth)
        }
    })
    /*const user = auth.currentUser;
    */
    //
    /*getRedirectResult(auth)
        .then((result) => {
            console.log(result)
            if(!result) {
                return;
            }
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            console.log(user, credential)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(error)
    });*/
  return (
      <ApplianceProvider>
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
      </ApplianceProvider>
  );
}

const styles = StyleSheet.create({

});
export default App;