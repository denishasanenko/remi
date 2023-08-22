import React, {useEffect, useState} from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
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

        navigation.addListener('focus', () => {
            console.log("reloaded");
            loadData()
        });
    }, []);

    const editAppliance = () => {
        navigation.navigate('EditAppliance', {id: appliance.id})
    }
    const removeAppliance = async () => {
        console.log(route.params)
        await ApplianceService.delete({id: route.params.id})
        navigation.navigate('Home')
        console.log('remove')
    }

    return (
        <View>
            {loading && <div>Loading...</div>}

            <Text>Appliance screen for {appliance.title}</Text>
            <Pressable
                style={styles.button}
                onPress={editAppliance}
            >
                <Text style={styles.title}>Редагувати</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={removeAppliance}
            >
                <Text style={styles.title}>Видалити</Text>
            </Pressable>
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