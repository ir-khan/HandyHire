import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
    SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Ionicons } from 'react-native-vector-icons';
import { COLORS, IMGS } from '../constants';
import { DatabaseService, AuthService } from '../services';
import { UserProfile } from '../models';

var width1;

const SignupScreen = ({ navigation }) => {

    const styles = useStyles();
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [error, setError] = useState({});

    const databaseService = new DatabaseService();
    const authService = new AuthService();

    const validateForm = () => {
        let error = {};

        if (!fullName) error.fullName = 'Name is required';
        if (!userName) error.userName = 'Username is required';
        if (!email) error.email = 'Email is required';
        if (!password) error.password = 'Password is required';
        if (!confirmPassword) error.confirmPassword = 'Password is required';

        setError(error);

        return Object.keys(error).length === 0;
    };

    const handleSignUp = async () => {
        // Check if all fields are filled
        if (validateForm() && password === confirmPassword) {
            // Log the data
            console.log('Name:', fullName);
            console.log('Username', userName);
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Password:', confirmPassword);

            try {
                const userCredential = await authService.signup(email, password);
                if (userCredential != null) {
                    const userProfile = new UserProfile({
                        uid: userCredential.user.uid,
                        fullName: fullName,
                        userName: userName,
                        email: email,
                        password: password,
                    });
                    const result = await databaseService.createUserProfile(userProfile);
                    if (result === true) {
                        navigation.goBack();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <SafeAreaView
            style={styles.container}>
            <StatusBar
                style="light" />
            <Image
                style={styles.image}
                source={IMGS.bgimage}
            />

            {/* lights */}
            <View
                style={styles.imageContainer}
            >
                <Animated.Image
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    style={{ height: width1 * 0.50, width: width1 * 0.2 }}
                    source={IMGS.light}
                />
                <Animated.Image
                    entering={FadeInUp.delay(400).duration(1000).springify()}
                    style={{ height: width1 * 0.3555, width: width1 * 0.145 }}
                    source={IMGS.light}
                />
            </View>

            {/* title & form */}
            <View style={styles.body}>
                {/* Title */}
                <View
                    style={styles.titleContainer}>
                    <Animated.Text
                        entering={FadeInUp.duration(1000).springify()}
                        style={styles.title}
                    >
                        Sign Up
                    </Animated.Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                <Animated.View entering={FadeInDown.duration(1000).springify()}
                        style={[
                            styles.inputContainer,
                            error.fullName ?
                                { marginBottom: 3 } :
                                { marginBottom: styles.inputContainer.marginBottom }
                        ]}>
                        <Ionicons style={styles.preIcon}
                            name='id-card' size={26} />
                        <TextInput
                            onChangeText={setFullName}
                            value={fullName}
                            style={styles.textInput} placeholder='Full name'
                            placeholderTextColor={COLORS.gray} />
                    </Animated.View>
                    {
                        error.fullName ? (<Text style={styles.errorText}>{error.fullName}</Text>) : null
                    }
                    <Animated.View entering={FadeInDown.duration(1000).springify()}
                        style={[
                            styles.inputContainer,
                            error.userName ?
                                { marginBottom: 3 } :
                                { marginBottom: styles.inputContainer.marginBottom }
                        ]}>
                        <Ionicons style={styles.preIcon}
                            name={'person'} size={26} />
                        <TextInput
                            onChangeText={setUserName}
                            value={userName}
                            autoCapitalize="none"
                            style={styles.textInput} placeholder='Username'
                            placeholderTextColor={COLORS.gray} />
                    </Animated.View>
                    {
                        error.userName ? (<Text style={styles.errorText}>{error.userName}</Text>) : null
                    }
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}
                        style={[
                            styles.inputContainer,
                            error.email ?
                                { marginBottom: 3 } :
                                { marginBottom: styles.inputContainer.marginBottom }
                        ]}>
                        <Ionicons style={styles.preIcon} name={'mail'} size={26} />
                        <TextInput onChangeText={setEmail}
                            value={email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.textInput} placeholder='Email'
                            placeholderTextColor={COLORS.gray}
                        />
                    </Animated.View>
                    {
                        error.email ? (<Text style={styles.errorText}>{error.email}</Text>) : null
                    }
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}
                        style={[styles.inputContainer,
                        error.password ?
                            { marginBottom: 3 } :
                            { marginBottom: styles.inputContainer.marginBottom },
                        ]}>
                        <Ionicons style={styles.preIcon}
                            name={'lock-closed'}
                            size={26} />
                        <TextInput onChangeText={setPassword}
                            value={password}
                            style={styles.textInput}
                            placeholder='Password'
                            autoCapitalize="none"
                            placeholderTextColor={COLORS.gray}
                            secureTextEntry={showPassword} />
                        <Ionicons style={styles.eyeIcon}
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={26}
                            onPress={() => { setShowPassword(!showPassword) }} />
                    </Animated.View>
                    {
                        error.password ? (<Text style={styles.errorText}>{error.password}</Text>) : null
                    }
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}
                        style={[styles.inputContainer,
                        error.confirmPassword ?
                            { marginBottom: 3 } :
                            { marginBottom: styles.inputContainer.marginBottom + 12 },
                        ]}>
                        <Ionicons style={styles.preIcon}
                            name={'lock-closed'}
                            size={26} />
                        <TextInput onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            style={styles.textInput}
                            placeholder='Confirm password'
                            autoCapitalize="none"
                            placeholderTextColor={COLORS.gray}
                            secureTextEntry={showPassword} />
                        <Ionicons style={styles.eyeIcon}
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={26}
                            onPress={() => { setShowPassword(!showPassword) }} />
                    </Animated.View>
                    {
                        error.confirmPassword ? (<Text style={[styles.errorText,
                            error.confirmPassword ?
                            { marginBottom: styles.errorText.marginBottom + 12 } :
                            { marginBottom: styles.inputContainer.marginBottom + 12 }
                        ]}>{error.confirmPassword}</Text>) : null
                    }
                    <Animated.View
                        entering={FadeInDown.delay(600).duration(1000).springify()}
                        style={styles.signupButtonContainer}
                    >
                        <TouchableOpacity
                            onPress={handleSignUp} style={styles.signupButton}>
                            <Text style={styles.signupButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <Animated.View
                    entering={FadeInDown.delay(800).duration(1000).springify()}
                    style={styles.loginTextContainer}
                >
                    <Text style={{ fontSize: 17 }}>Already have an account? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

export default SignupScreen;

function useStyles() {

    const { width, height } = useWindowDimensions();

    width1 = width;

    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: "white",
            width: "100%",
            height: "100%",
        },
        image: {
            width: "100%",
            height: "100%",
            position: "absolute",
        },
        imageContainer: {
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            position: "absolute",
        },
        body: {
            width: width,
            height: height,
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center',
            paddingTop: 70,
            paddingBottom: 40,
            position: 'absolute',
        },
        titleContainer: {
            display: "flex",
            alignItems: "center",
        },
        title: {
            color: COLORS.white,
            fontWeight: "bold",
            letterSpacing: 0.5,
            fontSize: 48,
        },
        form: {
            display: "flex",
            alignItems: "center",
            width: '95%',
            marginHorizontal: 16,
            paddingVertical: 30,
            backgroundColor: COLORS.white2,
            //borderWidth: 1,
            //borderColor: COLORS.white,
            //borderRadius: 10,
            //elevation: 2,
            //shadowColor: COLORS.gray,
            //shadowOpacity: 1,
            //shadowOffset: 1,
            //shadowRadius: 5,
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
        signupButtonContainer: {
            width: width * 0.9,
        },
        signupButton: {
            width: "100%",
            backgroundColor: COLORS.primary,
            padding: 12,
            borderRadius: 16,
        },
        signupButtonText: {
            color: COLORS.white,
            fontSize: 20,
            lineHeight: 28,
            fontWeight: "700",
            textAlign: "center",
        },
        loginTextContainer: {
            flexDirection: "row",
        },
        loginText: {
            color: COLORS.secondary,
            fontSize: 17,
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
            paddingLeft: 14,
        },
    });
}
