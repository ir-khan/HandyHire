import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from 'react-native-vector-icons';
import { COLORS, IMGS } from '../constants';
import { AuthService, MediaService, DatabaseService, StorageService } from '../services';
import { UserProfile } from '../models';

const EditProfileScreen = ({ navigation }) => {

    const [file, setFile] = useState(null);
    const [user, setUser] = useState('');
    const [userData, setUserData] = useState('');
    const [fullName, setFullName] = useState('');
    const [pfpURL, setPfpURL] = useState(null);

    const authService = new AuthService();
    const dataBaseService = new DatabaseService();
    const storageService = new StorageService();

    useEffect(() => {
        getUser();
        getUserData();
    }, []);

    const getUser = async () => {
        const user = await authService.getCurrentUser();
        if (user) {
            setUser(user);
        }
    };

    const getUserData = async () => {
        const data = await dataBaseService.getUserProfile();
        if (data) {
            setUserData(data);
            setFullName(data.fullName);
            setPfpURL(data.pfpURL); // Set initial pfpURL if it exists
        }
    };

    const selectImage = () => {
        MediaService.selectImageFromGallery((source) => {
            console.log("Selected image: " + source.assets[0].uri);
            setFile(source.assets[0].uri);
        });
    };

    const takeNewPhoto = () => {
        MediaService.takePhoto((source) => {
            console.log("Taken photo: " + source.assets[0].uri);
            setFile(source.assets[0].uri);
        });
    };

    const handleImagePress = () => {
        Alert.alert(
            'Select Image',
            'Choose the image source',
            [
                { text: 'Select from Gallery', onPress: selectImage },
                { text: 'Take Photo', onPress: takeNewPhoto },
            ],
            { cancelable: false }
        );
    };

    const updateProfile = async () => {
        try {
            let downloadURL = pfpURL;
            if (file) {
                downloadURL = await storageService.uploadUserPfp(file, user.uid);
                console.log("Profile picture uploaded successfully. Download URL:", downloadURL);
            }

            const userProfile = new UserProfile({
                uid: user.uid,
                fullName: fullName,
                pfpURL: downloadURL,
            });

            const result = await dataBaseService.updateUserProfile(userProfile);
            if (result) {
                console.log("Profile updated successfully.");
            } else {
                console.error("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={30} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.appBarText}>Edit Profile</Text>
                <View style={{ width: 35 }}></View>
            </View>
            <ScrollView style={styles.body}>
                <View>
                    <TouchableOpacity onPress={handleImagePress}>
                        <Image source={file ? { uri: file } : pfpURL ? { uri: pfpURL } : IMGS.avatar } style={styles.avatar} />
                    </TouchableOpacity>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.labelDataInput} value={fullName} onChangeText={setFullName} />
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.labelData}>{userData.email}</Text>
                    <Text style={styles.label}>Username</Text>
                    <Text style={styles.labelData}>{userData.userName}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={updateProfile}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default EditProfileScreen;

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
    backButton: {
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
    labelDataInput: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray,
        height: 45,
        paddingHorizontal: 10,
    },
    labelData: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        marginHorizontal: 10,
        color: COLORS.gray
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    button: {
        width: '80%',
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    buttonText: {
        fontSize: 18,
        color: COLORS.white,
        fontWeight: 'bold',
    },
});
