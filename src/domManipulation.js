import { generateStairsChart, generateMinutesActiveChart, generateWaterChart, generateSleepChart, generateStepsChart } from './charts';

const userProfile = document.querySelector('#userProfile');
const stepStats = document.querySelector('#stepStats');
const stepGoals = document.querySelector('#stepGoals');
const waterStats = document.querySelector('#waterStats');
const sleepHours = document.querySelector('#sleepHours');
const sleepQuality = document.querySelector('#sleepQuality');
const minutesActiveStats = document.querySelector('#activityStats');
const stairStats = document.querySelector('#stairStats');
const homeButton = document.querySelector('#homeButton');
const personButton = document.querySelector('#personButton');
const waterButton = document.querySelector('#waterButton');
const moonButton = document.querySelector('#moonButton');
const addActivityButton = document.querySelector('#plusButton')
const userCard = document.querySelector('.user-info-card');
const sleepCard = document.querySelector('.sleep');
const waterCard = document.querySelector('.water');
const stepsCard = document.querySelector('.steps')
const addActivityCard = document.querySelector('.forms')
const cardFlip = document.querySelector('.flip-card-inner');
const submitButton = document.querySelector('.submit-button')

submitButton.addEventListener( 'click', function() {
  cardFlip.classList.toggle('is-flipped');
});

homeButton.onclick = function(event) {
  userCard.scrollIntoView({behavior: 'smooth'})
}
moonButton.onclick = function(event) {
  sleepCard.scrollIntoView({behavior: 'smooth'})
}

waterButton.onclick = function(event) {
  waterCard.scrollIntoView({behavior: 'smooth'})
}

personButton.onclick = function(event) {
  stepsCard.scrollIntoView({behavior: 'smooth'})
}

addActivityButton.onclick = function(event) {
  addActivityCard.scrollIntoView({behavior: 'smooth'})
}

const displayProfileInfo = (user) => {
  userProfile.childNodes[3].innerHTML = `
  <h2 class="pink">Hi, ${user.returnFirstName()}!</h2>
  <p>${user.address}</p>
  <p class="email">${user.email}</p>
  `;
};

const displayActivityInfo = (user, userRepo, dataManager) => {
  minutesActiveStats.childNodes[1].innerHTML += `
  <h3 class="pink">${user.activityData.activeMinutes('2020/01/21')}</h3>
  <p class="unit">minutes</p>
  `
  minutesActiveStats.childNodes[3].innerHTML += `
  <h4 class="orange">${userRepo.calculateAllUserAverage('2020/01/21', dataManager.activityData, 'minutes')}</h4>
  <p class="unit">minutes</p>
  `
  stairStats.childNodes[1].innerHTML += `
  <h3 class="pink">${user.activityData.activityData[user.activityData.activityData.length - 1].flightsOfStairs}</h3>
  <p class="unit">flights of stairs</p>
  `
  stairStats.childNodes[3].innerHTML += `
  <h4 class="orange">${userRepo.calculateAllUserAverage('2020/01/21', dataManager.activityData, 'stairs')}</h4>
  <p class="unit">flights of stairs</p>
  `
  generateMinutesActiveChart(user);
  generateStairsChart(user);
}

const displayHydrationInfo = (user) => {
  // console.log(user.dataManager)
  waterStats.childNodes[3].innerHTML = `
  <h3 class="pink">${user.hydrationDataObj.getOzDrank('2020/01/22')}</h3>
  <p>oz</p>
  `;
  generateWaterChart(user)
};

const displayStepInfo = (user, userRepo) => {
  stepStats.childNodes[1].innerHTML = `
  <h3 class="pink">${user.activityData.activityData[user.activityData.activityData.length - 1].numSteps}</h3>
  <p>steps</p>
  `;
  stepStats.childNodes[3].innerHTML = `
  <h3 class="pink">${user.activityData.milesWalked('2020/01/21')}</h3>
  <p>miles</p>
  `;
  stepGoals.childNodes[1].innerHTML += `
  <h4 class="pink">${user.dailyStepGoal}</h4>
  <p class="unit">/day</p>
  `;
  stepGoals.childNodes[3].innerHTML += `
  <h4 class="orange">${userRepo.calculateAverageStepGoal()}</h4>
  <p class="unit">/day</p>
  `;
  generateStepsChart(user)
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

export {
  displayProfileInfo,
  displayActivityInfo,
  displayHydrationInfo,
  displayStepInfo,
  displaySleepInfo,
}
