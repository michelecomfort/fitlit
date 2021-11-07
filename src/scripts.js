import './css/styles.scss';
import './images/Kyra.png';
import './images/Home.svg';
import './images/Steps.svg';
import './images/Water.svg';
import './images/Sleep.svg';
import './images/Friends.svg';
import './images/activity.svg'
import './images/Plus.svg';
import {displayProfileInfo, displayStepInfo, displayHydrationInfo, displaySleepInfo, displayActivityInfo, displayFriendsInfo, scroll } from './domManipulation';
import { fetchData, postData } from './fetch';
import DataManager from './DataManager';
import UserRepository from './UserRepository';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Query Selectors

const userProfile = document.querySelector('#userProfile');
// const scrollSleep = document.getElementById('scrollSleep')

// Form Selectors
const activityTypeForm = document.querySelector('#activity-type-form');
const activityOptions = document.querySelector('#activity-type');
const sleepForm = document.querySelector('#sleep-form');
const hydrationForm = document.querySelector('#hydration-form');
const activityForm = document.querySelector('#activity-form');
const userInputHoursSlept = document.querySelector('#hours-slept');
const userInputSleepDate = document.querySelector('#sleep-date');
const userInputSleepQuality = document.querySelector('#sleep-quality');
const userInputHydrationDate = document.querySelector('#hydration-date');
const userInputHydrationOunces = document.querySelector('#num-ounces');
const userInputActivityDate = document.querySelector('#activity-date');
const userInputActivityStairs = document.querySelector('#flight-of-stairs');
const userInputActivityMinutesActive = document.querySelector('#minutes-active');
const userInputActivitySteps = document.querySelector('#number-of-steps');
const confirmationText = document.querySelector('#confirmation-text');
const errorText = document.querySelector('#error-text');

const formatDate = (date) => {
  const formattedDate = date.replaceAll('-', '/');
  return formattedDate;
}

const toggleConfirmationText = (result) => {
  result.hidden = !result.hidden;
}

const checkFetchResult = (result) => {
  if (result === 'SUCCESS') {
    toggleConfirmationText(confirmationText);
    setTimeout(() => {
      toggleConfirmationText(confirmationText);
    }, 4000);
  } else {
    toggleConfirmationText(errorText);
    setTimeout(() => {
      toggleConfirmationText(errorText);
    }, 4000);
  }
}

activityTypeForm.addEventListener('change', () => {
  switch (activityOptions.value) {
    case 'sleep':
      hydrationForm.hidden = true;
      activityForm.hidden = true;
      sleepForm.hidden = false;
      break;

      case 'hydration':
        sleepForm.hidden = true;
        activityForm.hidden = true;
        hydrationForm.hidden = false;
        break;

      case 'activity':
        sleepForm.hidden = true;
        hydrationForm.hidden = true;
        activityForm.hidden = false;
      break;

    default:
      console.log('something went wrong');
      break;
  }
});

sleepForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userInputSleepData = {
    userID: userRepo.activeUser.id,
    date: formatDate(userInputSleepDate.value),
    hoursSlept: userInputHoursSlept.value,
    sleepQuality: userInputSleepQuality.value
  }
  sleepForm.reset();
  postData('sleep', userInputSleepData)
    .then(checkFetchResult);
});

hydrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userInputHydrationData = {
    userID: userRepo.activeUser.id,
    date: formatDate(userInputHydrationDate.value),
    numOunces: userInputHydrationOunces.value
  }
  hydrationForm.reset();
  postData('hydration', userInputHydrationData)
    .then(checkFetchResult);
});

activityForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userInputActivityData = {
    userID: userRepo.activeUser.id,
    date: formatDate(userInputActivityDate.value),
    flightsOfStairs: userInputActivityStairs.value,
    minutesActive: userInputActivityMinutesActive.value,
    numSteps: userInputActivitySteps.value,
  }
  activityForm.reset();
  postData('activity', userInputActivityData)
    .then(checkFetchResult);
});


// Event Listeners
// scrollSleep.addEventListener('click', scrollToSleep)

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
  displayActivityInfo(user, userRepo, dataManager)
  displayStepInfo(user, userRepo);
  displayHydrationInfo(user);
  displaySleepInfo(user);
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length + 1);
};

retrieveAllData();
