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
// empty array to track tokens placed in each cell
let gameCellTracker = ['', '', '', '', '', '', '', '', '']
// All possible variations of winning conditions
// stored as variable to reduce amount of code to check later, via a loop
const winVariations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

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
    .catch(ui.signOutFailure)
}

// Check if the clicked grid section has already been occupied/played (data result can either be 'x', '0' or '' empty string. empty string is available to play)
// If not occupied, apply the current token, x or 0, to the data to lock it
// switch the token for the next player, X>0, or 0>X
const onGridSelection = function (event) {
  const currentToken = playerToken
  // gameState is default false, until we click New Game button for function onNewGame above
  // until the button is clicked, the grid has no functionality
  if (gameState) {
    const target = event.target
    // console.log('clicked ' + target.id) // testing purposes
    if (gameCellTracker[target.id] === '') {
      gameCellTracker[target.id] = currentToken
      // console.log(gameCellTracker) // testing purposes
      ui.gridSelection(currentToken)
      if (currentToken === 'X') {
        playerToken = '0'
      } else {
        playerToken = 'X'
      }
      checkForWinner(currentToken)
      // ui.currentPlayer(currentToken)
    } else {
      console.log('hi')
    }
  }
  return playerToken
}

// loop through 8 iterations of 8 possible winning outcomes (index 0-7)
// winVariations is iterating [i] through the 8 possible outcomes, whilst the specified index inside of indexWinVariations is getting the value of that index
// e.g. iteration 6 would gives these results:
// indexZero = 0 indexOne = 4 indexTwo = 8
// and then we check gameCellTracker for the index values for indexes 0, 4 & 8
const checkForWinner = function (playerToken) {
  for (let i = 0; i <= 7; i++) {
    const indexWinVariations = winVariations[i]
    const indexZero = gameCellTracker[indexWinVariations[0]]
    const indexOne = gameCellTracker[indexWinVariations[1]]
    const indexTwo = gameCellTracker[indexWinVariations[2]]
    // console.log(`${i} = ${indexZero}, ${indexOne}, ${indexTwo}`) // testing purposes
    // first, check that no index values are an empty string
    // (without the check, if all 3 were empty it would pass our game win check)
    if (indexZero === '' || indexOne === '' || indexTwo === '') {
      continue
      // compare values for each index of the winning variations
    } else if (indexZero === indexOne && indexZero === indexTwo) {
      // gameState will stop the game being played upon completion
      gameState = false
      ui.gameOver(playerToken)
      // break (stop) the loop if successful
      break
      // if no cells (!) in the tracker are blank, and no winner was confirmed from the loop,the game ends in a tie
    } else if (!gameCellTracker.includes('')) {
      gameState = false
      ui.gameEndTie()
    }
  }
}

const onPlayAgain = function () {
  playerToken = 'X'
  gameCellTracker = ['', '', '', '', '', '', '', '', '']
  ui.resetGameBoard()
  onNewGame()
}

// Check if the hovered box has an empty cell tracked in the array
// if empty, apply pre-written box hover css
// if not empty, apply the occupied variant
const onCellHover = function (event) {
  if (gameState) {
    if (gameCellTracker[event.target.id] === '') {
      $(event.target).addClass('box-hover')
    } else {
      $(event.target).addClass('box-hover-occupied')
    }
  }
}

// remove the box hover css when mouse leaves
const offCellHover = function (event) {
  if (gameState) {
    $(event.target).removeClass('box-hover')
    $(event.target).removeClass('box-hover-occupied')
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onNewGame,
  onGridSelection,
  onPlayAgain,
  onCellHover,
  offCellHover
}
