import { assert } from 'chai';
import { userData, hydrationData, sleepData, activityData } from '../src/data/sampleData';
import Activity from '../src/Activity';

describe('Activity', function() {
  let activity;

  beforeEach(function() {
    activity = new Activity();
  });

  it('should be a function', function() {
    assert.isFunction(Activity);
  });

  it('should be an instance of activity', function() {
    assert.instanceOf(activity, Activity);
  });
});