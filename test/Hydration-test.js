var assert = require('chai').assert;
import Hydration from '../src/Hydration';

describe('Hydration', function() {
  const user1Data = [
    { userID: 1, date: '2020/01/16', numOunces: 30 },
    { userID: 1, date: '2020/01/17', numOunces: 31 },
    { userID: 1, date: '2020/01/18', numOunces: 32 },
    { userID: 1, date: '2020/01/19', numOunces: 33 },
    { userID: 1, date: '2020/01/20', numOunces: 34 },
    { userID: 1, date: '2020/01/21', numOunces: 35 },
    { userID: 1, date: '2020/01/22', numOunces: 36 }

  ];
  const hydration = new Hydration(user1Data);
  const today = '2020/01/22';

  it(' should be a function', function() {
    assert.isFunction(Hydration);
  });

  it(' should be an instance of Hydration', function() {
    assert.instanceOf(hydration, Hydration);
  });

  it(' should be instantiated with a specific user\'s data inside a property', function() {
    assert.equal(hydration.hydrationData, user1Data);
  });

  it(' should calculate a user\'s average oz consumed per day for all time', function() {
    assert.equal(hydration.getTotalAverageDrank(), 33);
  });

  it(' should calculate a user\'s oz consumed on a single day', function() {
    assert.equal(hydration.getOzDrank(today), 36);
    assert.equal(hydration.getOzDrank('2020/01/17'), 31);
  });

  it(' should calculate a user\'s oz consumed each day for a week', function() {
    assert.deepEqual(hydration.getWeeklyDrank("2020/01/16"), [30, 31, 32, 33, 34, 35, 36]);
  });

});
