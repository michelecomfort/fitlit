var assert = require('chai').assert;
import Hydration from '../src/Hydration';
import { userData, hydrationData } from '../src/sampleData.js';

describe('Hydration', function() {
  const hydration = new Hydration(hydrationData);
  const user1Data = [
    { userID: 1, date: '2019/06/15', numOunces: 38 },
    { userID: 1, date: '2020/1/22', numOunces: 37 }
  ];
  const today = '2020/1/22';

  it(' should be a function', function() {
    assert.isFunction(Hydration);
  });

  it(' should be an instance of Hydration', function() {
    assert.instanceOf(hydration, Hydration)
  });

  it(' should be instantiated with data inside a property', function() {
    assert.equal(hydration.hydrationData, hydrationData);
  });

  it(' should be able to filter data for a specific user', function() {
    hydration.getUserData(1);
    assert.deepEqual(hydration.userHydration, user1Data);
  });

  it(' should calculate a user\'s average oz consumed per day for all time', function() {
    assert.equal(hydration.getTotalAverageDrank(), 37.5)
  });

  it(' should calculate a user\'s oz consumed on a single day', function() {
    hydration.getUserData(1);
    assert.equal(hydration.getOzDrank(today), 37);
    assert.equal(hydration.getOzDrank('2019/06/15'), 38);
  });

  it(' should calculate a user\'s consumed each day for a week', function() {

  });

});