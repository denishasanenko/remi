import React, {useContext, useEffect, useState} from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {ApplianceContext} from "../contexts/ApplianceContext";
import ApplianceService from "../services/ApplianceService";

const ApplianceScreen = ({navigation, route}) => {
    const [loading, setLoading] = useState(true);
    const [appliance, setAppliance] = useState({});

    useEffect( () => {
        const loadData = async () => {
            setAppliance(await ApplianceService.findById(route.params.id))
            setLoading(false)
        }
        loadData();
    }, []);

    return (
        <View>
            {loading && <div>Loading...</div>}
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