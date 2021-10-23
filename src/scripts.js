import './css/styles.css';
// import userData from './data/users';
import UserRepository from './UserRepository';
import Hydration from './Hydration';
import {
  getUserData,
  getSleepData,
  getActivityData,
  getHydrationData,

} from './fetch'
import DataManager from './DataManager'

import './images/Kyra.png';

import './images/Home.svg';
import './images/Steps.svg';
import './images/Water.svg';
import './images/Sleep.svg';
import './images/Friends.svg';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'



// Query Selectors
const userProfile = document.querySelector('#userProfile');
const stepGoals = document.querySelector('#stepGoals');
const waterStats = document.getElementById('waterStats')


// Event Listeners
// window.addEventListener('load', renderDOM);


// Global Variables

const userRepo = new UserRepository();
const dataManager = new DataManager();
// let data;

// Functions
const allData = Promise.all([getUserData(), getSleepData(), getActivityData(), getHydrationData()])

const retrieveAllData = (data) => {
  allData.then(data => {
    parseData(data);
    renderDOM();
  })
}

const parseData = (data) => {
  // instantiate Hydration & Sleep classes here????
  dataManager.setUserData(data[0].userData);
  dataManager.setSleepData(data[1].sleepData);
  dataManager.setActivityData(data[2].activityData)
  dataManager.setHydrationData(data[3].hydrationData)

}

const renderDOM = () => {
  const data = Object.values(dataManager.userData);
  // everything
  const hydrationData = Object.values(dataManager.hydrationData);
  const sleepData = Object.values(dataManager.sleepData);
  const activityData = Object.values(dataManager.activityData);

  userRepo.buildUserRepo(dataManager, data, hydrationData, sleepData, activityData);

  const randomUser = userRepo.retrieveUser(getRandomIndex(userRepo.users));

  console.log(randomUser);
  // greetUser(randomUser);
  displayProfileInfo(randomUser);
  displayStepInfo(randomUser);
  displayHydrationInfo(randomUser);
  randomUser.hydrationData.getWeeklyDrank('2020/01/14');
};

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length + 1);
};

// const greetUser = (user) => {
//   greeting.innerText = `Welcome, ${user.returnFirstName()}!`;
// };

const displayProfileInfo = (user) => {
  userProfile.childNodes[3].innerHTML = `
  <h2>Hi, ${user.returnFirstName()}!</h2>
  <p>${user.address}</p>
  <p>${user.email}</p>
  `;
};

const displayStepInfo = (user) => {
  stepGoals.childNodes[1].innerHTML += `
  <h4>${user.dailyStepGoal}</h4>
  <p class="unit">/day</p>
  `;
  stepGoals.childNodes[3].innerHTML += `
  <h4 class="orange">${userRepo.calculateAverageStepGoal()}</h4>
  <p class="unit">/day</p>
  `;
  // stepGoals.childNodes[7].innerText = `${userRepo.calculateAverageStepGoal()} steps/day`;
};

const displayHydrationInfo = (user) => {
  waterStats.childNodes[3].innerHTML = `
  <h3>${user.hydrationData.getOzDrank('2020/01/21')}</h4> 
  <p>oz</p>
  `;
};


retrieveAllData();
