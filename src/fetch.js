

const getUserData = () => {
  return fetch('https://pacific-badlands-43237.herokuapp.com/api/v1/users')
    .then(result => result.json())
    .then(data => {
      return data
    });
};

const getSleepData = () => {
  return fetch('https://pacific-badlands-43237.herokuapp.com/api/v1/sleep')
    .then(result => result.json())
    .then(data => {
      return data
    });
};


const getActivityData = () => {
  return fetch('https://pacific-badlands-43237.herokuapp.com/api/v1/activity')
    .then(result => result.json())
    .then(data => {
      return data
    });
};


const getHydrationData = () => {
  return fetch('https://pacific-badlands-43237.herokuapp.com/api/v1/hydration')
    .then(result => result.json())
    .then(data => {
      return data
    });
};

 export {
  getUserData,
  getSleepData,
  getActivityData,
  getHydrationData
}
