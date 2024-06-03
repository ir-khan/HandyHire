import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const CustomDrawerButton = ({navigation}) => {

    return (
        <TouchableOpacity
            onPress={() => navigation.openDrawer()}
        >
            <Ionicons name="menu" size={35} color={COLORS.primary} />
        </TouchableOpacity>
    );
};

export default CustomDrawerButton;
