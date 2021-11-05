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
// const friendContainer = document.querySelector('#FriendDisplay');

const scrollHome = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const scrollSleep = () => {
  window.scrollTo({
    top: 1200,
    behavior: 'smooth'
  })
}

const scrollWater = () => {
  window.scrollTo({
    top: 500,
    behavior: 'smooth'
  })
}

const scrollSteps = () => {
  window.scrollTo({
    top: 1000,
    behavior: 'smooth'
  })
}

//EventListeners
homeButton.addEventListener('click', scrollHome);
moonButton.addEventListener('click', scrollSleep);
waterButton.addEventListener('click', scrollWater);
personButton.addEventListener('click', scrollSteps);

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
  waterStats.childNodes[3].innerHTML = `
  <h3 class="pink">${user.hydrationData.getOzDrank('2020/01/21')}</h3>
  <p>oz</p>
  `;
  generateWaterChart(user)
};

const displayStepInfo = (user, userRepo) => {
  console.log(stepStats.childNodes);
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

// const displayFriendsInfo = (user) => {
//   friendContainer.innerHTML = `<img src="./images/Friends.svg" alt='friends icon'>`;
//   user.friends.forEach(friend => {
//     friendContainer.innerHTML += `<p>${friend.name}</p>`
//   });
//   displayFriendsInfo(user);
// }

export {
  displayProfileInfo,
  displayActivityInfo,
  displayHydrationInfo,
  displayStepInfo,
  displaySleepInfo,
  // displayFriendsInfo
}
