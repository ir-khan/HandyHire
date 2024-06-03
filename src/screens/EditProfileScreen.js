import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { DatabaseService } from '../services';

const EditProfileScreen = () => {
    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    // Function to handle saving the edited profile
    const handleSaveProfile = () => {
        // Create a UserProfile object with the updated data
        const updatedProfile = new UserProfile({
            uid: firebase.auth().currentUser.uid,
            fullName: fullName,
            userName: userName,
            email: email,
            // Add other profile fields here
        });

        // Call the DatabaseService method to update the profile in Firestore
        DatabaseService.updateUserProfile(updatedProfile)
            .then(() => {
                console.log('Profile updated successfully');
                // Navigate back to the Profile screen
                navigation.navigate('Profile');
            })
            .catch((error) => {
                console.error('Error updating profile: ', error);
                // Handle error
            });
    };

    return (
        <View>
            <Text>Edit Profile</Text>
            <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
            />
            <TextInput
                value={userName}
                onChangeText={setUserName}
                placeholder="Username"
            />
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
            />
            {/* Add fields for other profile information */}
            <TouchableOpacity onPress={handleSaveProfile}>
                <Text>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditProfileScreen;
