import { assert } from 'chai';
import { sampleData } from '../src/sampleData.js'
import DataManager from '../src/DataManager.js'
import { userData, hydrationData, sleepData, activityData } from '../src/sampleData.js'

describe('Data Manager', function() {
  let dataManager;


  beforeEach(function() {
    dataManager = new DataManager()

  })

  it('should be a function', function() {
    assert.isFunction(DataManager)
  })

  it('should be an instance of DataManager', function() {
    assert.instanceOf(dataManager, DataManager)
  })

  it('should have userData, hydrationData, sleepData and activityData set to null', function() {
    assert.equal(dataManager.userData, null)
    assert.equal(dataManager.hydrationData, null)
    assert.equal(dataManager.sleepData, null)
    assert.equal(dataManager.activityData, null)
  })

  it('should set user data', function() {
    dataManager.setUserData(userData)
    assert.equal(dataManager.userData, userData )
  })

  it('should set user hydration data', function() {
    dataManager.setHydrationData(hydrationData)
    assert.equal(dataManager.hydrationData, hydrationData)
  })

  it('should set user sleep data', function() {
    dataManager.setSleepData(sleepData)
    assert.equal(dataManager.sleepData, sleepData)
  })

  it('should set activity data', function() {
    dataManager.setActivityData(activityData)
    assert.equal(dataManager.activityData, activityData)
  })
})
