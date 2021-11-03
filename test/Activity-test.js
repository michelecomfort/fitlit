import { assert } from 'chai';
import { userData, hydrationData, sleepData, activityData } from '../src/data/sampleData';
import Activity from '../src/Activity';

describe('Activity', function() {
  let userActivityData;
  let userStrideLength;
  let userDailyStepGoal;
  let activity;

  beforeEach(function() {
    userActivityData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
      },
      {
      "userID": 1,
      "date": "2019/06/16",
      "numSteps": 4294,
      "minutesActive": 138,
      "flightsOfStairs": 10
      },
      {
      "userID": 1,
      "date": "2019/06/17",
      "numSteps": 7402,
      "minutesActive": 116,
      "flightsOfStairs": 33
      },
      {
      "userID": 1,
      "date": "2019/06/18",
      "numSteps": 3486,
      "minutesActive": 114,
      "flightsOfStairs": 32
      },
      {
      "userID": 1,
      "date": "2019/06/19",
      "numSteps": 11374,
      "minutesActive": 213,
      "flightsOfStairs": 13
      }];
      userStrideLength = 4.4;
      userDailyStepGoal = 9500;
      activity = new Activity(userActivityData, userStrideLength, userDailyStepGoal);
  });

  it('should be a function', function() {
    assert.isFunction(Activity);
  });

  it('should be an instance of activity', function() {
    assert.instanceOf(activity, Activity);
  });

  it('should be instantiated with activity data', function() {
    assert.deepEqual(activity.userActivityData, userActivityData);
  });

  it('should be instantiated with the users stride length', function() {
    assert.equal(activity.userStrideLength, userStrideLength);
  });

  it('should be instantiated with the users step goal', function() {
    assert.equal(activity.userDailyStepGoal, 9500);
  });

  it('should return the miles a user has walked on a given date', function() {
    assert.equal(activity.milesWalked('2019/06/15'), 3.0);
  });

  it('should return the minutes a user was active on a given date', function() {
    assert.equal(activity.activeMinutes('2019/06/15'), 140);
  });

  it('should return the average minutes a user was active for a given week', function() {
    assert.equal(activity.averageActiveMinutes('2019/06/15'), 144);
  });

  it('should return if user reached their step goal on a given date', function() {
    assert.equal(activity.checkStepGoal('2019/06/15'), false);
  });

  it.only('should return all the days user step goal was met', function() {
    assert.deepEqual(activity.filterAchievedStepGoalDays(), [{
      "userID": 1,
      "date": "2019/06/18",
      "numSteps": 11374,
      "minutesActive": 213,
      "flightsOfStairs": 13
    }]);
  });

  it.skip('should return the users all time stair climbing record', function() {
    assert.equal(activity.findStairClimbingRecord(), 33);
  });
});