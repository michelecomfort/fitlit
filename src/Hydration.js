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

  getWeeklyDrank(start) {
    const week = [];
    const startDate = this.hydrationData.find(day => day.date === start);
    const startDateIndex = this.hydrationData.indexOf(startDate);
    const result = this.hydrationData.reduce((acc, date) => {
      if (acc < 7) {
        week.push(this.hydrationData[startDateIndex + acc].numOunces);
        acc++;
      }
      return acc;
    }, 0)
    return week;
  }

}
