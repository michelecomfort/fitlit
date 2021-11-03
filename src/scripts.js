import './css/styles.css';
import './images/Kyra.png';
import './images/Home.svg';
import './images/Steps.svg';
import './images/Water.svg';
import './images/Sleep.svg';
import './images/Friends.svg';
import { getUserData, getSleepData, getActivityData, getHydrationData } from './fetch';
import DataManager from './DataManager';
import UserRepository from './UserRepository';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Query Selectors
const userProfile = document.querySelector('#userProfile');
const todaySteps = document.querySelector('#stepsToday');
const stepGoals = document.querySelector('#stepGoals');
const waterStats = document.querySelector('#waterStats');
const waterCalendar = document.querySelector('#waterCanvas').getContext('2d');
const sleepHours = document.querySelector('#sleepHours');
const sleepQuality = document.querySelector('#sleepQuality');
const sleepCalendar = document.querySelector('#sleepCanvas').getContext('2d');
const friendContainer = document.querySelector('#FriendDisplay');

// Global Variables
const userRepo = new UserRepository();
const dataManager = new DataManager();

// Functions
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
  userRepo.buildUserRepo(dataManager, dataManager.userData);
  console.log(userRepo.users)
  const randomUser = userRepo.retrieveUser(getRandomIndex(userRepo.users));
  displayAllUserInfo(randomUser);
};

const displayAllUserInfo = (user) => {
  displayProfileInfo(user);
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

const generateWaterChart = (user) => {
  const waterChart = new Chart(waterCalendar, {
    type: 'line',
    data: {
      labels: ['M', 'T', 'W', 'Th', 'Fr', 'Sa', 'Su'],
      datasets: [{
        label: 'oz of water',
        data: user.hydrationData.getWeeklyDrank('2020/01/15'),
        backgroundColor: '#FC6F7F',
        borderColor: '#FC6F7F',
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: '#ffffff'
          },
        }
      },
      scales: {
        y: {
          ticks: {
            color: ['#ffffff'],
          },
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
          }
        },
        x: {
          ticks: {
            color: ['#ffffff']
          },
          grid: {
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
          },
        },
      }
    },
  })
};

const generateSleepChart = (user) => {
  const sleepChart = new Chart(sleepCalendar, {
    type: 'line',
    data: {
      labels: ['M', 'T', 'W', 'Th', 'Fr', 'Sa', 'Su'],
      datasets: [
        {
          label: 'hours',
          data: user.sleepData.getWeeklyHoursSlept('2020/01/15'),
          backgroundColor: '#FC6F7F',
          borderColor: '#FC6F7F',
          borderWidth: 2
        },
        {
          label: 'quality',
          data: user.sleepData.getWeeklySleepQuality('2020/01/15'),
          backgroundColor: '#FF9E2D',
          borderColor: '#FF9E2D',
          borderWidth: 2
        }]
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: '#ffffff',
            padding: 15,
          },
        }
      },
      scales: {
        y: {
          ticks: {
            color: ['#ffffff'],
            stepSize: 6,
          },
          beginAtZero: true,
          min: 0,
          max: 12,
          grid: {
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
          }
        },
        x: {
          ticks: {
            color: ['#ffffff'],
          },
          grid: {
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
          },
        },
      }
    },
  })
};

retrieveAllData();
