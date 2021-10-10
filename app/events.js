'use strict'

// pull the pre-written getFormFields function
const getFormFields = require('../lib/get-form-fields')

// pull api to make our api requests
// pull ui to make our ui changes depending on outcome
const api = require('./api')
const ui = require('./ui')

// hard code starting player token as X, as X always starts first
let playerToken = 'X'
let gameState = false

// prevent refresh on submit form, retrieve data from form fields, make request to the api with formfield data, then update ui depending on outcome
const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signUp(formData)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.signIn(formData)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignOut = function () {
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onNewGame = function () {
  api.newGame()
    .then(ui.newGameStart)
    .then(gameState = true)
    .then(ui.currentPlayer(playerToken))
    .catch(ui.signOutFailure)
}

// Check if the clicked grid section has already been occupied/played (data result can either be 'x', '0' or '' empty string. empty string is available to play)
// If not occupied, apply the current token, x or 0, to the data to lock it
// switch the token for the next player, X>0, or 0>X
const gridSelection = function (event) {
  // gameState is default false, until we click New Game button for function onNewGame above
  // until the button is clicked, the grid has no functionality
  if (gameState) {
    const target = event.target
    console.log('clicked ' + target.id)
    console.log(target.dataset.occupied)
    if (target.dataset.occupied === '') {
      target.dataset.occupied = playerToken
      console.log(target.dataset.occupied)
      if (playerToken === 'X') {
        playerToken = '0'
      } else {
        playerToken = 'X'
      }
      ui.gridSelection(playerToken)
      ui.currentPlayer(playerToken)
    }
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onNewGame,
  gridSelection
}
