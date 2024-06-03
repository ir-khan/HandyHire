import { StyleSheet, View, Text} from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { CustomDrawerButton } from '../components';
import { Ionicons } from 'react-native-vector-icons';
import { COLORS, ROUTES } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar style='' />
            <View style={styles.appBar}>
                <CustomDrawerButton navigation={navigation} />
                <Text style={styles.appBarText}>HandyHire</Text>
                <TouchableOpacity onPress={() => navigation.push(ROUTES.NOTIFICATION) }>
                    <Ionicons name='notifications-sharp' size={30} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>

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
    },
    appBarText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
});