export class UserData {
    constructor(user) {
      this.uid = user._id;
      this.name = `${user.first_name} ${user.last_name}`;
      this.emailAddress = user.email;
      this.userRole = user.role;
    }
  }
  