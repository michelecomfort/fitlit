export default class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  getTotalAverageDrank() {
    const total = this.userHydration.reduce((sum, day) => {
      sum += day.numOunces;
      return sum;
    }, 0)
    return Math.floor(total / this.userHydration.length);
  }

  getOzDrank(date) {
    const day = this.hydrationData.find(user => user.date === date);
    return day.numOunces;
  }

  getWeeklyDrank(start) {
    let week = [];
    let startDate = this.hydrationData.find(day => day.date === start);
    let dayIndex = this.hydrationData.indexOf(startDate);
    const result = this.hydrationData.reduce((acc, date) => {
      if (acc < 7) {
        week.push(this.hydrationData[dayIndex + acc].numOunces);
        acc++;
      }
      return acc;
    }, 0)
    return result;
  }

}
