export default class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  };

  getTotalAverageHoursSlept() {
    const averageHours = this.sleepData.reduce((total, day) => {
      total += day.hoursSlept;
    return total;
  }, 0);
    return Math.floor(averageHours / this.sleepData.length);
  };

  getHoursSlept(date) {
    const day = this.sleepData.find(user => {
      return user.date === date;
    })
    return Math.floor(day.hoursSlept);
  };

  getWeeklyHoursSlept(start) {
    let week = [];
    let startDate = this.sleepData.find(day => day.date === start);
    let dayIndex = this.sleepData.indexOf(startDate);
    const result = this.sleepData.reduce((acc, date) => {
      if (acc < 7) {
        week.push(Math.floor(this.sleepData[dayIndex + acc].hoursSlept));
        acc++;
      };
      return acc;
    }, 0);
    return week;
  };
  
};
