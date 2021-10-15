# Butter, Cheese & Eggs: A Variation of Tic-Tac-Toe

This application is a fully functioning Tic-Tac-Toe game, but with Butter, Cheese & Eggs. I did some research on the name of the game, as for myself I have always known it as 'Noughts and Crosses'. I discovered that the Dutch call it 'Boter-kaas-en-eieren', which translates to 'Butter, Cheese and Eggs'. I thought this was a cool spin, so I adopted it for my project. 

## Setup Steps

1. Fork and clone this repository.
2. Run `npm install` to install all dependencies
3. Use `grunt serve` to spin up the server.

## Important Links

- [Deployed Client](https://award59.github.io/tic-tac-toe-client/)
- [Box Shadow Glow Generator](https://www.cssmatic.com/box-shadow)

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

The only currently known issue is that the player token counter is displaying before the game even starts. I can fix this with a simple hide, and then show on new game click.

#### Features I want to implement:-
- ~~Change password option~~
- ~~Game display messages~~
- - ~~New game started~~
- - ~~Spot occupied~~
- - ~~Cannot continue after game completion~~
- A record of games played
- Play vs an AI
- - Optional difficulty level vs AI
- - Ability to choose token/randomize
- Restore previous game state
- Further simplify sign in/up page
- More styling 
- - ~~grid square glow on hover~~
- - New tokens
- - ~~box shading and rounded edges~~
