import { generateFlightsChart, generateActivityChart, generateWaterChart, generateSleepChart } from './charts';

const todaySteps = document.querySelector('#stepsToday');
const stepGoals = document.querySelector('#stepGoals');
const waterStats = document.querySelector('#waterStats');
const sleepHours = document.querySelector('#sleepHours');
const sleepQuality = document.querySelector('#sleepQuality');
const userProfile = document.querySelector('#userProfile');
const friendContainer = document.querySelector('#FriendDisplay');

const displayProfileInfo = (user) => {
  userProfile.childNodes[3].innerHTML = `
  <h2 class="pink">Hi, ${user.returnFirstName()}!</h2>
  <p>${user.address}</p>
  <p class="email">${user.email}</p>
  `;
  generateActivityChart(user)
  generateFlightsChart(user)
};

// const displayActivityInfo = (user) => {
//   activityGoals.childNodes[].innerHTML += `
//   <h4 class='pink'>85</h4>
//   <p class='unit'>/minutes</p>`
    // generateActivityChart(user)
    // generateFlightsChart(user)
// }

const displayStepInfo = (user, userRepo) => {
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
  generateWaterChart(user)
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
  displayFriendsInfo(user);
}

export {
  displayProfileInfo,
  displayStepInfo,
  displayHydrationInfo,
  displaySleepInfo,
  displayFriendsInfo
}
