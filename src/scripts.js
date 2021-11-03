import './css/styles.css';
import './images/Kyra.png';
import './images/Home.svg';
import './images/Steps.svg';
import './images/Water.svg';
import './images/Sleep.svg';
import './images/Friends.svg';
import './images/activity.svg'
import { getUserData, getSleepData, getActivityData, getHydrationData } from './fetch';
import { generateFlightsChart, generateActivityChart, generateWaterChart, generateSleepChart } from './charts';
// import { } from './domManipulation';
import DataManager from './DataManager';
import UserRepository from './UserRepository';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Query Selectors
const userProfile = document.querySelector('#userProfile');
const todaySteps = document.querySelector('#stepsToday');
const stepGoals = document.querySelector('#stepGoals');
const waterStats = document.querySelector('#waterStats');
const sleepHours = document.querySelector('#sleepHours');
const sleepQuality = document.querySelector('#sleepQuality');
const friendContainer = document.querySelector('#FriendDisplay');
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
    renderDOM();
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

const renderDOM = () => {
  const data = Object.values(dataManager.userData);
  const hydrationData = Object.values(dataManager.hydrationData);
  const sleepData = Object.values(dataManager.sleepData);
  const activityData = Object.values(dataManager.activityData);
  userRepo.buildUserRepo(dataManager, data, hydrationData, sleepData, activityData);
  const randomUser = userRepo.retrieveUser(getRandomIndex(userRepo.users));
  displayAllUserInfo(randomUser);
};

const displayAllUserInfo = (user) => {
  displayProfileInfo(user);
  // displayActivityInfo(user)
  displayStepInfo(user);
  displayHydrationInfo(user);
  displaySleepInfo(user);
  displayFriendsInfo(user);
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length + 1);
};

const displayProfileInfo = (user) => {
  userProfile.childNodes[3].innerHTML = `
  <h2 class="pink">Hi, ${user.returnFirstName()}!</h2>
  <p>${user.address}</p>
  <p class="email">${user.email}</p>
  `;
};

// const displayActivityInfo = (user) => {
//   activityGoals.childNodes[].innerHTML += `
//   <h4 class='pink'>85</h4>
//   <p class='unit'>/minutes</p>`
// }

const displayStepInfo = (user) => {
  stepGoals.childNodes[1].innerHTML += `
  <h4 class="pink">${user.dailyStepGoal}</h4>
  <p class="unit">/day</p>
  `;
  stepGoals.childNodes[3].innerHTML += `
  <h4 class="orange">${userRepo.calculateAverageStepGoal()}</h4>
  <p class="unit">/day</p>
  `;
  todaySteps.innerHTML = `
  <h3 class="pink">${user.activityData[user.activityData.length - 1].numSteps}</h3>
  <p>steps</p>
  `;
};

const displayHydrationInfo = (user) => {
  waterStats.childNodes[3].innerHTML = `
  <h3 class="pink">${user.hydrationData.getOzDrank('2020/01/21')}</h3>
  <p>oz</p>
  `;
  generateWaterChart(user);
  generateActivityChart(user)
  generateFlightsChart(user)
};

const displaySleepInfo = (user) => {
  sleepHours.childNodes[1].innerHTML = `
  <h4 class="pink">${user.sleepData.getHoursSlept('2020/01/22')}</h4>
  <p>today</p>
  `;
  sleepHours.childNodes[3].innerHTML = `
  <p class="orange ">${user.sleepData.getAverageHoursSlept()}</p>
  <p>avg</p>
  `;
  sleepQuality.childNodes[1].innerHTML = `
  <h4 class="pink">${user.sleepData.getQualityOfSleep('2020/01/22')}</h4>
  <p>today</p>
  `;
  sleepQuality.childNodes[3].innerHTML = `
  <p class="orange">${user.sleepData.getAverageSleepQuality()}</p>
  <p>avg</p>
  `;
  generateSleepChart(user);
};

const displayFriendsInfo = (user) => {
  friendContainer.innerHTML = `<img src="./images/Friends.svg" alt='friends icon'>`;
  user.friends.forEach(friend => {
    friendContainer.innerHTML += `<p>${friend.name}</p>`
  });
}

retrieveAllData();
