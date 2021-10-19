export default class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
    this.hydrationData = null;
    this.sleepData = null;
    this.activityData = null;
  }

  returnFirstName() {
    return this.name.split(' ')[0];
  }

//   retrieveHydrationData(id) {
//     this.hydrationData = new Hydration();

//   }
}
