import './css/styles.scss';
import './images/Home.svg';
import './images/Steps.svg';
import './images/Water.svg';
import './images/Sleep.svg';
import './images/Friends.svg';
import './images/activity.svg'
import './images/Plus.svg';
import {displayProfileInfo, displayStepInfo, displayHydrationInfo, displaySleepInfo, displayActivityInfo, displayFriendsInfo, scroll, formListen } from './domManipulation';
import { fetchData, postData } from './fetch';
import DataManager from './DataManager';
import UserRepository from './UserRepository';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


// Global Variables
const userRepo = new UserRepository();
const dataManager = new DataManager();

const retrieveAllData = () => {
  Promise.all([fetchData('users'), fetchData('sleep'), fetchData('activity'), fetchData('hydration')]).then(data => {
    parseData(data);
    renderDOM(dataManager);
  }).catch(error => {
    userProfile.childNodes[3].innerHTML = `
  <h2>Hi, There seems to be an error! Please refresh the page!</h2>`
    console.log(error);
  })
};

const parseData = (data) => {
  dataManager.setUserData(data[0].userData);
  dataManager.setSleepData(data[1].sleepData);
  dataManager.setActivityData(data[2].activityData);
  dataManager.setHydrationData(data[3].hydrationData);
};

const renderDOM = (dataManager) => {
  userRepo.buildUserRepo(dataManager, dataManager.userData);
  const randomUser = userRepo.retrieveUser(getRandomIndex(userRepo.users));
  userRepo.activeUser = randomUser;
  displayAllUserInfo(randomUser, userRepo);
};

const displayAllUserInfo = (user, userRepo) => {
  displayProfileInfo(user);
  displayActivityInfo(user, userRepo, dataManager);
  displayStepInfo(user, userRepo);
  displayHydrationInfo(user);
  displaySleepInfo(user);
  formListen(userRepo);
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length + 1);
};

retrieveAllData();