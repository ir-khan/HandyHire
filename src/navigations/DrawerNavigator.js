import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { InboxScreen, ServicesScreen } from '../screens';
import { COLORS, ROUTES } from '../constants';
import BottomTabNavigator from './BottomTabNavigator';
import { CustomDrawer } from '../components';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer  {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: COLORS.white,
                drawerActiveTintColor: COLORS.primary,
                drawerInactiveTintColor: COLORS.white,
                drawerLabelStyle: {
                    marginLeft: -20,
                    fontSize: 16,
                },
                
                drawerStyle: {
                    backgroundColor: COLORS.primary,
                    width: '50%',
                },
            }}>
            <Drawer.Screen
                name={ROUTES.DASHBOARD}
                component={BottomTabNavigator}
                options={{
                    title: 'Dashboard',
                    drawerIcon: ({  focused, color, size }) => {
                        let iconName;
                        iconName = focused ? 'view-dashboard-variant' : 'view-dashboard-variant-outline';
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                }}
            />

            <Drawer.Screen
                name={ROUTES.INBOX}
                component={InboxScreen}
                options={{
                    title: 'Inbox',
                    drawerIcon: ({  focused, color, size }) => {
                        let iconName;
                        iconName = focused ? 'mail' : 'mail-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                }}
            />

            <Drawer.Screen
                name={ROUTES.SERVICES}
                component={ServicesScreen}
                options={{
                    title: 'Services',
                    drawerIcon: ({  focused, color, size }) => {
                        let iconName;
                        iconName = focused ? 'construct' : 'construct-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                }}
            />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;