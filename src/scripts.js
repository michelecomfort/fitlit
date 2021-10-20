import './css/styles.css';
import userData from './data/users';
import UserRepository from './UserRepository';
import { getUserData, getSleepData, getActivityData, getHydrationData } from './fetch'
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
const data = Object.values(userData);
const userRepo = new UserRepository();

// Functions
const renderDOM = () => {
  userRepo.buildUserRepo(data);
  const randomUser = userRepo.retrieveUser(getRandomIndex(userRepo.users));
  console.log(randomUser.id);
  greetUser(randomUser);
  displayProfileInfo(randomUser);
  displayStepInfo(randomUser);

  Promise.all([getUserData(), getSleepData(), getActivityData(), getHydrationData()]).then(data => {
    console.log(data)
    const dataManager = new DataManager();
    dataManager.setUserData(data[0].userData);
    dataManager.setSleepData(data[1].sleepData);
    dataManager.setHydrationData

  });
};

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
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

renderDOM();
