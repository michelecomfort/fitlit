var assert = require('chai').assert;
import Sleep from '../src/Sleep';
import { userData, sleepData } from '../src/sampleData.js';

describe('Sleep', function () {
  let sleep;
  let today;
  let user1Data;

  beforeEach(function () {
    user1Data = [
      {userID: 1, date: '2020/01/16', hoursSlept: 6.1, sleepQuality: 2.2},
      {userID: 1, date: '2020/01/17', hoursSlept: 7, sleepQuality: 2.3},
      {userID: 1, date: '2020/01/18', hoursSlept: 7.5, sleepQuality: 2.4},
      {userID: 1, date: '2020/01/19', hoursSlept: 8.5, sleepQuality: 2.5},
      {userID: 1, date: '2020/01/20', hoursSlept: 8, sleepQuality: 2.6},
      {userID: 1, date: '2020/01/21', hoursSlept: 5.3, sleepQuality: 2.7},
      {userID: 1, date: '2020/01/22', hoursSlept: 6.6, sleepQuality: 2.8}
    ];
    sleep = new Sleep(user1Data);
    today = '2020/01/22';
  })

  it.only('should be a function', function() {
    assert.isFunction(Sleep);
  });

  it.only('should be an instance of Sleep', function() {
    assert.instanceOf(sleep, Sleep);
  });

  it.only('should be instantiated with a specific user\'s data', function() {
    assert.equal(sleep.sleepData, user1Data);
  });

  it.only('should calculate a user\'s average number of hours slept per day', function() {
    assert.equal(sleep.getTotalAverageHoursSlept(), 7);
  });

  it.only('should calculate how many hours they slept for a specific day indetified by date', function() {
    assert.equal(sleep.getHoursSlept(today), 6);
    assert.equal(sleep.getHoursSlept('2020/01/18'), 7);
  });

  it.only('should calculate how many hours slept each day for a week', function() {
    assert.deepEqual(sleep.getWeeklyHoursSlept('2020/01/16'), [6, 7, 7, 8, 8, 5, 6]);
  });




})
