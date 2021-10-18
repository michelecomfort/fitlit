export default class User {
  constructor() {
    this.id = null;
    this.name = null;
    this.address = null;
    this.email = null;
    this.strideLength = null;
    this.dailyStepGoal = null;
    this.friends = null;
    this.hydrationData = null
    this.sleepData = null
    this.activityData = null
  }

  initializeUser(userData, ) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;

    this.sleepData = new Sleep();
    this.activityData = new Activity();
  }

  retrieveHydrationData(id) {
    this.hydrationData = new Hydration();

  }



}
