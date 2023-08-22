import {SafeAreaView, StyleSheet, Text, View, FlatList, Pressable, Image} from "react-native";
import React, {useState, useEffect} from "react";
import {auth} from "../firebase";
import {navigationRef} from "../App";

const WelcomeScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true);

    const loadData = (callback) => {
        callback(auth.currentUser)
    }
    auth.onAuthStateChanged((user) => {
        if(!user) {
            navigation.navigate('Login');
        } else {
            navigation.navigate('Home');
        }
    })
    navigation.addListener('focus', (q) => {
        console.log(q)
        loadData((user) => {
            console.log("on focus", user);
            if(!user) {
                navigation.navigate('Login');
            } else {
                navigation.navigate('Home');
            }
        })
    });

    return (
        loading ? <Text>Loading...</Text> :
        <Text>Loaded</Text>
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

export default WelcomeScreen;