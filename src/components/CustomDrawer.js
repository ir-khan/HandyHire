import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from 'react-native-vector-icons';
import { COLORS, IMGS, ROUTES } from '../constants';
import AuthService from '../services/AuthService';
import DatabaseService from '../services/DatabaseService';


const CustomDrawer = (props) => {

    const { navigation } = props;

    const [worker, setWorker] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [userData, setUserData] = useState('');

    const authService = new AuthService();
    const dataBaseSevice = new DatabaseService();

    useEffect(() => {

        getUserData();

    }, []);


    const getUserData = async () => {
        const data = await dataBaseSevice.getUserProfile();
        if (data) {
            setUserData(data);
            setImageURL(data.pfpURL);
        }
    };

    const logOut = async () => {
        const result = await authService.logout();
        if (result == true) {
            navigation.reset({
                index: 0,
                routes: [{ name: ROUTES.LOGIN }],
            });
        }
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.profileContainer}>
                <Text style={styles.name}>{userData.userName}</Text>
                <Image source={imageURL ? { uri: imageURL} : IMGS.avatar} style={styles.image} />
            </View>
            <TouchableOpacity style={styles.workerTextContainer} onPress={() => { setWorker(!worker) }}>
                <Text style={styles.workerText}>{worker ? 'Switch to buyer' : 'Switch to seller'}</Text>
            </TouchableOpacity>
            <View style={styles.drawerListWrapper}>
                <DrawerItemList {...props} />
                <DrawerItem
                    icon={({ size }) => {
                        return <Ionicons name={'log-out-outline'} size={size} color={COLORS.white} />;
                    }}
                    label="Log Out"
                    labelStyle={styles.drawerLabelStyle}
                    onPress={logOut}
                />
            </View>
        </DrawerContentScrollView>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    drawerListWrapper: {
        marginTop: 5,
    },
    profileContainer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    name: {
        color: COLORS.white,
        fontSize: 25,
        fontWeight: 'bold',
    },
    imageContainer: {
        backgroundColor: COLORS.white,
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    workerTextContainer: {
        height: 25,
        justifyContent: 'center',
        marginTop: 10,
    },
    workerText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    drawerLabelStyle: {
        marginLeft: -20,
        fontSize: 16,
        color: COLORS.white,
    },
});