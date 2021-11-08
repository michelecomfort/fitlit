var assert = require('chai').assert;
import Sleep from '../src/Sleep';

describe('Sleep', function () {
  let sleep;
  let today;
  let user1Data;

  beforeEach(function () {
    user1Data = [
      {userID: 1, date: '2020/01/16', hoursSlept: 6.1, sleepQuality: 2.2},
      {userID: 1, date: '2020/01/17', hoursSlept: 7, sleepQuality: 3.3},
      {userID: 1, date: '2020/01/18', hoursSlept: 7.5, sleepQuality: 4.4},
      {userID: 1, date: '2020/01/19', hoursSlept: 8.5, sleepQuality: 5.5},
      {userID: 1, date: '2020/01/20', hoursSlept: 8, sleepQuality: 2.6},
      {userID: 1, date: '2020/01/21', hoursSlept: 5.9, sleepQuality: 4.7},
      {userID: 1, date: '2020/01/22', hoursSlept: 6.7, sleepQuality: 2.8}
    ];
    sleep = new Sleep(user1Data);
    today = '2020/01/22';
  });

  it('should be a function', function() {
    assert.isFunction(Sleep);
  });

  it('should be an instance of Sleep', function() {
    assert.instanceOf(sleep, Sleep);
  });

  it('should be instantiated with a specific user\'s data', function() {
    assert.equal(sleep.sleepData, user1Data);
  });

  it('should calculate a user\'s average number of hours slept per day', function() {
    assert.equal(sleep.getAverageHoursSlept(), 7.1);
  });

  it('should calculate how many hours they slept for a specific day identified by date', function() {
    assert.equal(sleep.getHoursSlept(today), 6.7);
    assert.equal(sleep.getHoursSlept('2020/01/18'), 7.5);
  });

  it('should calculate a user\'s average quality of hours slept per day', function() {
    assert.equal(sleep.getAverageSleepQuality(), 3.6);
  });

  it('should calculate what their quality of sleep was for a specific day identified by date', function() {
    assert.equal(sleep.getQualityOfSleep(today), 2.8);
    assert.equal(sleep.getQualityOfSleep('2020/01/18'), 4.4);
  });

});
