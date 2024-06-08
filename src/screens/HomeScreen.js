import { StyleSheet, View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CustomDrawerButton } from '../components';
import { Ionicons } from 'react-native-vector-icons';
import { COLORS, ROUTES } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthService, DatabaseService } from '../services';

const HomeScreen = ({ navigation }) => {

    const [userData, setUserData] = useState('');

    const dataBaseSevice = new DatabaseService();

    useEffect(() => {
        getUserData();

    }, []);


    const getUserData = async () => {
        const data = await dataBaseSevice.getUserProfile();
        if (data) {
            setUserData(data);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style='' />
            <View style={styles.appBar}>
                <CustomDrawerButton navigation={navigation} />
                <Text style={styles.appBarText}>HandyHire</Text>
                <TouchableOpacity onPress={() => navigation.push(ROUTES.NOTIFICATION)}>
                    <Ionicons name='notifications-sharp' size={30} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.cardText}>Welcome to HandyHire</Text>
                    <Text style={styles.cardText}>{userData.fullName}</Text>
                </View>
                <View>

                </View>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'static',
        height: '13%',
        backgroundColor: COLORS.white,
        paddingBottom: 13,
        paddingHorizontal: 5,
        elevation: 3,
    },
    appBarText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    body: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        height: '20%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    list: {
        flex: 1,
        padding: 10,
        height: 40,
        width: 270,
    },
    listItem: {
        width: '90%',
        //height: '30%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2.5,
        marginHorizontal: 10,
    },
    listItemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
});