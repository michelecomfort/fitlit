import { assert } from 'chai';
import User from '../src/User';
import UserRepository from '../src/UserRepository';
import DataManager from '../src/DataManager';
import { userData, hydrationData, sleepData, activityData } from '../src/sampleData.js'

describe('User Repository', function() {
  let userRepo;
  let dataManager;
  let user1;
  let user2;

  beforeEach(function() {
    userRepo = new UserRepository();
    dataManager = new DataManager();

    dataManager.setUserData(userData);
    dataManager.setHydrationData(hydrationData);
    dataManager.setSleepData(sleepData);
    dataManager.setActivityData(activityData);

    userRepo.buildUserRepo(dataManager, userData);

    user1 = userRepo.users[0];
    user2 = userRepo.users[1];

  });

  it('should be a function', function() {
    assert.isFunction(UserRepository);
  });

  it('should be an instance of User Repository', function() {
    assert.instanceOf(userRepo, UserRepository);
  });

  it('should have a method that creates instances of user', function() {
    assert.deepEqual(userRepo.users[0], user1);
  });

  it('should return specific user data given an id', function() {
    assert.deepEqual(userRepo.retrieveUser(1), user1);
  });

  it('should calculate the average step goal amongst all users', function() {
    assert.equal(userRepo.calculateAverageStepGoal(), 7500);
  });

  it('should calculate the average sleep quality for all users', function() {
    assert.equal(userRepo.calculateAllUserAverageSleepQuality(sleepData), 3.7);
  });

  it('should calculate average number of steps taken for specific day across all users', function() {
    assert.equal(userRepo.calculateAllUserAverage('2019/06/15', activityData, 'steps'), 4690);
  });

  it('should calculate the average flights of stairs climbed for a specific day across all users', function() {
    assert.equal(userRepo.calculateAllUserAverage('2019/06/15', activityData, 'stairs'), 23);
  });

  it('should calculate the average minutes active for a specific day across all users', function() {
    assert.equal(userRepo.calculateAllUserAverage('2019/06/15', activityData, 'minutes'), 127);
  });
});
