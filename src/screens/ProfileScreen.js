import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CustomDrawerButton } from '../components';
import { COLORS, IMGS, ROUTES } from '../constants';
import { FontAwesome } from 'react-native-vector-icons';
import { DatabaseService } from '../services';

const ProfileScreen = ({ navigation }) => {

  const [imageURL, setImageURL] = useState(null);
  const [userData, setUserData] = useState('');

  const dataBaseSevice = new DatabaseService();

  useEffect(() => {
    getUserData();

  }, []);

  const getUserData = async () => {
    const data = await dataBaseSevice.getUserProfile();
    if (data && data.pfpURL) {
      setUserData(data);
      setImageURL(data.pfpURL);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate(ROUTES.EDITPROFILE);
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <CustomDrawerButton navigation={navigation} />
        <Text style={styles.appBarText}>Profile</Text>
        <View style={{ width: 35 }}>
          <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
            <FontAwesome name="edit" size={30} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View>
        <Image source={imageURL ? { uri: imageURL } : IMGS.avatar} style={styles.avatar} />
          <Text style={styles.label}>Name</Text>
          <Text style={styles.labelData}>{userData.fullName}</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.labelData}>{userData.email}</Text>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.labelData}>{userData.userName}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

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
  editButton: {
    top: -2.5,
},
  body: {
    flex: 1,
    padding: 10,
    width: '90%',
    alignSelf: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 30,
  },
  label: {
    fontSize: 22,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  labelData: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    marginHorizontal: 10,
  },
});