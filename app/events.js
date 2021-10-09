'use strict'

const getFormFields = require('../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui')

let playerToken = 'x'

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
    .catch(ui.signOutFailure)
}

const gridSelection = function (event) {
  const target = event.target
  console.log('clicked ' + target.id)
  console.log(target.dataset.occupied)
  if (target.dataset.occupied === '') {
    target.dataset.occupied = playerToken
    console.log(target.dataset.occupied)
    if (playerToken === 'x') {
      playerToken = '0'
    } else {
      playerToken = 'x'
    }
    ui.gridSelection(playerToken)
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onNewGame,
  gridSelection
}
