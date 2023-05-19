// Import required modules
const config = require('./config') // Import configuration file
const store = require('./store') // Import store module for user information

// Function to create a new user object by making a POST request to the API using form data
// Returns the result of the API call
const signUp = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/sign-up`, // API endpoint for sign-up
    method: 'POST',
    data: formData // Form data to be sent
  })
}

// Function to sign in a user by making a POST request to the API using form data
// Returns the result of the API call
const signIn = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/sign-in`, // API endpoint for sign-in
    method: 'POST',
    data: formData // Form data to be sent
  })
}

// Function to sign out the user by making a DELETE request to the API
// Requires the user's authorization token in the request headers
// Returns the result of the API call
const signOut = function () {
  return $.ajax({
    url: `${config.apiUrl}/sign-out`, // API endpoint for sign-out
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.user.token // Include user's authorization token in the request headers
    }
  })
}

// Function to change the user's password by making a PATCH request to the API using form data
// Requires the user's authorization token in the request headers
// Returns the result of the API call
const changePassword = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/change-password`, // API endpoint for changing password
    method: 'PATCH',
    data: formData, // Form data to be sent
    headers: {
      Authorization: 'Bearer ' + store.user.token // Include user's authorization token in the request headers
    }
  })
}

// Function to create a new game object for the user by making a POST request to the API
// Requires the user's authorization token in the request headers
// Returns the result of the API call
const newGame = function () {
  return $.ajax({
    url: `${config.apiUrl}/games`, // API endpoint for creating a new game
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + store.user.token // Include user's authorization token in the request headers
    },
    body: {} // Empty body for the request
  })
}

// Function to update a game object by making a PATCH request to the API
// Requires the user's authorization token in the request headers
// Returns the result of the API call
const updateGame = function (currentToken, indexId, winValue, gameId) {
  if (currentToken === 'X') {
    currentToken = 'x'
  }
  return $.ajax({
    url: config.apiUrl + '/games/' + gameId, // API endpoint for updating a game
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + store.user.token // Include user's authorization token in the request headers
    },
    data: {
      game: {
        cell: {
          index: indexId, // Index of the cell to be updated
          value: currentToken // Updated cell value
        },
        over: winValue // Updated game over status
      }
    }
  })
}

// Function to retrieve the user's games by making a GET request to the API
// Requires the user's authorization token in the request headers
// Returns the result of the API call
const getGames = function () {
  return $.ajax({
    url: `${config.apiUrl}/games`,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  newGame,
  updateGame,
  getGames
}
