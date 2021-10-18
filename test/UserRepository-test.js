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
    user1 = new User();
    user2 = new User();
    user3 = new User();
    user4 = new User();
    user1.initializeUser(userData[0]);
    user2.initializeUser(userData[1]);
    user3.initializeUser(userData[2]);
    user4.initializeUser(userData[3]);

    userRepo = new UserRepository();
  });

  it('should be a function', function() {
    assert.isFunction(UserRepository);
  });

  it('should be an instance of User Repository', function() {
    assert.instanceOf(userRepo, UserRepository);
  });

  it('should have a method that creates instances of user', function() {
    userRepo.buildUserRepo([userData[0], userData[1], userData[2], userData[3]]);
    assert.deepEqual(userRepo.createdUsers, [user1, user2, user3, user4]);
  });

  it('should return specific user data given an id', function() {
    assert.deepEqual(userRepo.retrieveUser(1), user1);
  });

  it('should calculate the average step goal amongst all users', function() {
    assert.equal(userRepo.calculateAverageStepGoal(), 7500);
  });
});