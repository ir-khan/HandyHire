import { 
    auth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    onAuthStateChanged 
} from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
    static async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
            }
            return userCredential;
        } catch (error) {
            console.log(error.message);
        }
        return null;
    }

    static async signup(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
            }
            return userCredential;
        } catch (error) {
            console.log(error.message);
        }
        return null;
    }

    static async logout() {
        try {
            await auth.signOut();
            await AsyncStorage.removeItem('user');
            return true;
        } catch (error) {
            console.log(error.message);
        }
        return false;
    }

    static async forgotPassword(email) {
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            console.log(error.message);
        }
        return null;
    }

    static async getCurrentUser() {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                //console.log(user)
                const data = JSON.parse(user);
                //console.log(data);
                const id = data.uid;
                //console.log(id)
                //return user;
                return JSON.parse(user);
            }
        } catch (error) {
            console.log(error.message);
        }
        return null;
    }

    static authStateChangesListener(callback) {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await AsyncStorage.setItem('user', JSON.stringify(user));
            } else {
                await AsyncStorage.removeItem('user');
            }
            callback(user);
        });
    }
}

export default AuthService;
