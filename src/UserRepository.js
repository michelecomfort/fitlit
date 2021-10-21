import User from "./User";
import DataManager from './DataManager'

export default class UserRepository {
  constructor() {
    this.users = [];
  }

  buildUserRepo(userData, hydrationData, sleepData, activityData) {
    this.users = userData.map(user => {
      const filteredHydration = dataManager.filterData(user.userID, 'hydration')
      const filteredSleep = dataManager.filterData(user.userID, 'sleep')
      const filteredAcvity = dataManager.filterData(user.userID, 'activity')
      new User(user, filteredHydration, filteredSleep, filteredAcvity));
    }
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
