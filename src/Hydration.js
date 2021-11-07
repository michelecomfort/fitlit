export default class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  getTotalAverageDrank() {
    const total = this.hydrationData.reduce((sum, day) => {
      sum += day.numOunces;
      return sum;
    }, 0)
    return Math.floor(total / this.hydrationData.length);
  }

  getOzDrank(date) {
    const day = this.hydrationData.find(user => user.date === date);
    return day.numOunces;
  }

}
