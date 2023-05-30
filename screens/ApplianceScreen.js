import React, {useContext} from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {ApplianceContext} from "../contexts/ApplianceContext";
import ApplianceService from "../services/ApplianceService";

const ApplianceScreen = ({navigation, route}) => {
    const {applianceData} = useContext(ApplianceContext);
    const appliance = ApplianceService.findById(applianceData, route.params.id)
    return (
        <View>
            <Pressable
                style={styles.button}
                onPress={() =>
                    navigation.navigate('EditAppliance', {id: appliance.id})
                }
            >
                <Text style={styles.title}>Edit</Text>
            </Pressable>
            <Text>Appliance screen for {appliance.title}</Text>
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