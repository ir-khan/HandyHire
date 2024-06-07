import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { CustomDrawerButton } from '../components';
import { COLORS, IMGS, ROUTES } from '../constants';
import { FontAwesome } from 'react-native-vector-icons';
import { AuthService, MediaService, DatabaseService } from '../services';

const ProfileScreen = ({ navigation }) => {

  const [avatarSource, setAvatarSource] = useState(IMGS.avatar);
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

  const handleEditProfile = () => {
    navigation.navigate(ROUTES.EDITPROFILE);
  };

  const selectImage = () => {
    MediaService.selectImageFromGallery((source) => {
      setAvatarSource({ uri: source.assets[0].uri });
    });
  };

  const takeNewPhoto = () => {
    MediaService.takePhoto((source) => {
      setAvatarSource({ uri: source.assets[0].uri });
    });
  };


  const handleImagePress = () => {
    Alert.alert(
      'Select Image',
      'Choose the image source',
      [
        { text: 'Select from Gallery', onPress: selectImage, },
        { text: 'Take Photo', onPress: takeNewPhoto },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <CustomDrawerButton navigation={navigation} />
        <Text style={styles.appBarText}>Profile</Text>
        <View style={{ width: 35 }}>
          <TouchableOpacity onPress={handleEditProfile}>
            <FontAwesome name="edit" size={30} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View>
          <TouchableOpacity onPress={handleImagePress}>
            <Image source={avatarSource} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View></View>
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
  },
  appBarText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  body: {
    flex: 1,
    padding: 10,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 30,
  },
});