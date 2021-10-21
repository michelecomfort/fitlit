export default class DataManager {
  constructor() {
    this.userData = null;
    this.hydrationData = null;
    this.sleepData = null;
    this.stepData = null;
  }

  setUserData(userData) {
    this.userData = userData;
  }

  setHydrationData(hydrationData) {
    this.hydrationData = hydrationData;
  }

  filterData(id, dataset) {
    console.log(id)
    return this[`${dataset}Data`].filter(user => user.userID === id)
  }

  setSleepData(sleepData) {
    this.sleepData = sleepData
  }

  setActivityData(activityData) {
    this.activityData = activityData
  }

}
