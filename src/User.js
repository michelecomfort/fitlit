import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';

export default class User {
  constructor(userData, hydrationData, sleepData, activityData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
    this.hydrationDataObj = new Hydration(hydrationData)
    this.hydrationData = this.hydrationDataObj.hydrationData
    this.sleepData = new Sleep(sleepData);
    this.activityData = new Activity(activityData, userData.strideLength, userData.dailyStepGoal);
  }

  returnFirstName() {
    return this.name.split(' ')[0];
  }

  findFriends(users) {
    this.friends = users.filter(user => this.friends.includes(user.id));
  }

  getWeeklyStats(date, dataset, info){
    const week = [];
    const startDate = this[`${dataset}Data`].find(day => day.date === date);
    const dayIndex = this[`${dataset}Data`].indexOf(startDate);
    this[`${dataset}Data`].reduce((acc) => {
      if (acc < 7) {
        week.push(this[`${dataset}Data`][dayIndex + acc][`${info}`]);
        acc++;
      }
      return acc;
    }, 0);
    return week;
    }
}
