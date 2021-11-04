import './css/styles.css';
import './images/Kyra.png';
import './images/Home.svg';
import './images/Steps.svg';
import './images/Water.svg';
import './images/Sleep.svg';
import './images/Friends.svg';
import './images/activity.svg'
import { getUserData, getSleepData, getActivityData, getHydrationData } from './fetch';
// import { generateFlightsChart, generateActivityChart, generateWaterChart, generateSleepChart } from './charts';
import {displayProfileInfo, displayStepInfo, displayHydrationInfo, displaySleepInfo, displayFriendsInfo } from './domManipulation';
import DataManager from './DataManager';
import UserRepository from './UserRepository';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Query Selectors
const userProfile = document.querySelector('#userProfile');
// const scrollSleep = document.getElementById('scrollSleep')


// Event Listeners
// scrollSleep.addEventListener('click', scrollToSleep)

// Global Variables
const userRepo = new UserRepository();
const dataManager = new DataManager();

//Functions
// const scrollToSleep = () => {
//   window.scrollTo(0, 0)
// }

const retrieveAllData = () => {
  Promise.all([getUserData(), getSleepData(), getActivityData(), getHydrationData()]).then(data => {
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
  displayAllUserInfo(randomUser, userRepo);
};

const displayAllUserInfo = (user, userRepo) => {
  displayProfileInfo(user);
  // displayActivityInfo(user)
  displayStepInfo(user, userRepo);
  displayHydrationInfo(user);
  displaySleepInfo(user);
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length + 1);
};

retrieveAllData();
