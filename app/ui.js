'use strict'

const store = require('./store')

// Function to restore game messages section
const gameMessagesRestore = function () {
  $('#game-messages').show()
  $('#game-messages').removeClass()
}

// Function to display a text response for successful sign up
// with a suggestion to sign in and a success message
const signUpSuccess = function () {
  $('#sign-up-success').html('<p>Signed up successfully!</p> <br> <p>Sign In to continue</p>')
  $('#sign-up-success').removeClass()
  $('#sign-up-success').addClass('text-success')
  $('#sign-up-success').fadeOut(5000)

  $('form').trigger('reset')
}

// Function to display a text response for sign up failure
const signUpFailure = function () {
  $('#sign-up-failure').text('Sign up failed')
  $('#sign-up-failure').removeClass()
  $('#sign-up-failure').addClass('text-danger')
  $('#sign-up-failure').fadeOut(5000)
}

// Function to handle successful sign in
const signInSuccess = function (responseData) {
  store.user = responseData.user

  $('#sign-in-success').text('Signed in successfully!')
  $('#sign-in-success').removeClass()
  $('#sign-in-success').addClass('text-success')
  $('#sign-in-success').fadeOut(3000)

  $('form').trigger('reset')
  $('#sign-in-page').hide()
  $('.game-page').show()
  $('#new-game-nav').hide()

  $('#game-messages').text('Signed in successfully!')
  $('#game-messages').addClass('text-success')
  $('#game-messages').fadeOut(2000)

  $('.choose-opponent').show()
  $('#choose-opponent-nav').hide()

  resetGameBoard()
}

// Function to handle sign in failure
const signInFailure = function () {
  $('#sign-in-failure').text('Sign in failed')
  $('#sign-in-failure').removeClass()
  $('#sign-in-failure').addClass('text-danger')
  $('#sign-in-failure').fadeOut(5000)
}

// Function to handle successful sign out
const signOutSuccess = function () {
  $('.game-page').hide()
  $('#change-password-page').hide()
  $('#sign-in-page').show()
  $('#sign-out-message').show()
  $('#sign-out-message').html('<p class=text-success>Signed Out Successfully</p>')
  $('sign-out-message').fadeOut(5000)
  resetGameBoard()
}

// Function to handle sign out failure
const signOutFailure = function () {
  $('#sign-out-message').text('Sign out failed')
  $('#sign-out-message').removeClass()
  $('#sign-out-message').addClass('text-danger')
  $('#sign-out-message').fadeOut(5000)
}

// Function to handle change password button click
const onChangePassBtnClick = function () {
  $('.game-page').hide()
  $('#change-password-page').show()
  $('#sign-out').show()
  $('#new-game-nav').show()
}

// Function to handle successful password change
const changePasswordSuccess = function () {
  $('#change-password-success').text('Password Changed Successfully!')
  $('#change-password-success').removeClass()
  $('#change-password-success').addClass('text-success')
  $('#change-password-success').fadeOut(5000)

  $('form').trigger('reset')
}

// Function to handle password change failure
const changePasswordFailure = function () {
  $('#change-password-failure').text('Password Change Failed')
  $('#change-password-failure').removeClass()
  $('#change-password-failure').addClass('text-danger')
  $('#change-password-failure').fadeOut(5000)
}

// Function to handle opponent selection
const opponentSelected = function (opponentDisplay) {
  $('.choose-opponent').hide()
  $('.play-again').hide()
  $('#new-game-button').show()
  resetGameBoard()
  $('#opponent-display').text(`Opponent: ${opponentDisplay}`)
}

// Function to show opponent options
const showOpponentOptions = function () {
  $('.choose-opponent').show()
}

// Function to start a new game
const newGameStart = function () {
  resetGameBoard()
  $('.play-again').hide()
  $('#new-game-button').hide()
  $('.box').css('opacity', '1')
  $('#current-player').css('visibility', 'visible')
  $('#opponent-display').css('visibility', 'visible')
  gameMessagesRestore()
  $('#game-messages').html("<h3>Go get you some boats & 0's!</h3>")
  $('#game-messages').addClass('text-success')
  $('#game-messages').fadeOut(5000)
}

// Function to track game history and display total games played
const gameHistoryTracker = function (gameData) {
  const gamesPlayed = gameData.games.length
  $('#game-stats').text('Total Games Played: ' + gamesPlayed)
}

// Function to handle grid selection (placing X or 0)
const gridSelection = function (token, id) {
  if (token === 'X') {
    $(event.target).addClass('bg-primary')
    $(event.target).html('<img src="boat.png" class="shadow-none">')
    $('#current-player').text("Current Player: 0's")
  } else {
    $(`#${id}`).css('background-color', '#Fcf3b5')
    $(`#${id}`).html('<img src="0.png" class="shadow-none">')
    $('#current-player').text('Current Player: Boats')
  }
}

// Function to handle already occupied spot selection
const spotOccupied = function () {
  gameMessagesRestore()
  $('#game-messages').html('<h3>That spot is already taken. Choose another.</h3>')
  $('#game-messages').addClass('text-danger')
  $('#game-messages').fadeOut(2000)
}

// Function to handle game not in play scenario
const gameNotInPlay = function () {
  gameMessagesRestore()
  $('#game-messages').html('<h3>The game is not in play. Start a new game first</h3>')
  $('#game-messages').addClass('text-danger')
  $('#game-messages').fadeOut(2500)
}

// Function to handle game over scenario with a winner
const gameOver = function (token) {
  $('.box').removeClass('box-hover')
  $('.play-again').show()
  $('#choose-opponent-modal').show()
  if (token === 'X') {
    $('.modal-outcome').text('Boats won the game!')
  } else {
    $('.modal-outcome').text(`${token}'s won the game!`)
  }
}

// Function to handle game end in a tie
const gameEndTie = function () {
  $('.box').removeClass('box-hover')
  $('.play-again').show()
  $('#choose-opponent-modal').show()
  $('.modal-outcome').text('It was a tie!')
}

// Function to handle exit game action
const onExitGame = function () {
  $('.play-again').hide()
  $('#new-game-nav').show()
  $('#choose-opponent-nav').show()
  $('#currentPlayer').text($('.modal-outcome').text())
}

// Function to reset the game board
const resetGameBoard = function () {
  $('.box').text('')
  $('.box').css('background-color', '#ADE8F4')
  $('.box').removeClass('bg-primary')
  $('#current-player').text('Current Player: X')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  onChangePassBtnClick,
  changePasswordSuccess,
  changePasswordFailure,
  opponentSelected,
  showOpponentOptions,
  newGameStart,
  gridSelection,
  spotOccupied,
  gameNotInPlay,
  gameOver,
  gameEndTie,
  onExitGame,
  resetGameBoard,
  gameHistoryTracker
}
