import {SafeAreaView, StyleSheet, Text, Pressable} from "react-native";
import React from "react";
import {auth, provider} from "../firebase";
import {signInWithRedirect} from "firebase/auth";

const LoginScreen = ({navigation}) => {
    const toggleSwitch = () => setListViewMode(previousState => !previousState);

    const signIn = () => {
        console.log('login button pressed')
        signInWithRedirect(auth, provider)
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text>Login page</Text>

            <Pressable
                style={styles.button}
                onPress={signIn} >
                <Text style={styles.title}>Login via Google account</Text>
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
});

export default LoginScreen;