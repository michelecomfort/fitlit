export default class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  };

  getAverageHoursSlept() {
    const averageHours = this.sleepData.reduce((total, day) => {
      total += day.hoursSlept;
    return total;
  }, 0);
    return Math.round((averageHours / this.sleepData.length) * 10) / 10;
  };

  getHoursSlept(date) {
    const day = this.sleepData.find(user => {
      return user.date === date;
    })
    return day.hoursSlept;
  };

  getWeeklyHoursSlept(start) {
    let week = [];
    let startDate = this.sleepData.find(day => day.date === start);
    let dayIndex = this.sleepData.indexOf(startDate);
    const result = this.sleepData.reduce((acc, date) => {
      if (acc < 7) {
        week.push(this.sleepData[dayIndex + acc].hoursSlept);
        acc++;
      };
      return acc;
    }, 0);

    return week;
  };

  getAverageSleepQuality() {
    const quality = this.sleepData.reduce((total, day) => {
      total += day.sleepQuality;
      return total;
    }, 0);
    return Math.round((quality / this.sleepData.length) * 10) / 10;
  };

  getQualityOfSleep(date) {
    const day = this.sleepData.find(user => user.date === date);
    return day.sleepQuality;
  };

  getWeeklySleepQuality(date) {
    let week = [];
    let startDate = this.sleepData.find(day => day.date === date);
    let dayIndex = this.sleepData.indexOf(startDate);
    const result = this.sleepData.reduce((acc, day) => {
      if (acc < 7) {
        week.push(this.sleepData[dayIndex + acc].sleepQuality);
        acc++;
      };
      return acc;
    }, 0)
    return week;
  };
};