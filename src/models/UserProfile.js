class UserProfile {
    constructor({ uid, fullName, userName, email, password }) {
        this.uid = uid;
        this.fullName = fullName;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    static fromJson(json) {
        return new UserProfile({
            uid: json.uid,
            fullName: json.fullName,
            userName: json.userName,
            email: json.email,
            password: json.password,
        });
    }

    toJson() {
        return {
            uid: this.uid,
            fullName: this.fullName,
            userName: this.userName,
            email: this.email,
            password: this.password,
        };
    }
}

export default UserProfile;
