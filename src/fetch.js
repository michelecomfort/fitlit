const getUserData = () => {
  return fetch('http://localhost:3001/api/v1/users')
    .then(result => result.json());
};

const getSleepData = () => {
  return fetch('http://localhost:3001/api/v1/sleep')
    .then(result => result.json());
};

const getActivityData = () => {
  return fetch('http://localhost:3001/api/v1/activity')
    .then(result => result.json());
};

const getHydrationData = () => {
  return fetch('http://localhost:3001/api/v1/hydration')
    .then(result => result.json());
};

export {
  getUserData,
  getSleepData,
  getActivityData,
  getHydrationData,
};
