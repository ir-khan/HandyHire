import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ProfileScreen, InboxScreen, ServicesScreen } from '../screens';
import { Ionicons } from 'react-native-vector-icons';
import { COLORS, ROUTES } from '../constants';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.secondary,
                tabBarStyle: styles.tabBarStyle,
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    let iconSize;
                    if (route.name === ROUTES.HOME) {
                        iconName = focused ? 'home' : 'home-outline';
                        iconSize = 30;
                    } else if (route.name === ROUTES.INBOX) {
                        iconName = focused ? 'mail' : 'mail-outline';
                        iconSize = 30;
                    } else if (route.name === ROUTES.SERVICES) {
                        iconName = focused ? 'construct' : 'construct-outline';
                        iconSize = 30;
                    } else if (route.name === ROUTES.PROFILE) {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                        iconSize = 35;
                    }
                    return <Ionicons name={iconName} size={iconSize} color={focused ? COLORS.primary : COLORS.secondary} />;
                }
            })}>
            <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
            <Tab.Screen name={ROUTES.INBOX} component={InboxScreen} />
            <Tab.Screen name={ROUTES.SERVICES} component={ServicesScreen} />
            <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
        </Tab.Navigator >
    );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
    tabBarStyle: {
        elevation: 5,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
