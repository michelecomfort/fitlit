import './css/styles.css';
import userData from './data/users';
import UserRepository from './UserRepository';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


// Query Selectors
const userProfile = document.querySelector('#userProfile');
const greeting = document.querySelector('h1');

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
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
}

const greetUser = (user) => {
  greeting.innerText = `Welcome, ${user.returnFirstName()}!`;
}

// fills user profile section with info
const displayProfileInfo = (user) => {
  userProfile.innerHTML = `
  <p>Name: ${user.name}</p>
  <p>Address: ${user.address}</p>
  <p>Email: ${user.email}</p>
  <p>Member Since: Oct 2021</p>
`
}

renderDOM();