import { assert } from 'chai';
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
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "numSteps": 8000,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "numSteps": 9000,
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

  
  it('should return if user reached their step goal on a given date', function() {
    assert.equal(activity.checkStepGoal('2019/06/15'), false);
  });
  
  it('should return all the days user step goal was met', function() {
    assert.deepEqual(activity.filterAchievedStepGoalDays(), [{
      "userID": 1,
      "date": "2019/06/19",
      "numSteps": 11374,
      "minutesActive": 213,
      "flightsOfStairs": 13
    }]);
  });
  
  it('should return the user\'s all time stair climbing record', function() {
    assert.equal(activity.findStairClimbingRecord(), 33);
  });

  it('should return a week\'s worth of a user\'s step counts', function() {
    assert.deepEqual(activity.getWeekOfActivityData('2019/06/15', 'steps'), [3577, 4294, 7402, 3486, 11374, 8000, 9000])
  })
  
  it('should return a week\'s worth of a user\'s stairs climbed', function() {
    assert.deepEqual(activity.getWeekOfActivityData('2019/06/15', 'stairs'), [16, 10, 33, 32, 13, 13, 13])
  })

  it('should return a week\'s worth of a user\'s active minutes', function() {
    assert.deepEqual(activity.getWeekOfActivityData('2019/06/15', 'minutes'), [140, 138, 116, 114, 213, 213, 213])
  })
  
  it('should return the average active minutes for a given week', function() {
    assert.equal(activity.getWeeklyAverageActiveMinutes('2019/06/15'), 164);
  });
});