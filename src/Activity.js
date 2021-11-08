export default class Activity {
  constructor (activityData, userStrideLength, userDailyStepGoal) {
    this.activityData = activityData;
    this.userStrideLength = userStrideLength;
    this.userDailyStepGoal = userDailyStepGoal;
  }

  milesWalked(date) {
    const day = this.activityData.find(user => user.date === date);
    const feetWalked = this.userStrideLength * day.numSteps;
    const milesWalked = feetWalked / 5280;
    return milesWalked.toFixed(1);
  }

  todayActivity(date, activity) {
    const day = this.activityData.find(data => data.date === date);
    switch (activity) {
    case 'steps':
      return day.numSteps;
    case 'stairs':
      return day.flightsOfStairs;
    case 'minutes':
      return day.minutesActive;
    }
  }

  checkStepGoal(date) {
    const day = this.activityData.find(data => data.date === date);
    if (day.numSteps >= this.userDailyStepGoal) {
      return true;
    } else {
      return false;
    }
  }

  filterAchievedStepGoalDays() {
    const achievedGoalDays = this.activityData.filter(data => this.checkStepGoal(data.date));
    return achievedGoalDays;
  }

  findStairClimbingRecord() {
    const climbingRecord = this.activityData.reduce((record, data) => {
      if (record < data.flightsOfStairs) {
        record = data.flightsOfStairs;
      }
      return record;
    }, 0);
    return climbingRecord;
  }

  getWeekOfActivityData(start, type) {
    const week = [];
    const startDate = this.activityData.find(day => day.date === start);
    const dayIndex = this.activityData.indexOf(startDate);
    this.activityData.reduce((acc) => {
      if (acc < 7) {
        switch (type) {
        case 'steps':
          week.push(this.activityData[dayIndex + acc].numSteps);
          break;
        case 'stairs':
          week.push(this.activityData[dayIndex + acc].flightsOfStairs);
          break;
        case 'minutes':
          week.push(this.activityData[dayIndex + acc].minutesActive);
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
