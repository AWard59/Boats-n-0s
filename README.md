# Boats & 0's

Boats & 0's is a variation of the classic 'Tic-Tac-Toe' game. The application requires users to sign up to access its features. Once signed up, users can play the game and track their current and previous game histories. The game visually displays placed tokens with a glow effect: blue for empty spaces and red for occupied spaces. The application also provides error alerts during sign-in, sign-up, change password, and gameplay. After completing a game, users can view the result and have the option to play again without the need for a refresh or re-login.

## Setup Steps

Follow these steps to set up the project:

1. Fork and clone this repository.
2. Run `npm install` to install all dependencies.
3. Use `grunt serve` to start the server.

## Important Links

- [Deployed Client](https://award59.github.io/tic-tac-toe-client/)

## Screenshots

![Sign In/Up Page](https://i.imgur.com/YVjXTyd.png)
![Choose Opponent](https://i.imgur.com/EGGrrov.png)
![Gameplay](https://i.imgur.com/BGAkIDa.png)
![Change Password Screen](https://i.imgur.com/ikNXOPc.png)

## Planning Story

The project planning started with wireframes and user stories based on the user specifications. These wireframes and user stories provided a clear direction for development.

The development process followed a modular approach, where each feature was implemented and deployed individually. This approach allowed for better tracking of added features and their respective development stages.

The application was designed as a Single Page Application (SPA) to provide a seamless and faster user experience. Each page was sectioned within a `section` element with a unique ID or class for easy content visibility control based on user actions.

Bootstrap was chosen to handle most of the design elements as it aligned with the wireframe design and provided responsive object control for different screen sizes. Bootstrap's flexbox was used to create the game grid, ensuring a consistent experience across devices.

### Wireframes

![Wireframe - Sign Up/In](https://i.imgur.com/F4xqyGu.png)
![Wireframe - Game Page](https://i.imgur.com/uILBVsI.png)
![Wireframe - Game End Message](https://i.imgur.com/tRu4rep.png)

### User Stories

![User Stories](https://i.imgur.com/fdIzwHz.png)

### Technologies Used

The following technologies were used in the project:

- jQuery
- HTML/CSS
- Bootstrap
- JavaScript

### Unsolved Problems & Future Features

As of the latest commit, there are no known issues with the application.

#### Features to be Implemented

- Display the number of games won
- Restore the previous game state
- Enhance styling
  - Further simplify the sign-in/up page
- Automatic sign-in after sign-up
- Stay signed in on page refresh

### Useful Resources

- [Box Shadow Glow Generator](https://www.cssmatic.com/box-shadow) - This resource was used to create the glow effect of cells and implement rounded edges.
