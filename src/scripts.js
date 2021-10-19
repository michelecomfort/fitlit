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

// const user1 = new User(userData[0]);
console.log(userData);

const userProfile = document.querySelector('#userProfile');

console.log(userProfile.innerHTML);