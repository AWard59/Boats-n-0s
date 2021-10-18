# Boats & 0's

A variation of the classic 'Tic-Tac-Toe'. 
The application requires a user to be signed up to be able to use it's features. Once signed up, it will be tracking the current and all previous games histories. 
The game visually displays placed tokens. There is also a glow effect to make it even easier to see - blue for an empty space, red for occupied. 
User will be alerted of any errors - during sign-in/sign-up/change password, or even during the game. 
After game completion, it displays a result with the option to play again. The user can keep playing without requiring a single refresh or logging in again. 

Go get you some boats and 0's!

## Setup Steps

1. Fork and clone this repository.
2. Run `npm install` to install all dependencies
3. Use `grunt serve` to spin up the server.

## Important Links

- [Deployed Client](https://award59.github.io/tic-tac-toe-client/)

## Screenshot

![Game Page screenshot](https://imgur.com/NzZr7z6.png)

## Planning Story

I began the planning of the project with some simple wireframes and user stories, after receiving the user spec for the application. You can see these below.

The next step was to make a base template, and begin working from there. I followed a fairly simple schedule, taking the project with a modular approach and working piece by piece. The general idea was to finish a feature, then commit and deploy the feature before working on the next feature. This was best practice to track which features where added, and at what point within the development. 

The best approach to this application was to use a Single Page Application (SPA). The template is simple enough to do so, and it does create a better, faster experience for the user. To do this, I sectioned each page within a `section`, with an ID or class of the page reference. Then I only have to show/hide content based on successes. 

I chose to import Bootstrap for most of the physical objects. The bootstrap design is consistent with my wireframe design, and is much easier to control responsive objects for different sized screens. Bootstrap flexbox was how I'd always planned to create the game grid too, again with it's ease to control responsiveness, it creates the same experience for all users.

### Wireframe

![wireframe - Sign Up/In](https://i.imgur.com/F4xqyGu.png)
![wireframe - Game Page](https://i.imgur.com/uILBVsI.png)
![wireframe - Game End Message](https://i.imgur.com/tRu4rep.png)

### User Stories

![User Stories](https://i.imgur.com/fdIzwHz.png)

### Technologies Used

- jQuery
- HTML/CSS
- Bootstrap
- Javascript

### Unsolved Problems & Future Features

No currently known issues as of this commit.

#### Features I want to implement:-

- Display number of games won
- Restore previous game state
- More styling 
- - Further simplify sign in/up page
- - New tokens
- Automatic Sign in after sign up
- Stay signed in on refresh

### Useful resources

- [Box Shadow Glow Generator](https://www.cssmatic.com/box-shadow)
- - This was used to create the glow effect of cells
- - There is also a rounded edge feature which I used
