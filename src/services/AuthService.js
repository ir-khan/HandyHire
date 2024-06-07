import { 
    auth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    onAuthStateChanged,
} from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../models';

class AuthService {

    #user;

    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
                this.#user = userCredential.user; // Set the private variable
            }
            return userCredential;
        } catch (error) {
            console.log(error.message);
        }
        return null;
    }

    async signup(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
                this.#user = userCredential.user; // Set the private variable
            }
            return userCredential;
        } catch (error) {
            console.log(error.message);
        }
        return null;
    }

    async logout() {
        try {
            await auth.signOut();
            await AsyncStorage.removeItem('user');
            this.#user = null; // Clear the private variable
            return true;
        } catch (error) {
            console.log(error.message);
        }
        return false;
    }

    async forgotPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            console.log(error.message);
        }
        return null;
    }

    async getCurrentUser() {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                this.#user = UserProfile.fromJson(parsedUser);
                return this.#user;
            }
        } catch (error) {
            console.log(error.message);
        }
        return null;
    }

    authStateChangesListener(callback) {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await AsyncStorage.setItem('user', JSON.stringify(user));
                this.#user = user; // Set the private variable
            } else {
                await AsyncStorage.removeItem('user');
                this.#user = null; // Clear the private variable
            }
            callback(user);
        });
    }
}

export default AuthService;
