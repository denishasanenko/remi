import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ApplianceScreen from './screens/ApplianceScreen'
import EditApplianceScreen from "./screens/EditApplianceScreen";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'HoReMi'}}
          />
          <Stack.Screen name="Appliance" component={ApplianceScreen} />
          <Stack.Screen name="EditAppliance" component={EditApplianceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
export default App;