class UserProfile {
    constructor({ uid = '', fullName = '', userName = '', email = '', password = '', pfpURL = '' } = {}) {
        this.uid = uid;
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.pfpURL = pfpURL;
    }

    static fromJson(json) {
        return new UserProfile({
            uid: json.uid,
            fullName: json.fullName,
            userName: json.userName,
            email: json.email,
            password: json.password,
            pfpURL: json.pfpURL,
        });
    }

    toJson() {
        return {
            uid: this.uid,
            fullName: this.fullName,
            userName: this.userName,
            email: this.email,
            password: this.password,
            pfpURL: this.pfpURL,
        };
    }
}

export default UserProfile;
