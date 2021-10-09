'use strict'

const signUpSuccess = function (responseData) {
  $('#sign-up-success').text('Signed up successfully')
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
  // store.user = responseData.user

  $('#sign-in-success').text('Successfully signed in!')
  $('#sign-in-success').removeClass()
  $('#sign-in-success').addClass('text-success')
  $('#sign-in-success').fadeOut(5000)

  $('form').trigger('reset')
  // $('#before-sign-in').hide()
  // $('#after-sign-in').show()

  console.log(responseData)
}

const signInFailure = function (err) {
  $('#sign-in-failure').text('Sign in failed')
  $('#sign-in-failure').removeClass()
  $('#sign-in-failure').addClass('text-danger')
  $('#sign-in-failure').fadeOut(5000)

  console.error(err)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure
}
