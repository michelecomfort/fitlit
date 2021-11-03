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

  averageActiveMinutes(startDate) {
    let startIndex;
    this.userActivityData.find((data, index) => {
      if (data.date === startDate) {
        startIndex = index;
      }
    });
    const week = this.userActivityData.reduce((week, data, index) => {
      if (index >= startIndex && index < startIndex + 6) {
        week.push(data);
      }
      return week;
    }, []);
    const average = week.reduce((sum, data) => {
      return sum + data.minutesActive;
    }, 0);

    return Math.round(average / week.length);
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
}