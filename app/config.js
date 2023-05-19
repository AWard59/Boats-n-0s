let apiUrl // Variable to hold the API URL
const apiUrls = {
  production: 'https://tic-tac-toe-api-production.herokuapp.com', // API URL for production environment
  development: 'https://tic-tac-toe-api-development.herokuapp.com' // API URL for development environment
}

// Check if the current hostname is 'localhost'
if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development // Set API URL to development URL
} else {
  apiUrl = apiUrls.production // Set API URL to production URL
}

module.exports = {
  apiUrl
}
