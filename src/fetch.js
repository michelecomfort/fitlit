const fetchData = (location) => {
  return fetch(`http://localhost:3001/api/v1/${location}`)
    .then(result => result.json());
}

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
};

export {
  fetchData,
  postData,
};
