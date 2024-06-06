import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen, ForgotPasswordScreen, NotificationScreen, EditProfileScreen } from "../screens";
import { ROUTES } from "../constants";
import DrawerNavigator from "./DrawerNavigator";
import { View, ActivityIndicator } from 'react-native';
import { AuthService } from '../services';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [loading, setLoading] = useState(true);

    const authService = new AuthService();

    const checkUserLoggedIn = () => {
        try {
            const user = authService.getCurrentUser;
            setIsLoggedIn(!!user);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUserLoggedIn();
        // const unsubscribe = authService.authStateChangesListener((user) => {
        //     setIsLoggedIn(!!user);
        // });

        // return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack.Navigator
            initialRouteName={isLoggedIn ? ROUTES.DRAWER : ROUTES.LOGIN}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.SIGNUP} component={SignupScreen} />
            <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
            <Stack.Screen name={ROUTES.DRAWER} component={DrawerNavigator} />
            <Stack.Screen name={ROUTES.NOTIFICATION} component={NotificationScreen} />
            <Stack.Screen name={ROUTES.EDITPROFILE} component={EditProfileScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
