export default class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getHoursSlept(date) {
    const day = this.sleepData.find(user => {
      return user.date === date;
    })
    return day.hoursSlept;
  }

  getAverageHoursSlept() {
    const averageHours = this.sleepData.reduce((total, day) => {
      total += day.hoursSlept;
      return total;
    }, 0);
    return Math.round((averageHours / this.sleepData.length) * 10) / 10;
  }

  getQualityOfSleep(date) {
    const day = this.sleepData.find(user => user.date === date);
    return day.sleepQuality;
  }

  getAverageSleepQuality() {
    const quality = this.sleepData.reduce((total, day) => {
      total += day.sleepQuality;
      return total;
    }, 0);
    return Math.round((quality / this.sleepData.length) * 10) / 10;
  }
}
