import { assert } from 'chai';
import { sampleData } from '../src/sampleData.js'
import DataManager from '../src/DataManager.js'
import { userData, hydrationData, sleepData, activityData } from '../src/sampleData.js'

describe('Data Manager', () => {
  let dataManager;


  beforeEach(() => {
    dataManager = new DataManager()

  })

  it('should be a function', () => {
    assert.isFunction(DataManager)
  })

  it('should be an instance of DataManager', () => {
    assert.instanceOf(dataManager, DataManager)
  })

  it('should have userData, hydrationData, sleepData and activityData set to null', () => {
    assert.equal(dataManager.userData, null)
    assert.equal(dataManager.hydrationData, null)
    assert.equal(dataManager.sleepData, null)
    assert.equal(dataManager.activityData, null)
  })

  it('should set user data', () => {
    dataManager.setUserData(userData)
    assert.equal(dataManager.userData, userData )
  })

  it('should set user hydration data', () => {
    dataManager.setHydrationData(hydrationData)
    assert.equal(dataManager.hydrationData, hydrationData)
  })

  it('should set user sleep data', () => {
    dataManager.setSleepData(sleepData)
    assert.equal(dataManager.sleepData, sleepData)
  })

  it('should set activity data', () => {
    dataManager.setActivityData(activityData)
    assert.equal(dataManager.activityData, activityData)
  })
})
