import User from "./User";

export default class UserRepository {
  constructor() {
    this.users = [];
  }

  buildUserRepo(userData) {
    this.users = userData.map(user => new User(user));
  }

  retrieveUser(id) {
    return this.users.find(user => user.id === id);
  }

  calculateAverageStepGoal() {
    const total = this.users.reduce((sum, user) => {
      sum += user.dailyStepGoal;
      return sum;
    }, 0);
    return total / this.users.length;
  }
}