'use strict'

const store = require('./store')

const signUpSuccess = function (responseData) {
  $('#sign-up-success').html('<p>Signed up successfully!</p>',
    '<p>Sign In to continue</p>')
  $('#sign-up-success').removeClass()
  $('#sign-up-success').addClass('text-success')
  $('#sign-up-success').fadeOut(5000)

  $('form').trigger('reset')

  console.log(responseData)
}

const signUpFailure = function (err) {
  $('#sign-up-failure').text('Sign up failed')
  $('#sign-up-failure').removeClass()
  $('#sign-up-failure').addClass('text-danger')
  $('#sign-up-failure').fadeOut(5000)

  console.error(err)
}

const signInSuccess = function (responseData) {
  store.user = responseData.user

  $('#sign-in-success').text('Signed in successfully!')
  $('#sign-in-success').removeClass()
  $('#sign-in-success').addClass('text-success')
  $('#sign-in-success').fadeOut(5000)

  $('form').trigger('reset')
  $('#sign-in-page').hide()
  $('.game-page').show()

  console.log(responseData)
}

const signInFailure = function (err) {
  $('#sign-in-failure').text('Sign in failed')
  $('#sign-in-failure').removeClass()
  $('#sign-in-failure').addClass('text-danger')
  $('#sign-in-failure').fadeOut(5000)

  console.error(err)
}

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

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure
}
