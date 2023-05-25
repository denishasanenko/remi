import {SafeAreaView, Switch, StyleSheet, Text, View, FlatList, Pressable} from "react-native";
import React, {useState} from "react";

/* serviceStatus
 * 1 - low
 * 2 - normal (1 month due date)
 * 3 - high (1 week due date)
 */
const DATA = [
    {
        id: 1,
        title: 'Автомобілі',
        applianceList: [
            {
                id: 11,
                title: 'Opel GrandlandX',
                serviceDate: '',
                serviceStatus: 3
            },
            {
                id: 12,
                title: 'Nissan Micra',
                serviceDate: '',
                serviceStatus: 2
            },
            {
                id: 13,
                title: 'Kia Sorento',
                serviceDate: '',
                serviceStatus: 1
            }
        ]
    },
    {
        id: 2,
        title: 'Фільтри',
        applianceList: [
            {
                id: 21,
                title: 'Вугільний',
                serviceDate: '',
                serviceStatus: 1
            },
            {
                id: 22,
                title: 'Механічний',
                serviceDate: '',
                serviceStatus: 2
            }
        ]
    },
    {
        id: 3,
        title: 'Аккумулятори',
        applianceList: [
            {
                id: 31,
                title: 'Mi Powerbank',
                serviceDate: '',
                serviceStatus: 3
            },
            {
                id: 32,
                title: 'EcoFlow',
                serviceDate: '',
                serviceStatus: 1
            }
        ]
    },
    {
        id: 4,
        title: 'Інше',
        applianceList: []
    }
];

const FlatApplianceList = ({data,navigation}) => {
    console.log()
    const applianceList = data.reduce((acc, item) => {
        const list = item.applianceList.map(appliance => {
            return {...appliance, category: {id: item.id, title: item.title}}
        })
        return [...acc, ...list]
    }, []);
    return (
        <FlatList
            data={applianceList}
            renderItem={({item}) => <ApplianceItem categoryIcon={true} appliance={item} navigation={navigation} />}
            keyExtractor={appliance => appliance.id}
        />
    )
}
const ApplianceItem = ({appliance, categoryIcon,navigation}) => {
    console.log(categoryIcon)
    return (
        <View style={styles.item}>
            <Pressable
                style={styles.button}
                onPress={() =>
                    navigation.navigate('Appliance', {id: appliance.id, title: appliance.title})
                }
            >
                <Text style={styles.title}>{appliance.title}</Text>
            </Pressable>

        </View>
    )
}

const CategoryItem = ({category,navigation}) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{category.title}</Text>
            <FlatList
                data={category.applianceList}
                renderItem={({item}) => <ApplianceItem appliance={item} navigation={navigation} />}
                keyExtractor={appliance => appliance.id}
            />
        </View>
    )
}
const HomeScreen = ({navigation}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <SafeAreaView style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>
                Categories view
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </Text>

            {isEnabled && <FlatList
                data={DATA}
                renderItem={({item}) => <CategoryItem category={item} navigation={navigation} />}
                keyExtractor={item => item.id}
            />}

            {!isEnabled && <FlatApplianceList
                navigation={navigation}
                data={DATA}
            />}

            <Pressable
                style={styles.button}
                onPress={() =>
                    navigation.navigate('EditAppliance', {})
                }
            >
                <Text style={styles.title}>Add appliance</Text>
            </Pressable>

        </SafeAreaView>
    );
};

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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    category: {

    },
    appliance: {

    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default HomeScreen;