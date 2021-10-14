const config = require('./config')
const store = require('./store')

// using formData from events.js, make POST request to api to create a new user object
// return result
const signUp = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/sign-up`,
    method: 'POST',
    data: formData
  })
}

const signIn = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/sign-in`,
    method: 'POST',
    data: formData
  })
}

// Token needs to be the same as the token created when logging in
// delete that token - requiring user to sign in again for access
const signOut = function () {
  return $.ajax({
    url: `${config.apiUrl}/sign-out`,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const changePassword = function (formData) {
  return $.ajax({
    url: `${config.apiUrl}/change-password`,
    method: 'PATCH',
    data: formData,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

// Again checking token vs created token on login, create an empty game object applied to this user
const newGame = function (data) {
  return $.ajax({
    url: `${config.apiUrl}/games`,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    body: {}
  })
}

const updateGame = function (currentToken, indexId, winValue, gameId) {
  if (currentToken === 'X') {
    currentToken = 'x'
  }
  console.log(currentToken, indexId, winValue, gameId, 'api')
  return $.ajax({
    url: config.apiUrl + '/games/' + gameId,
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data: {
      game: {
        cell: {
          index: indexId,
          value: currentToken
        },
        over: winValue
      }
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  newGame,
  updateGame
}
