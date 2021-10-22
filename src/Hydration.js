// import { hydrationData } from '../src/sampleData.js';

export default class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  // constructor(idData) {
  //   this.hydrationData = hydrationData;
  // }

  // getUserData(id) {
  //   this.userHydration = this.hydrationData.filter(user => user.userID === id);
  // }

  getTotalAverageDrank() {
    const total = this.userHydration.reduce((sum, day) => {
      sum += day.numOunces;
      return sum;
    }, 0)
    return Math.floor(total / this.userHydration.length);
  }

  getOzDrank(date) {
    console.log(this.hydrationData)
    const day = this.hydrationData.find(user => user.date === date);
    return day.numOunces;
  }

  // getWeeklyDrank(start) {
  //   let week = []
  //   let startDate = this.hydrationData.find(day => day.date === start)
  //   let dayIndex = this.hydrationData.indexOf(startDate)
  //   for (let i = dayIndex; i <= dayIndex + 6; i++) {
  //     week.push(this.hydrationData[i].numOunces)
  //   }
  //   console.log(week)
  //     return week
  //   }

    getWeeklyDrank(start) {
      let week = []
      let startDate = this.hydrationData.find(day => day.date === start)
      let dayIndex = this.hydrationData.indexOf(startDate)
      const result = this.hydrationData.reduce((acc, date) => {
        if (acc < 7) {
          week.push(this.hydrationData[dayIndex+acc].numOunces)
          acc++
        }
        return acc
      }, 0)
      console.log(week)
      return result
    }
  }
