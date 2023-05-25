import React from 'react'
import {Pressable, Text, View} from 'react-native'

const EditApplianceScreen = ({navigation, route}) => {
    console.log(route.params)
    return (
        <View>
            <Text>Edit appliance screen for {route.params.title}</Text>
        </View>
    )
}

export default EditApplianceScreen;