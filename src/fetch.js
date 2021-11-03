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

const postData = (location, data) => {
  fetch(`http://localhost:3001/api/v1/${location}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

export {
  getUserData,
  getSleepData,
  getActivityData,
  getHydrationData,
  postData,
};
