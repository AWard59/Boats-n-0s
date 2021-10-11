// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./events')
const ui = require('./ui')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#new-game-button').on('click', authEvents.onNewGame)
  $('.game-grid').on('click', authEvents.onGridSelection)
  $('.modal-play-again').on('click', authEvents.onPlayAgain)
  $('.modal-exit').on('click', ui.onExitGame)
})
