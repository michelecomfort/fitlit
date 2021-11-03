export default class Activity {
  constructor (userActivityData, userStrideLength, userDailyStepGoal) {
    this.activityData = userActivityData;
    this.userStrideLength = userStrideLength;
    this.userDailyStepGoal = userDailyStepGoal;
  }

  milesWalked(date) {
    const day = this.activityData.find(user => user.date === date);
    const feetWalked = this.userStrideLength * day.numSteps;
    const milesWalked = feetWalked / 5280;
    return milesWalked.toFixed(1);
  }

  activeMinutes(date) {
    const day = this.activityData.find(user => user.date === date);
    return day.minutesActive;
  }
}