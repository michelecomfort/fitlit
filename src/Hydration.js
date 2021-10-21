import { hydrationData } from '../src/sampleData.js';

export default class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  getUserData(id) {
    this.userHydration = this.hydrationData.filter(user => user.userID === id);
  }

  getTotalAverageDrank() {
    const total = this.userHydration.reduce((sum, day) => {
      sum += day.numOunces;
      return sum;
    }, 0)
    return total / this.userHydration.length;
  }

  getOzDrank(date) {
    const today = this.userHydration.find(user => user.date === date);
    return today.numOunces;
  }

  // getWeeklyDrank() {

  // }

}

