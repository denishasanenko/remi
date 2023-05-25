import React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'

const ApplianceScreen = ({navigation, route}) => {
    console.log(route.params)
    return (
        <View>
            <Pressable
                style={styles.button}
                onPress={() =>
                    navigation.navigate('EditAppliance', {id: route.params.id, title: route.params.title})
                }
            >
                <Text style={styles.title}>Edit</Text>
            </Pressable>
            <Text>Appliance screen for {route.params.title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        color: '#fff',
        fontSize: 14,
    },
    title: {
        fontSize: 32,
    },
});

export default ApplianceScreen;