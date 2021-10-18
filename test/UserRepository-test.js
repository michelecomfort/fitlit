import { assert } from 'chai';
import User from '../src/User';
import UserRepository from '../src/UserRepository';
import { userData, hydrationData, sleepData, activityData } from '../src/sampleData.js'

//User repo is going create instances of user for all user data


describe('User Repository', function() {
  let user1;
  let user2;
  let user3;
  let user4;
  let userRepo;

  beforeEach(function() {
    user1 = new User(userData[0]);
    user2 = new User(userData[1]);
    user3 = new User(userData[2]);
    user4 = new User(userData[3]);

    userRepo = new UserRepository();
    userRepo.buildUserRepo([userData[0], userData[1], userData[2], userData[3]]);
  });

  it('should be a function', function() {
    assert.isFunction(UserRepository);
  });

  it('should be an instance of User Repository', function() {
    assert.instanceOf(userRepo, UserRepository);
  });

  it('should have a method that creates instances of user', function() {
    assert.deepEqual(userRepo.users, [user1, user2, user3, user4]);
  });

  it('should return specific user data given an id', function() {
    assert.deepEqual(userRepo.retrieveUser(1), user1);
  });

  it('should calculate the average step goal amongst all users', function() {
    assert.equal(userRepo.calculateAverageStepGoal(), 7500);
  });
});

//Will need tests for class instances creating in the future