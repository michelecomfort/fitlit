import { assert } from 'chai';
import { userData, hydrationData, sleepData, activityData } from '../src/data/sampleData';
import Activity from '../src/Activity';

describe('Activity', function() {
  let activity;
  let userActivityData;

  beforeEach(function() {
    activity = new Activity();
    userActivityData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
      },
      {
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 4294,
      "minutesActive": 138,
      "flightsOfStairs": 10
      },
      {
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 7402,
      "minutesActive": 116,
      "flightsOfStairs": 33
      },
      {
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3486,
      "minutesActive": 114,
      "flightsOfStairs": 32
      },
      {
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 11374,
      "minutesActive": 213,
      "flightsOfStairs": 13
      }];
  });

  it('should be a function', function() {
    assert.isFunction(Activity);
  });

  it('should be an instance of activity', function() {
    assert.instanceOf(activity, Activity);
  });

  it('should be instantiated with activity data', function() {
    assert.deepEqual(activity.activityData, userActivityData);
  });

  it('should return the miles a user has walked on a given date', function() {

  });
});