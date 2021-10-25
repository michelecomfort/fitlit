# FitLit 

Turing School of Software & Design

2108 FEE, Mod 2 - Group Project, Part One

## Abstract
Similar to Fitbit, Fitlit is a web app that presents user's with a number of helpful health metrics- daily step count, daily water consumption, daily sleep hours and quality -on a single dashboard with widgets. Line graphs display hydration and sleep each day for the last week.

## Languages/Technology
Javascript, HTML, CSS, Webpack, Chart.js, Github

## Learning Goals
* Begin working with network requests and Fetch API
* Process and manipulate large data sets with iterator methods
* Design and build out a user-friendly dashboard from scratch
* Use ES6 classes to write modular, reusable code


The details of this project are outline in [this project spec](http://frontend.turing.io/projects/fitlit.html).

## Install & Setup
1. Clone down this repo
2. `cd` into the directory
3. Run `npm install`
4. Run `npm start` to open the local server
5. Head to `localhost:8080` in your browser

## Web App Attributes

There is no boilerplate for testing in this starter-kit repo. You will need to set this up yourself. However, if you ran `npm install`, then the tooling you need to start testing is already installed (`mocha` and `chai`).

## Contributors
[Michele Comfort](https://github.com/michelecomfort)
[Kyra Bergsund](https://github.com/kbergsund)
[Markus Rossio](https://github.com/Markus-Xavier)

Run the command in your terminal `npm run lint` to run the linter on your JavaScript code. There will be errors and warnings right from the start in this starter kit, but that's ok - the linter is still running successfully.

Your linter will look only at the JavaScript files you have within the `src` and the `test` directories.

## Data Model

**Users**

```
[
  {
    "id": [number],
    "name": [string],
    "address": [string],
    "email": [string],
    "strideLength": [number - feet],
    "dailyStepGoal": [number - steps],
    "friends": [array - one-way connection to other user(s)]
  },
  ...more user data
]
```

**Activity**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "numSteps": [number - steps],
    "minutesActive": [number - minutes],
    "flightsOfStairs": [number - flights]
  },
  ...more activity data
]
```

**Hydration**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "numOunces": [number - ounces]
  },
  ...more hydration data
]
```

**Sleep**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "hoursSlept": [number - hours],
    "sleepQuality": [number - unitless]
  },
  ...more sleep data
]
```
