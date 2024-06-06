import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from 'react-native-vector-icons';
import { COLORS, IMGS, ROUTES } from '../constants';
import { AuthService } from '../services';

var width1;

const LoginScreen = ({ navigation }) => {

    const styles = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [error, setError] = useState({});

    const authService = new AuthService(); 

    const validateForm = () => {
        let error = {};

        if (!email) error.email = 'Email is required';
        if (!password) error.password = 'Password is required';

        setError(error);

        return Object.keys(error).length === 0;
    };

    const handleLogin = async () => {
        if (validateForm()) {
            console.log('Email:', email);
            console.log('Password:', password);

            try {
                const userCredential = await authService.login(email, password);
                if (userCredential != null) {
                    // Navigate to Login screen
                    navigation.navigate(ROUTES.DRAWER);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} style={styles.container}>
            <StatusBar style='light' />
            <Image style={styles.image}
                source={IMGS.bgimage} />

            {/* lights */}
            <View style={styles.imageContainer}>
                <Animated.Image
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    style={{ height: width1 * 0.50, width: width1 * 0.2 }}
                    source={IMGS.light} />
                <Animated.Image
                    entering={FadeInUp.delay(400).duration(1000).springify()}
                    style={{ height: width1 * 0.3555, width: width1 * 0.145 }}
                    source={IMGS.light} />
            </View>

            {/* title & form */}
            <View style={styles.body}>
                {/* Title */}
                <View style={styles.titleContainer}>
                    <Animated.Text
                        entering={FadeInUp.duration(1000).springify()}
                        style={styles.title}>Login</Animated.Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
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
                            name='mail'
                            size={26} />
                        <TextInput
                            style={styles.textInput}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder='Email' placeholderTextColor={COLORS.gray} />
                    </Animated.View>
                    {
                        error.email ? (<Text style={styles.errorText}>{error.email}</Text>) : null
                    }
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(1000).springify()}
                        style={[styles.inputContainer,
                        error.password ?
                            { marginBottom: 3 } :
                            { marginBottom: styles.inputContainer.marginBottom + 12 },
                        ]}>
                        <Ionicons
                            style={styles.preIcon}
                            name='lock-closed'
                            size={26} />
                        <TextInput
                            style={styles.textInput}
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                            placeholder='Password' placeholderTextColor={COLORS.gray} secureTextEntry={showPassword} />
                        <Ionicons
                            style={styles.eyeIcon}
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={26}
                            onPress={() => { setShowPassword(!showPassword) }} />
                    </Animated.View>
                    {
                        error.password ? (<Text style={[styles.errorText,
                        error.password ?
                            { marginBottom: styles.errorText.marginBottom + 12 } :
                            { marginBottom: styles.inputContainer.marginBottom + 12 }
                        ]}>{error.password}</Text>) : null
                    }
                    <Animated.View
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                        style={styles.loginButtonContainer}>
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View>
                        <TouchableOpacity onPress={() => { navigation.push(ROUTES.FORGOT_PASSWORD) }}>
                            <Text
                                style={{ fontSize: 17, color: COLORS.primary, fontWeight: '700' }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </Animated.View>

                </View>
                <Animated.View
                    entering={FadeInDown.delay(600).duration(1000).springify()}
                    style={styles.signupTextContainer}>
                    <Text style={{ fontSize: 17 }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate(ROUTES.SIGNUP);
                    }}>
                        <Text style={styles.signupText}>SignUp</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;

function useStyles() {

    const { width, height } = useWindowDimensions();

    width1 = width;

    return StyleSheet.create({
        container: {
            display: 'flex',
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
        },
        image: {
            width: '100%',
            height: '100%',
            position: 'absolute',
        },
        imageContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            position: 'absolute',
        },
        body: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingTop: 160,
            paddingBottom: 40,
        },
        titleContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        title: {
            color: COLORS.white,
            fontWeight: 'bold',
            letterSpacing: 0.5,
            fontSize: 48,
        },
        form: {
            display: 'flex',
            alignItems: 'center',
            marginHorizontal: 16,
            marginTop: 16,
        },
        inputContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.inputBox,
            padding: 20,
            borderRadius: 16,
            width: width * 0.9,
            marginBottom: 16,
        },
        textInput: {
            flex: 1,
            paddingLeft: 10,
            marginHorizontal: 3,
            fontSize: 20,
        },
        loginButtonContainer: {
            width: width * 0.9,
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
        signupTextContainer: {
            flexDirection: 'row',
        },
        signupText: {
            color: COLORS.secondary,
            fontSize: 17
        },
        preIcon: {
            color: COLORS.secondary,
            justifyContent: 'flex-start'
        },
        eyeIcon: {
            color: COLORS.secondary,
            justifyContent: 'flex-end',
        },
        errorText: {
            color: 'red',
            marginBottom: 10,
            alignSelf: 'flex-start',
            paddingLeft: 6
        },
    });
}
