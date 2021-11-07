export default class DataManager {
  constructor() {
    this.userData = null;
    this.hydrationData = null;
    this.sleepData = null;
    this.stepData = null;
  }

  filterData(id, dataset) {
    return this[`${dataset}Data`].filter(user => user.userID === id);
  }

  // getWeeklyStats(date, dataset, info){
  //   console.log(dataset)
  //   const week = [];
  //   const startDate = this[`${dataset}Data`].find(day => day.date === date);
  //   const dayIndex = this[`${dataset}Data`].indexOf(startDate);
  //   this[`${dataset}Data`].reduce((acc) => {
  //     if (acc < 7) {
  //       week.push(this[`${dataset}Data`][dayIndex + acc][`${info}`]);
  //       acc++;
  //     }
  //     return acc;
  //   }, 0);
  //   return week;
  //   }

  setUserData(userData) {
    this.userData = userData;
  }

  setHydrationData(hydrationData) {
    this.hydrationData = hydrationData;
  }

  setSleepData(sleepData) {
    this.sleepData = sleepData;
  }

  setActivityData(activityData) {
    this.activityData = activityData;
  }
}
