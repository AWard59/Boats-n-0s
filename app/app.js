// Import required modules
const authEvents = require('./events') // Import module for authentication events
const ui = require('./ui') // Import UI module

// jQuery ready function
$(() => {
  // Event listeners for sign-up, sign-in, sign-out, new game, grid selection, play again, exit game, cell hover, change password, opponent selection, and opponent options
  $('#sign-up').on('submit', authEvents.onSignUp) // Sign-up form submit event
  $('#sign-in').on('submit', authEvents.onSignIn) // Sign-in form submit event
  $('#sign-out').on('click', authEvents.onSignOut) // Sign-out button click event
  $('.new-game').on('click', authEvents.onNewGame) // New game button click event
  $('.game-grid').on('click', authEvents.onGridSelection) // Game grid cell click event
  $('.modal-play-again').on('click', authEvents.onPlayAgain) // Play again button click event in modal
  $('.modal-exit').on('click', ui.onExitGame) // Exit game button click event in modal
  $('.box').on('mouseover', authEvents.onCellHover) // Cell mouseover event
  $('.box').on('mouseout', authEvents.offCellHover) // Cell mouseout event
  $('#change-password-button').on('click', ui.onChangePassBtnClick) // Change password button click event
  $('#change-password').on('submit', authEvents.onChangePassword) // Change password form submit event
  $('.choose-opponent').on('click', authEvents.onOpponentSelect) // Opponent selection button click event
  $('.choose-opponent-button').on('click', ui.showOpponentOptions) // Show opponent options button click event
})
