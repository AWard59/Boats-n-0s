'use strict'

const store = require('./store')

const gameMessagesRestore = function () {
  $('#game-messages').empty()
  $('#game-messages').show()
  $('#game-messages').removeClass()
}

// Create a text response (in html) for successful outcome suggesting sign in to continue
// add class of text success (green text) and have it fade away after 5 seconds
// then reset all form data
const signUpSuccess = function (responseData) {
  $('#sign-up-success').html('<p>Signed up successfully!</p> <br> <p>Sign In to continue</p>')
  $('#sign-up-success').removeClass()
  $('#sign-up-success').addClass('text-success')
  $('#sign-up-success').fadeOut(5000)

  $('form').trigger('reset')

  console.log(responseData)
}

// text response stating failure, addclass text danger (red)
const signUpFailure = function (err) {
  $('#sign-up-failure').text('Sign up failed')
  $('#sign-up-failure').removeClass()
  $('#sign-up-failure').addClass('text-danger')
  $('#sign-up-failure').fadeOut(5000)

  console.error(err)
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

  $('#game-messages').text('Signed in successfully!')
  $('#game-messages').addClass('text-success')
  $('#game-messages').fadeOut(2000)
  // console.log(responseData) // testing purposes
}

const signInFailure = function (err) {
  $('#sign-in-failure').text('Sign in failed')
  $('#sign-in-failure').removeClass()
  $('#sign-in-failure').addClass('text-danger')
  $('#sign-in-failure').fadeOut(5000)

  console.error(err)
}

// hide game-page and show sign-in-page
const signOutSuccess = function (responseData) {
  $('.game-page').hide()
  $('#sign-in-page').show()

  console.log(responseData)
}

const signOutFailure = function (err) {
  $('#sign-out-failure').text('Sign out failed')
  $('#sign-out-failure').removeClass()
  $('#sign-out-failure').addClass('text-danger')
  $('#sign-out-failure').fadeOut(5000)

  console.error(err)
}

// Hide the button covering the game board
// change css value of box's opacity to 1 (was 0.3)
const newGameStart = function () {
  $('#new-game-button').hide()
  $('.box').css('opacity', '1')
  $('#current-player').css('visibility', 'visible')

  gameMessagesRestore()
  $('#game-messages').stop(true, true)
  // $('#game-messages').css('visibility', 'visible')
  $('#game-messages').text('New Game Started!')
  $('#game-messages').addClass('text-success')
  $('#game-messages').fadeOut(5000)
}

// add bootstrap primary/secondary bg color, and X/0 text
// also changing the player counter at the top, between X and 0 depending on which player's turn
const gridSelection = function (playerToken) {
  if (playerToken === 'X') {
    $(event.target).addClass('bg-primary')
    $(event.target).text('X')
    $('#current-player').text('Current Player: 0')
    console.log('#current-player')
  } else {
    $(event.target).addClass('bg-secondary')
    $(event.target).text('0')
    $('#current-player').text('Current Player: X')
  }
}

const gameOver = function (playerToken) {
  // console.log(playerToken + ' wins') // testing purposes
  $('.box').removeClass('box-hover')
  $('.play-again').show()
  $('.modal-outcome').text(`${playerToken} won the game!`)
}

const gameEndTie = function () {
  // console.log("it's a tie") // testing purposes
  $('.box').removeClass('box-hover')
  $('.play-again').show()
  $('.modal-outcome').text('It was a tie!')
}

const onExitGame = function () {
  $('.play-again').hide()
  $('#currentPlayer').text($('.modal-outcome').text())
}

const resetGameBoard = function () {
  $('.play-again').hide()
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
  newGameStart,
  gridSelection,
  gameOver,
  gameEndTie,
  onExitGame,
  resetGameBoard
}
