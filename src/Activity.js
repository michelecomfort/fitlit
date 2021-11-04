export default class Activity {
  constructor (userActivityData, userStrideLength, userDailyStepGoal) {
    this.userActivityData = userActivityData;
    this.userStrideLength = userStrideLength;
    this.userDailyStepGoal = userDailyStepGoal;
  }

  milesWalked(date) {
    const day = this.userActivityData.find(user => user.date === date);
    const feetWalked = this.userStrideLength * day.numSteps;
    const milesWalked = feetWalked / 5280;
    return milesWalked.toFixed(1);
  }

  activeMinutes(date) {
    const day = this.userActivityData.find(data => data.date === date);
    return day.minutesActive;
  }

  checkStepGoal(date) {
    const day = this.userActivityData.find(data => data.date === date);
    if (day.numSteps >= this.userDailyStepGoal) {
      return true;
    } else {
      return false;
    }
  }

  filterAchievedStepGoalDays() {
    const achievedGoalDays = this.userActivityData.filter(data => this.checkStepGoal(data.date));
    return achievedGoalDays;
  }

  findStairClimbingRecord() {
    const climbingRecord = this.userActivityData.reduce((record, data) => {
      if (record < data.flightsOfStairs) {
        record = data.flightsOfStairs;
      }
      return record;
    }, 0);
    return climbingRecord;
  }

  getWeekOfActivityData(start, type) {
    const week = [];
    const startDate = this.userActivityData.find(day => day.date === start);
    const dayIndex = this.userActivityData.indexOf(startDate);
    this.userActivityData.reduce((acc) => {
      if (acc < 7) {
        switch (type) {
          case 'steps':
            week.push(this.userActivityData[dayIndex + acc].numSteps);
            break;
          case 'stairs':
              week.push(this.userActivityData[dayIndex + acc].flightsOfStairs);
              break;
          case 'minutes':
            week.push(this.userActivityData[dayIndex + acc].minutesActive);
            break;
        }
        acc++;
      }
      return acc;
    }, 0);
    return week;
  }

  getWeeklyAverageActiveMinutes(start) {
    const week = this.getWeekOfActivityData(start, 'minutes')
    const totalMinutes = week.reduce((acc, day) => {
      acc += day;
      return acc;
    }, 0)
    return Math.round(totalMinutes / week.length) 
  }
}
