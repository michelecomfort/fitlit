const userData = [
  {
    "id": 1,
    "name": "Markus Rossio",
    "address": "123 Main St Wisconsin",
    "email": "markus@email.com",
    "strideLength": 5.1,
    "dailyStepGoal": 10000,
    "friends": [
      2,
      3,
      4
    ]
  },
  {
    "id": 2,
    "name": "Kyra Bergsund",
    "address": "234 Some Street Los Angeles",
    "email": "kyra@email.com",
    "strideLength": 4.5,
    "dailyStepGoal": 10000,
    "friends": [
      1,
      3,
      4,
    ]
  },
  {
    "id": 3,
    "name": "Michele Comfort",
    "address": "345 Another Street Denver",
    "email": "michele@email.com",
    "strideLength": 4.4,
    "dailyStepGoal": 10000,
    "friends": [
      1,
      2,
      4,
    ]
  },
  {
    "id": 4,
    "name": "Cass Torske",
    "address": "456 This Street Denver",
    "email": "cass@email.com",
    "strideLength": 4.8,
    "dailyStepGoal": 10000,
    "friends": [
      1,
      2,
      3,
    ]
  }
]

const hydrationData = [
  {
    "userID": 1,
    "date": "2019/06/15",
    "numOunces": 37
  },
  {
    "userID": 2,
    "date": "2019/06/15",
    "numOunces": 75
  },
  {
    "userID": 3,
    "date": "2019/06/15",
    "numOunces": 47
  },
  {
    "userID": 4,
    "date": "2019/06/15",
    "numOunces": 85
  }
]

const activityData = [{
    "userID": 1,
    "date": "2019/06/15",
    "numSteps": 3577,
    "minutesActive": 140,
    "flightsOfStairs": 16
  },
  {
    "userID": 2,
    "date": "2019/06/15",
    "numSteps": 4294,
    "minutesActive": 138,
    "flightsOfStairs": 10
  },
  {
    "userID": 3,
    "date": "2019/06/15",
    "numSteps": 7402,
    "minutesActive": 116,
    "flightsOfStairs": 33
  },
  {
    "userID": 4,
    "date": "2019/06/15",
    "numSteps": 3486,
    "minutesActive": 114,
    "flightsOfStairs": 32
  }
]

const sleepData = [
  {
    "userID": 1,
    "date": "2019/06/15",
    "hoursSlept": 6.1,
    "sleepQuality": 2.2
  },
  {
    "userID": 2,
    "date": "2019/06/15",
    "hoursSlept": 7,
    "sleepQuality": 4.7
  },
  {
    "userID": 3,
    "date": "2019/06/15",
    "hoursSlept": 10.8,
    "sleepQuality": 4.7
  },
  {
    "userID": 4,
    "date": "2019/06/15",
    "hoursSlept": 5.4,
    "sleepQuality": 3
  }
]

export {
  userData,
  hydrationData,
  sleepData,
  activityData
}
