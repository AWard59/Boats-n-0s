'use strict'

const store = require('./store')

const gameMessagesRestore = function () {
  $('#game-messages').show()
  $('#game-messages').removeClass()
}

// Create a text response (in html) for successful outcome suggesting sign in to continue
// add class of text success (green text) and have it fade away after 5 seconds
// then reset all form data
const signUpSuccess = function () {
  $('#sign-up-success').html('<p>Signed up successfully!</p> <br> <p>Sign In to continue</p>')
  $('#sign-up-success').removeClass()
  $('#sign-up-success').addClass('text-success')
  $('#sign-up-success').fadeOut(5000)

  $('form').trigger('reset')
}

// text response stating failure, addclass text danger (red)
const signUpFailure = function () {
  $('#sign-up-failure').text('Sign up failed')
  $('#sign-up-failure').removeClass()
  $('#sign-up-failure').addClass('text-danger')
  $('#sign-up-failure').fadeOut(5000)
}

// hide the sign-in-page section from user's view. show the game-page section
// prevents a refresh of webpage
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

const signInFailure = function () {
  $('#sign-in-failure').text('Sign in failed')
  $('#sign-in-failure').removeClass()
  $('#sign-in-failure').addClass('text-danger')
  $('#sign-in-failure').fadeOut(5000)
}

// hide game-page and show sign-in-page
const signOutSuccess = function () {
  resetGameBoard()
  $('.game-page').hide()
  $('#change-password-page').hide()
  $('#sign-in-page').show()
}

const signOutFailure = function () {
  $('#sign-out-failure').text('Sign out failed')
  $('#sign-out-failure').removeClass()
  $('#sign-out-failure').addClass('text-danger')
  $('#sign-out-failure').fadeOut(5000)
}

const onChangePassBtnClick = function () {
  $('.game-page').hide()
  $('#change-password-page').show()
  $('#sign-out').show()
  $('#new-game-nav').show()
}

const changePasswordSuccess = function () {
  $('#change-password-success').text('Password Changed Successfully!')
  $('#change-password-success').removeClass()
  $('#change-password-success').addClass('text-success')
  $('#change-password-success').fadeOut(5000)

  $('form').trigger('reset')
}

const changePasswordFailure = function () {
  $('#change-password-failure').text('Password Change Failed')
  $('#change-password-failure').removeClass()
  $('#change-password-failure').addClass('text-danger')
  $('#change-password-failure').fadeOut(5000)
}

const opponentSelected = function () {
  $('.choose-opponent').hide()
}
// Hide the button covering the game board
// change css value of box's opacity to 1 (was 0.3)
const newGameStart = function () {
  resetGameBoard()
  $('.play-again').hide()
  $('#new-game-button').hide()
  $('.box').css('opacity', '1')
  $('#current-player').css('visibility', 'visible')
  gameMessagesRestore()
  $('#game-messages').html('<h3>New Game Started!</h3>')
  $('#game-messages').addClass('text-success')
  $('#game-messages').fadeOut(5000)
}

// length of games from the array gives a total of all games played
// display the total on UI
const gameHistoryTracker = function (gameData) {
  const gamesPlayed = gameData.games.length
  $('#game-stats').text('Total Games Played: ' + gamesPlayed)
}

// add bootstrap primary/secondary bg color, and X/0 text
// also changing the player counter at the top, between X and 0 depending on which player's turn
const gridSelection = function (token, id) {
  if (token === 'X') {
    $(event.target).addClass('bg-primary')
    $(event.target).text('X')
    $('#current-player').text('Current Player: 0')
  } else {
    $(`#${id}`).addClass('bg-secondary')
    $(`#${id}`).text('0')
    $('#current-player').text('Current Player: X')
  }
}

const spotOccupied = function () {
  gameMessagesRestore()
  $('#game-messages').html('<h3>That spot is already taken. Choose another.</h3>')
  $('#game-messages').addClass('text-danger')
  $('#game-messages').fadeOut(2000)
}

const gameNotInPlay = function () {
  gameMessagesRestore()
  $('#game-messages').html('<h3>The game is not in play. Start a new game first</h3>')
  $('#game-messages').addClass('text-danger')
  $('#game-messages').fadeOut(2500)
}

const gameOver = function (token) {
  $('.box').removeClass('box-hover')
  $('.play-again').show()
  $('#choose-opponent-modal').show()
  $('.modal-outcome').text(`${token} won the game!`)
}

const gameEndTie = function () {
  $('.box').removeClass('box-hover')
  $('.play-again').show()
  $('#choose-opponent-modal').show()
  $('.modal-outcome').text('It was a tie!')
}

const onExitGame = function () {
  $('.play-again').hide()
  $('#new-game-nav').show()
  $('#choose-opponent-nav').show()
  $('#currentPlayer').text($('.modal-outcome').text())
}

const resetGameBoard = function () {
  $('.box').text('')
  $('.box').removeClass('bg-primary bg-secondary')
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
