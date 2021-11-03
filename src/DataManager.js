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
