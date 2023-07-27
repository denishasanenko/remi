import {SafeAreaView, StyleSheet, Text, Pressable, Image, View} from "react-native";
import React from "react";
import {auth, provider} from "../firebase";
import {signInWithRedirect} from "firebase/auth";
export const IMAGENAME = require('../assets/logo.png');
export const GOOGLELOGO = require('../assets/google_logo.svg');

const LoginScreen = ({navigation}) => {
    const toggleSwitch = () => setListViewMode(previousState => !previousState);

    const signIn = () => {
        console.log('login button pressed')
        signInWithRedirect(auth, provider)
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image style={{width: 200, height: 48}} source={IMAGENAME} />
            <Text>Keep in track with all your appliance service</Text>
            <Pressable
                style={styles.button}
                onPress={signIn} >
                <View style={styles.loginButton}>
                    <Image style={styles.loginButtonImage} source={GOOGLELOGO} />
                    <Text style={styles.loginButtonText}>Continue with Google</Text>
                </View>
            </Pressable>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
    button: {
        width: '100%',
        marginTop: 48,
        justifyContent: 'center'
    },
    loginButton: {
        width: '80%',
        height: 48,
        backgroundColor: '#F4F4F4',
        borderColor: '#DDD',
        borderWidth: 1,
        flexDirection: 'row'
    },
    loginButtonImage: {
        width: 30,
        height: 30,
        margin: 9
    },
    loginButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        borderColor: 'transparent',
        borderLeftColor: '#DDD',
        borderWidth: 1,
        paddingLeft: 24,
        lineHeight: 42
    }
});

export default LoginScreen;