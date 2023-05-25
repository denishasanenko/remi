import React from 'react'
import {Text} from 'react-native'

const ApplianceScreen = ({navigation, route}) => {
    console.log(route.params)
    return (
        <Text>Appliance screen for {route.params.title}</Text>
    )
}

export default ApplianceScreen;