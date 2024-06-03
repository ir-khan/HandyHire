import { StyleSheet, Text, TouchableOpacity, TextInput, View, SafeAreaView, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from 'react-native-vector-icons';
import { COLORS } from '../constants';
import { ForgotPasswordService } from '../services';

const ForgotPasswordScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState({});

    const validateForm = () => {
        let error = {};

        if (!email) error.email = 'Email is required';

        setError(error);

        return Object.keys(error).length === 0;
    };

    const handleForgotPassword = async () => {
        if (validateForm()) {
            console.log('Email:', email);

            try {
                const request = await ForgotPasswordService(email);
                if (request == true) {
                    Alert.alert('Check your email!')
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.appBar, Platform.OS == 'android' ? { marginTop: 20 } : { marginTop: styles.appBar.marginTop }]}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Ionicons name='chevron-back-sharp' size={30} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.appBarText}>Forgot Password</Text>
                <View style={{ width: 35 }}></View>
            </View>
            <View style={styles.body}>
                <Text style={styles.text}>Enter your email</Text>
                <Animated.View
                    entering={FadeInDown.duration(1000).springify()}
                    style={[
                        styles.inputContainer,
                        error.email ?
                            { marginBottom: 3 } :
                            { marginBottom: styles.inputContainer.marginBottom }
                    ]}>
                    <Ionicons
                        style={styles.preIcon}
                        name={'mail'}
                        size={26} />
                    <TextInput
                        style={styles.textInput}
                        value={email}
                        onChangeText={setEmail}
                        //keyboardType="email-address"
                        placeholder='Email' placeholderTextColor={'gray'} />
                </Animated.View>
                {
                    error.email ? (<Text style={styles.errorText}>{error.email}</Text>) : null
                }
                <Animated.View
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                        style={styles.loginButtonContainer}>
                        <TouchableOpacity
                            onPress={handleForgotPassword}
                            style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Send</Text>
                        </TouchableOpacity>
                    </Animated.View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flex: 1,
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'static',
    },
    appBarText: {
        fontSize: 30,
        fontWeight: '600',
        color: COLORS.primary,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        alignSelf: 'flex-start',
        paddingLeft: 26,
        marginVertical: 20,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.inputBox,
        padding: 20,
        borderRadius: 16,
        width: '90%',
        marginBottom: 16,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        marginHorizontal: 3,
        fontSize: 20,
    },
    preIcon: {
        color: COLORS.secondary,
        justifyContent: 'flex-start'
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        alignSelf: 'flex-start',
        paddingLeft: 6
    },
    loginButtonContainer: {
        width: '90%',
    },
    loginButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 16,
        marginBottom: 15,
    },
    loginButtonText: {
        color: COLORS.white,
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '700',
        textAlign: 'center',
    },
});