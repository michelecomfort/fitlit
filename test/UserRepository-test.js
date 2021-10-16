import { assert } from 'chai';
import User from '../src/UserRepository';
import { userData, hydrationData, sleepData, activityData } from './test-data.js'

describe('User Repository', () => {
  let user1;
  let user2;
  let user3;
  let user4;

  beforeEach(function() {

    user1 = new User(userData[0])
    user2 = new User(userData[1])
    user3 = new User(userData[2])
    user4 = new User(userData[3])
  })
  it('should be a function', function () {
    assert.isFunction(User);
  });

  it('should be an instance of User', function() {
    const user = new User()
    assert.instanceOf(user, User)
  })

});
