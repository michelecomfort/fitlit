import { generateStairsChart, generateMinutesActiveChart, generateWaterChart, generateSleepChart, generateStepsChart } from './charts';
import { postData } from './fetch';

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
const addActivityButton = document.querySelector('#plusButton');
const userCard = document.querySelector('.user-info-card');
const sleepCard = document.querySelector('.sleep');
const waterCard = document.querySelector('.water');
const stepsCard = document.querySelector('.steps')
const addActivityCard = document.querySelector('.forms');

//Form Query Selectors
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
};

const toggleConfirmationText = (result) => {
  result.hidden = !result.hidden;
};

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
};

const changeFormView = () => {
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
};

const handleSleepForm = (event, userRepo) => {
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
};

const handleHydrationForm = (event, userRepo) => {
  event.preventDefault();
  const userInputHydrationData = {
    userID: userRepo.activeUser.id,
    date: formatDate(userInputHydrationDate.value),
    numOunces: userInputHydrationOunces.value
  }
  hydrationForm.reset();
  postData('hydration', userInputHydrationData)
    .then(checkFetchResult);
};

const handleActivityForm = (event, userRepo) => {
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
};

const formListen = (userRepo) => {
  sleepForm.addEventListener('submit', (event) => {
    handleSleepForm(event, userRepo);
  });
  activityForm.addEventListener('submit', (event) => {
    handleActivityForm(event, userRepo);
  });
  hydrationForm.addEventListener('submit', (event) => {
    handleHydrationForm(event, userRepo);
  });
  activityTypeForm.addEventListener('change', changeFormView);
};

homeButton.onclick = function() {
  userCard.scrollIntoView({behavior: 'smooth'});
};

moonButton.onclick = function() {
  sleepCard.scrollIntoView({behavior: 'smooth'});
};

waterButton.onclick = function() {
  waterCard.scrollIntoView({behavior: 'smooth'});
};

personButton.onclick = function() {
  stepsCard.scrollIntoView({behavior: 'smooth'})
};

addActivityButton.onclick = function() {
  addActivityCard.scrollIntoView({behavior: 'smooth'});
};

const displayProfileInfo = (user) => {
  userProfile.childNodes[1].innerHTML = `
  <h2 class="pink">Hi, ${user.returnFirstName()}!</h2>
  <p>${user.address}</p>
  <p class="email">${user.email}</p>
  `;
};

const displayActivityInfo = (user, userRepo, dataManager) => {
  minutesActiveStats.childNodes[1].innerHTML += `
  <h3 class="pink">${user.activityData.todayActivity('2020/01/22', 'minutes')}</h3>
  <p class="unit">minutes</p>
  `
  minutesActiveStats.childNodes[3].innerHTML += `
  <h4 class="orange">${userRepo.calculateAllUserAverage('2020/01/22', dataManager.activityData, 'minutes')}</h4>
  <p class="unit">minutes</p>
  `
  stairStats.childNodes[1].innerHTML += `
  <h3 class="pink">${user.activityData.todayActivity('2020/01/22', 'stairs')}</h3>
  <p class="unit">flights of stairs</p>
  `
  stairStats.childNodes[3].innerHTML += `
  <h4 class="orange">${userRepo.calculateAllUserAverage('2020/01/22', dataManager.activityData, 'stairs')}</h4>
  <p class="unit">flights of stairs</p>
  `
  generateMinutesActiveChart(user);
  generateStairsChart(user);
}

const displayHydrationInfo = (user) => {
  waterStats.childNodes[3].innerHTML = `
  <h3 class="pink">${user.hydrationObj.getOzDrank('2020/01/22')}</h3>
  <p>oz</p>
  `;
  generateWaterChart(user);
};

const displayStepInfo = (user, userRepo) => {
  stepStats.childNodes[1].innerHTML = `
  <h3 class="pink">${user.activityData.todayActivity('2020/01/22', 'steps')}</h3>
  <p>steps</p>
  `;
  stepStats.childNodes[3].innerHTML = `
  <h3 class="pink">${user.activityData.milesWalked('2020/01/22')}</h3>
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
  generateStepsChart(user);
};

const displaySleepInfo = (user) => {
  sleepHours.childNodes[1].innerHTML = `
  <h3 class="pink">${user.sleepObj.getHoursSlept('2020/01/22')}</h3>
  <p>today</p>
  `;
  sleepHours.childNodes[3].innerHTML = `
  <h4 class="orange ">${user.sleepObj.getAverageHoursSlept()}</h4>
  <p>avg</p>
  `;
  sleepQuality.childNodes[1].innerHTML = `
  <h3 class="pink">${user.sleepObj.getQualityOfSleep('2020/01/22')}</h3>
  <p>today</p>
  `;
  sleepQuality.childNodes[3].innerHTML = `
  <h4 class="orange">${user.sleepObj.getAverageSleepQuality()}</h4>
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
  formListen,
}
