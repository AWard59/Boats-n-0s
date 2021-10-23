'use strict'

// pull the pre-written getFormFields function
const getFormFields = require('../lib/get-form-fields')

// pull api to make our api requests
// pull ui to make our ui changes depending on outcome
const api = require('./api')
const ui = require('./ui')

// game not in play whilst false
let gameState = false
// variable for user's selected opponent
let opponent = 'dumbAI'
// turncounter used to swap tokens when user playing vs human
let turnCounter = 1

// hard code starting player token as X, as X always starts first
let token = 'X'
let id = ''
let gameId = ''

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

// each checkTwoInARow index is a combination of 2 spaces next to each other
// we will use this later for AI to check if it can win or block a win
const checkTwoInARow = [
  [0, 1],
  [1, 2],
  [0, 2],
  [3, 4],
  [4, 5],
  [3, 5],
  [6, 7],
  [7, 8],
  [6, 8],
  [0, 3],
  [3, 6],
  [0, 6],
  [1, 4],
  [4, 7],
  [1, 7],
  [2, 5],
  [5, 8],
  [2, 8],
  [0, 4],
  [4, 8],
  [0, 8],
  [2, 4],
  [4, 6],
  [2, 6]
]

// each index in this array is the 3rd space in the row of the checkTwoInARow array
// again we will use this later for AI to check that the 3rd space is available before blocking or winning
const thirdSpaceInTheRow = [2, 0, 1, 5, 3, 4, 8, 6, 7, 6, 0, 3, 7, 1, 4, 8, 2, 5, 8, 0, 4, 6, 2, 4]

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
  gameCellTracker = ['', '', '', '', '', '', '', '', '']
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

const onChangePassword = function (event) {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.changePassword(formData)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordSuccess)
}

// opponent declared depending on user's button click choice
const onOpponentSelect = function (event) {
  opponent = event.target.id
  const opponentDisplay = event.target.getAttribute('data-opponent-display')
  ui.opponentSelected(opponentDisplay)
  getGamesHistory()
}

const onNewGame = function () {
  gameCellTracker = ['', '', '', '', '', '', '', '', '']
  api.newGame()
    .then(newGameData)
    .catch(ui.signOutFailure)
  return token
}

// change game state to allow the game to be played
// store the game id in a variable to be retrieved for PATCH
// call the UI function to prepare the game board for a new game
const newGameData = function (data) {
  gameState = true
  gameId = data.game._id
  turnCounter = 1
  token = 'X'
  ui.newGameStart()
  getGamesHistory()
  return gameId
}

// make an API request to retrieve an object of all games played
// set timeout because sometimes the GET request is returned before
// the POST request of sign in, meaning no token and an error
const getGamesHistory = function () {
  api.getGames()
    .then(ui.gameHistoryTracker)
}

// Check if the clicked grid section has already been occupied/played (data result can either be 'x', '0' or '' empty string. empty string is available to play)
// If not occupied, apply the current token, x or 0, to the data to lock it
const onGridSelection = function (event) {
  // gameState is default false, until we click New Game button for function onNewGame above
  // until the button is clicked, the grid has no functionality
  if (gameState) {
    if (opponent === 'human') {
      if (turnCounter % 2 === 0) {
        token = '0'
      } else {
        token = 'X'
      }
    }
    id = event.target.id
    // with event.target, get the id 0-8
    // with the id, compare it to the game tracking array with the same index
    // if empty, place token
    if (gameCellTracker[id] === '') {
      onGridSelectionValues(id, token)
      gameCellTracker[id] = token
      ui.gridSelection(token, id)
      checkForWinner(token, id)
    } else {
      ui.spotOccupied()
    }
  } else {
    ui.gameNotInPlay()
  }
  return (token, id)
}

// retrieve the grid ID and the player token to store into a global variable
// this information can then be retrieved for PATCH
const onGridSelectionValues = function (eventId, currentToken) {
  id = eventId
  const token = currentToken
  return (id, token)
}

// loop through 8 iterations of 8 possible winning outcomes (index 0-7)
// winVariations is iterating [i] through the 8 possible outcomes, whilst the specified index inside of indexWinVariations is getting the value of that index
// e.g. iteration 6 would gives these results:
// indexZero = 0 indexOne = 4 indexTwo = 8
// and then we check gameCellTracker for the index values for indexes 0, 4 & 8
const checkForWinner = function (token, id) {
  for (let i = 0; i <= 7; i++) {
    const indexWinVariations = winVariations[i]
    const indexZero = gameCellTracker[indexWinVariations[0]]
    const indexOne = gameCellTracker[indexWinVariations[1]]
    const indexTwo = gameCellTracker[indexWinVariations[2]]
    // first, check that no index values are an empty string
    // (without the check, if all 3 were empty it would pass our game win check)
    if (indexZero === '' || indexOne === '' || indexTwo === '') {
      // api.updateGame(onGridSelectionValues().id, onGridSelectionValues.token, false)
      // compare values for each index of the winning variations
    } else if (indexZero === indexOne && indexZero === indexTwo) {
      // gameState will stop the game being played upon completion
      gameState = false
      api.updateGame(token, id, true, gameId)
      ui.gameOver(token)
      // break (stop) the loop if successful
      break
      // if no cells (!) in the tracker are empty, and no winner was confirmed from the loop,
      // the game ends in a tie
    } else if (!gameCellTracker.includes('')) {
      gameState = false
      api.updateGame(token, id, true, gameId)
      ui.gameEndTie()
      break
    }
  }
  // PATCH the game object
  api.updateGame(token, id, false, gameId)
  // if last played was X (human player) switch to 0
  // otherwise switch to X
  // find out which opponent plays next
  if (opponent === 'human') {
    turnCounter += 1
  } else if (token === 'X') {
    token = '0'
    opponentChoice(token)
  } else {
    token = 'X'
  }
}

// reset the playerToken to X, and the game cell tracker to empty for a new game
const onPlayAgain = function () {
  token = 'X'
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

const opponentChoice = function (token) {
  // check which opponent the user is playing against
  // and run the AI function if necessary
  if (opponent === 'dumbAI') {
    dumbAI(token)
  } else if (opponent === 'regularAI') {
    regularAI(token)
  }
  return token
}

// Basic AI - looks for and selects a random available space
const dumbAI = function (token) {
  token = '0'
  const availableSpaces = []
  // timeout, otherwise the request happens before the user's click is registered
  setTimeout(() => {
    if (gameState) {
      for (let i = 0; i < gameCellTracker.length; i++) {
        // create an array of available game indexes
        if (gameCellTracker[i] === '') {
          availableSpaces.push(i)
        }
      }
      // generate a random number between 0 and total available spaces
      // place token in that cell
      const placeAIToken = Math.floor(Math.random() * availableSpaces.length)
      id = availableSpaces[placeAIToken]
      gameCellTracker[id] = token
      ui.gridSelection(token, id)
      onGridSelectionValues(id, token)
      checkForWinner(token, id)
    }
    return (token, id)
  }, 1500)
}

// regular difficulty AI
// compared to dumbAI, regularAI actually checks if a win of either team can happen
// then commits the win or block
const regularAI = function (token) {
  token = '0'
  const availableSpaces = []
  let winOrBlock = false
  // setting a timeout so that the AI doesn't play immediately after user
  // give a momentary break for a game flow
  setTimeout(() => {
    if (gameState) {
      // check each variation of the array
      // if both indexes contain '0' & the third space is empty
      // set value of id to be retrieved later, and winorblock to true to create an IF true or false
      checkTwoInARow.forEach((variation, index) => {
        if (gameCellTracker[variation[0]] === '0' &&
        gameCellTracker[variation[1]] === '0' &&
        gameCellTracker[thirdSpaceInTheRow[index]] === '') {
          id = thirdSpaceInTheRow[index]
          winOrBlock = true
          // if both indexes contain 'X' & the third space is empty
          // set value of id to be retrieved later, and winorblock to true to create an IF true or false
        } else if (gameCellTracker[variation[0]] === 'X' &&
        gameCellTracker[variation[1]] === 'X' &&
        gameCellTracker[thirdSpaceInTheRow[index]] === '') {
          id = thirdSpaceInTheRow[index]
          winOrBlock = true
        }
      })
      // if winorblock is now true, retrieve the value of the id variable declared in the loop
      // then update the cell index with current token '0'
      if (winOrBlock) {
        gameCellTracker[id] = token
      } else {
        // if no conditions are true, create an array of all available indexes
        for (let i = 0; i < gameCellTracker.length; i++) {
          if (gameCellTracker[i] === '') {
            availableSpaces.push(i)
          }
        }
        // generate a random number to place in one of the available indexes
        const placeAIToken = Math.floor(Math.random() * availableSpaces.length)
        id = availableSpaces[placeAIToken]
        gameCellTracker[id] = token
      }
      ui.gridSelection(token, id)
      onGridSelectionValues(id, token)
      checkForWinner(token, id)
      return (token, id)
    }
  }, 2000)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  onOpponentSelect,
  onNewGame,
  onGridSelection,
  onPlayAgain,
  onCellHover,
  offCellHover
}
