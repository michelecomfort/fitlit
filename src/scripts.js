import './css/styles.css';
// import userData from './data/users';
import UserRepository from './UserRepository';
import {
  getUserData,
  getSleepData,
  getActivityData,
  getHydrationData,

} from './fetch'
import DataManager from './DataManager'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


// Query Selectors
const userProfile = document.querySelector('#userProfile');
const greeting = document.querySelector('h1');
const stepGoals = document.querySelector('#stepGoals');
console.log(stepGoals);

// Event Listeners
// window.addEventListener('load', renderDOM);


// Global Variables

const userRepo = new UserRepository();
const dataManager = new DataManager();
// let data;

// Functions
const renderDOM = () => {
  let data = Object.values(dataManager.userData)
  userRepo.buildUserRepo(data);
  const randomUser = userRepo.retrieveUser(getRandomIndex(userRepo.users));
  greetUser(randomUser);
  displayProfileInfo(randomUser);
  displayStepInfo(randomUser);
};

const allData = Promise.all([getUserData(), getSleepData(), getActivityData(), getHydrationData()])

const retrieveAllData = (data) => {
  allData.then(data => {
    parseData(data)
    renderDOM();
  })
}

const parseData = (data) => {
  dataManager.setUserData(data[0].userData);
  dataManager.setSleepData(data[1].sleepData);
  dataManager.setActivityData(data[2].activityData)
  dataManager.setHydrationData(data[3].hydrationData)
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length + 1);
}

const greetUser = (user) => {
  greeting.innerText = `Welcome, ${user.returnFirstName()}!`;
}

const displayProfileInfo = (user) => {
  userProfile.innerHTML = `
  <p>Name: ${user.name}</p>
  <p>Address: ${user.address}</p>
  <p>Email: ${user.email}</p>
  <p>Member Since: Oct 2021</p>
`
}

const displayStepInfo = (user) => {
  stepGoals.innerHTML = `
    <p>${user.dailyStepGoal} steps/day</p>
    <p>${userRepo.calculateAverageStepGoal()} steps/day</p>
    `
}



retrieveAllData()
