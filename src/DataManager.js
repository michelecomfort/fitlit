class DataManager {
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

}
