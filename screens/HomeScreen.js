import {SafeAreaView, Switch, StyleSheet, Text, View, FlatList, Pressable} from "react-native";
import React, {useState, useContext} from "react";
import ApplianceService from "../services/ApplianceService";
import {ApplianceContext} from "../contexts/ApplianceContext";
import {auth} from "../firebase";

/* serviceStatus
 * 1 - low
 * 2 - normal (1 month due date)
 * 3 - high (1 week due date)
 */

const FlatApplianceList = ({data,navigation}) => {
    const applianceList = ApplianceService.flatten(data)
    return (
        <FlatList
            data={applianceList}
            renderItem={({item}) => <ApplianceItem categoryIcon={true} appliance={item} navigation={navigation} />}
            keyExtractor={appliance => appliance.id}
        />
    )
}
const ApplianceItem = ({appliance, categoryIcon,navigation}) => {
    return (
        <View style={styles.applianceItem}>
            <Pressable
                onPress={() =>
                    navigation.navigate('Appliance', {id: appliance.id})
                }
            >
                <Text style={styles.applianceItemTitle}>{appliance.title}</Text>
                <Text style={styles.applianceItemDetails}>Обслуговування через 1 рік</Text>
            </Pressable>

        </View>
    )
}

const CategoryItem = ({category,navigation}) => {
    return (
        <View style={styles.categoriesView}>
            <View style={styles.categoriesViewTitle}>
                <View style={styles.categoriesViewTitleIcon}></View>
                <View style={styles.categoriesViewTitleView}>
                    <Text style={styles.categoriesViewTitleText}>{category.title}</Text>
                    <Text style={styles.categoriesViewTitleDetailsText}>{category.applianceList.length} пристроїв</Text>
                </View>
            </View>
            <FlatList
                data={category.applianceList}
                renderItem={({item}) => <ApplianceItem appliance={item} navigation={navigation} />}
                keyExtractor={appliance => appliance.id}
            />
        </View>
    )
}
const HomeScreen = ({navigation}) => {
    const [listViewMode, setListViewMode] = useState(false);

    const { applianceData } = useContext(ApplianceContext);
    const toggleSwitch = () => setListViewMode(previousState => !previousState);
    return (
        <SafeAreaView style={styles.container}>
            {/*<Text>
                List view mode
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={listViewMode ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={listViewMode}
                />
            </Text>*/}

            {!listViewMode && <FlatList
                style={styles.mainList}
                data={applianceData}
                renderItem={({item}) => <CategoryItem category={item} navigation={navigation} />}
                keyExtractor={item => item.id}
            />}

            {listViewMode && <FlatApplianceList
                navigation={navigation}
                data={applianceData}
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
        width: '100%',
    },
    item: {
        //backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    mainList: {
      width: '100%'
    },
    categoriesView: {
        border: '1px solid #DADADA',
        borderRadius: '10px',
        margin: 12
    },
    categoriesViewTitle: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        height: 60,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    categoriesViewTitleIcon: {
        width: 42,
        height: 42,
        backgroundColor: '#fff',
        borderRadius: '100%',
        margin: 9,
    },
    categoriesViewTitleView: {
        margin: 9
    },
    categoriesViewTitleText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.7)',
    },
    categoriesViewTitleDetailsText: {
        fontSize: 12,
        color: 'rgba(0,0,0,0.4)',
    },
    applianceItem: {
        margin: 12,
        borderBottomColor: '#DADADA',
        borderBottomWidth: 1
    },
    applianceItemTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.7)'
    },
    applianceItemDetails: {
        fontSize: 12,
        color: 'rgba(0,0,0,0.4)'
    }
});

export default HomeScreen;