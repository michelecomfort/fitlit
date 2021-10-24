import './css/styles.css';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import UserRepository from './UserRepository';
import Hydration from './Hydration';
import { getUserData, getSleepData, getActivityData, getHydrationData } from './fetch';
import DataManager from './DataManager';
import './images/Kyra.png';
import './images/Home.svg';
import './images/Steps.svg';
import './images/Water.svg';
import './images/Sleep.svg';
import './images/Friends.svg';

// Query Selectors
const userProfile = document.querySelector('#userProfile');
const stepGoals = document.querySelector('#stepGoals');
const waterStats = document.getElementById('waterStats');
const todaySteps = document.getElementById('todaySteps');
const sleepHours = document.querySelector('#sleepHours');
const sleepQuality = document.querySelector('#sleepQuality');
const waterCalendar = document.getElementById('myChart').getContext('2d');
const sleepCalendar = document.getElementById('sleepChart').getContext('2d');

// Global Variables
const userRepo = new UserRepository();
const dataManager = new DataManager();

// Functions
const allData = Promise.all([getUserData(), getSleepData(), getActivityData(), getHydrationData()]);

const retrieveAllData = (data) => {
  allData.then(data => {
    parseData(data);
    renderDOM();
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
  userRepo.calculateAllUserAverageSleep(sleepData)
  const randomUser = userRepo.retrieveUser(getRandomIndex(userRepo.users));
  displayAllUserInfo(randomUser);
};

const displayAllUserInfo = (user) => {
  displayProfileInfo(user);
  displayStepInfo(user);
  displayHydrationInfo(user);
  displaySleepInfo(user);
  generateCalendarChart(user);
  generateSleepChart(user)
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length + 1);
};

const generateCalendarChart = (user) => {
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
  todaySteps.innerHTML = `
  <h3>${user.activityData[user.activityData.length - 1].numSteps}</h3>
  <p>steps</p>
  `;
};

const displayHydrationInfo = (user) => {
  waterStats.childNodes[3].innerHTML = `
  <h3>${user.hydrationData.getOzDrank('2020/01/21')}</h3>
  <p>oz</p>
  `;
};

const displaySleepInfo = (user) => {
  sleepHours.childNodes[1].innerHTML = `
  <h3>${user.sleepData.getHoursSlept('2020/01/22')}</h3>
  <p>today</p>
  `;
  sleepHours.childNodes[3].innerHTML = `
  <h4 class="orange">${user.sleepData.getAverageHoursSlept()}</h4>
  <p>avg</p>
  `;
  sleepQuality.childNodes[1].innerHTML = `
  <h3>${user.sleepData.getQualityOfSleep('2020/01/22')}</h3>
  <p>today</p>
  `;
  sleepQuality.childNodes[3].innerHTML = `
  <h4 class="orange">${user.sleepData.getAverageSleepQuality()}</h4>
  <p>avg</p>
  `;
};

retrieveAllData();
