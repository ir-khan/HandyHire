import { database } from "../firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { UserProfile } from '../models';


class DatabaseService {

    #usersCollection;

    constructor() {
        this.#setupCollectionReferences();
    }

    #setupCollectionReferences() {
        this.#usersCollection = collection(database, "users");
    }

    async createUserProfile(userProfile) {
        try {
            const userDoc = doc(this.#usersCollection, userProfile.uid);
            await setDoc(userDoc, userProfile.toJson());
            console.log("User profile added successfully");
            return true;
        } catch (error) {
            console.error("Error adding user profile: ", error);
            return false;
        }
    }

    async getUserProfile(uid) {
        try {
            const userDoc = doc(this.#usersCollection, uid);
            const docSnapshot = await getDoc(userDoc);
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const userProfile = UserProfile.fromJson(userData);
                return userProfile;
            } else {
                console.error("User profile does not exist");
                return null;
            }
        } catch (error) {
            console.error("Error getting user profile: ", error);
            return null;
        }
    }

    async getUserProfiles() {
        try {
            const querySnapshot = await getDocs(this.#usersCollection);
            const userProfiles = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const userProfile = UserProfile.fromJson(data);
                userProfiles.push(userProfile);
            });
            return userProfiles;
        } catch (error) {
            console.error("Error getting user profiles: ", error);
            return [];
        }
    }

    async updateUserProfile(userProfile) {
        try {
            const userDoc = doc(this.#usersCollection, userProfile.uid);
            await updateDoc(userDoc, {
                fullName: userProfile.fullName,
                userName: userProfile.userName,
                email: userProfile.email,
                // Add other profile fields here
            });
            console.log("User profile updated successfully");
            return true;
        } catch (error) {
            console.error("Error updating user profile: ", error);
            return false;
        }
    }
}

export default DatabaseService;
