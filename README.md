# FEND Memory Game

## Description
This is Project 2 - Memory Game for Udacity's FEND Nanodegree.

In this game, the player will create 8 different matches for various social media icons. The player will be scored out of 3 stars based on the number of moves made.

The project was built using HTML, CSS & JavaScript. Starting code (which provided introductory game design) was provided by Udacity [here](https://github.com/udacity/fend-project-memory-game) & shuffle function was provided from [here](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976).

## Launching Game
You may go to the game site (hosted by Github) by clicking [here](https://amaximo.github.io/fend-project-memory-game/)! Have fun!

## How to Play
Are you ready to have some fun making matches?

1. To start playing, simply flip a card to reveal its icon. *Note:* once a card is flipped, the timer will begin counting up
1. Match each social media icon to their respective match. There are 8 icons (Twitter, Instagram, Tumblr, Reddit, GitHub, Twtich, Steam & YouTube) to create matches for. How the player is scored is listed under "How Player is Scored" in this README file.
1. Once all matches are made, a modal will be present congratulating the player for finding all the matches and listing game stats (number of moves, amount of time took to find all matches & final star rating)

* There is a reset button located to the right of the moves counter. You may click the icon to reset the game.
* When the modal is present, you may:
  1. review your game stats and watch the special video provided
  1. click "Play again?" to play the game again or
  1. click the "X" at the top right corner of the modal to exit the modal. Doing this will close the modal and show your present game. To start the game over, either refresh the page or click on the "Reset game" icon.

## How Player is Scored
* Player is scored by the number of moves he or she makes. The game is not time dependant but the user is timed (counted up) to let the player know how long he or she took to complete the game
* Player starts off with 3 stars
* When the player makes their 15th move, player score will decrease to 2 stars
* Once the player makes their 20th move, player score will decrease to 1 star

## Dependencies
* Site icon - created/provided by A.Maximo
* Bootstrap "Font Awesome" 4.6.1 Min CSS - Provides game icons
* [Google Font Family Cookie](https://fonts.googleapis.com/css?family=Cookie)
* [Google Font Family Kosugi Maru](https://fonts.googleapis.com/css?family=Kosugi+Maru)
