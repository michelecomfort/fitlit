// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

// import userData from './data/users';
import userData from './sampleData';
import UserRepository from './UserRepository';
import User from './User';

// targets array of user objects from the userData import
const data = Object.values(userData)[0];

// instantiates empty user repo
const userRepo = new UserRepository();
// calls method using data from import to create all instances of User
userRepo.buildUserRepo(data);

// for testing (change index number to cycle through users)
const user1 = userRepo.users[0];

// Query Selector
const userProfile = document.querySelector('#userProfile');
const greeting = document.querySelector('h1');

const greetUser = () => {
  greeting.innerText = `Welcome, ${user1.returnFirstName()}!`;
}

// fills user profile section with info
const displayProfileInfo = () => {
  userProfile.innerHTML = `
  <p>Name: ${user1.name}</p>
  <p>Address: ${user1.address}</p>
  <p>Email: ${user1.email}</p>
  <p>Member Since: Oct</p>
`
}

greetUser();
displayProfileInfo();