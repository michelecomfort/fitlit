export default class User {
  constructor() {

    this.id = null
    this.name = null
    this.address = null
    this.email = null
  }

  initializeUser(userData) {
    this.id = userData.id
    this.name = userData.name
    this.address = userData.address
    this.email = userData.email
  }
}

// export default User;
