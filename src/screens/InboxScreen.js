import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { CustomDrawerButton } from '../components';
import { COLORS } from '../constants';

const InboxScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <CustomDrawerButton navigation={navigation} />
        <Text style={styles.appBarText}>Inbox</Text>
        <View style={{ width: 35 }}></View>
      </View>
    </View>
  );
};

export default InboxScreen;

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
});