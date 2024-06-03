import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import React from 'react';
import { Ionicons } from 'react-native-vector-icons';
import { COLORS } from '../constants';


const NotificationScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Ionicons name='chevron-back-sharp' size={30} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.appBarText}>Notifications</Text>
                <View style={{width: 35}}></View>
            </View>
        </View>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontWeight: '600',
        color: COLORS.primary,
    },
});