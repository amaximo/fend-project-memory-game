/*
 * LIST THAT HOLDS ALL CARDS
 *
 * This array holds all the cards that are presented on the board. There are 2
 * of each card because the player will be matching them. From the original html,
 * we moved the list of cards to here to create an array.
 */
const icons = ["fa fa-youtube-play", "fa fa-youtube-play", "fa fa-twitter", "fa fa-twitter",
"	fa fa-twitch", "	fa fa-twitch", "fa fa-tumblr-square", "fa fa-tumblr-square", "fa fa-steam-square", "fa fa-steam-square",
"fa fa-reddit-alien", "fa fa-reddit-alien", "fa fa-instagram", "fa fa-instagram", "fa fa-github-alt", "fa fa-github-alt"]

//Selected the parent deck from index.html. This contained all the cards from the html code
const cardsContainer = document.querySelector(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
*/
//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let openedCards = [];
let matchedCards = [];

/*
 * INITIALIZE GAME
 *
 * First, the shuffle fxn was called to shuffle the deck prior to the game starting.
 * Then a for loop was created to loop through all the available cards in the deck.
 * Lastly, the click(card) fxn was called so an eventLister is set when the player
 * clicks on a card.
 */
function init() {
  shuffle(icons); //Calls icons to shuffle all cards (from shuffle fxn) before game starts

  for(let i = 0; i < icons.length; i++) {        //this will loop through all the available cards
    const card = document.createElement("li");   //created elements
    card.classList.add("card");
    card.innerHTML = `<i class="${icons[i]}"></i>`;
    cardsContainer.appendChild(card); //Once we selected the parent, we appened the child and pass 'card' as the argument

    //Add Click Event to each card
    click(card);
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *   + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/*
 * GAME CLICK EVENT
 */
 let firstClick = true;
function click(card) {

   //Card Click Event - select each card and apply and event listener to the cards
   card.addEventListener("click", function() {

     if(firstClick) {
       startTimer();  //start timer
       firstClick = false;  //change first click indicator value
     }

     const currentCard = this;
     const previousCard = openedCards[0];

     //have existing opened card
     if(openedCards.length === 1) {

       card.classList.add("open", "show", "disable");
       openedCards.push(this);   //"this" refers to the clicked card

       //Call compare function to compare 2 open cards
       compare(currentCard, previousCard);

     } else {
     //no opened cards
     card.classList.add("open", "show", "disable");
     openedCards.push(this);   //"this" refers to the clicked card

     }

   });
 }


/*
 * COMPARING PLAYER SELECTED CARDS
 */
function compare(currentCard, previousCard) {

  //Matcher
  if(currentCard.innerHTML === previousCard.innerHTML) {

    //Matched
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCards.push(currentCard, previousCard);
    openedCards = [];   //resets all opened cards
    congratulations(); //Call 'congratulations' when players finds all matches

  } else {

    //Using setTimeout allows to wait 500 ms until the unmatched cards turn back
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
      openedCards = [];   //resets all opened cards
    }, 400);
  }
  addMove(); //Call 'addMove' to add moves made by the player to move counter
}

/*
 * CHECK IF GAME OVER
 *
 * This fxn is called once the game is over. When called, the game timer will stopTime
 * and an alert (confirm) message will pop up.
*/
function isOver() {
    if(matchedCards.length === icons.length) {

      finalTime();  //Call stopTime fxn to stop the timer once the no. of matchedCards
                    //equal the no. of actual cards
     congratulations(); //Calls congratulations fxn to show modal once game is over
                        //Modal shows game results and asks if user wants to play again
    }
}

/*
 * STAR RATING
 *
 * This fxn determines the player's star rating throughout the game. A switch
 * was used to determine the number of stars the player gets within a specific
 * number of moves the player makes
 */
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`
function starRating() { //star rating wil be measured by the no. of player moves
  switch(moves) {
    case 15:
      starsContainer.innerHTML = star + " " + star;
    break;

    case 20:
     starsContainer.innerHTML = star;
    break;
  }
}

/*
 * ADDING MOVES
 *
 * This function is a counter that will add 1 every time the player makes a
 * move in the game (whether the move was a match or no match). While making
 * moves, the rating fxn is called to calculate the number of moves and
 * determine the player's star rating
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;

  starRating(); //Determine player's star rating when making moves in game
}

/*
 * TIMER FUNCTIONS
 *
 * This function is a counter that will add 1000 miliseconds (1 second) to the
 * game timer while the player is making card matches.
 */
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" Minute(s) "+second+" Seconds";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000); //1000 miliseconds = 1 second
}

const timerContainer = document.querySelector(".timer");
let gameTimer,
    totalSeconds = 0; //set starting gameTimer to 0 seconds
    totalMinutes = 0; //set starting gameTimer to 0 minutes

//Set default value to the timer's container
timerContainer.innerHTML = totalMinutes + ' Minute(s) ' + totalSeconds + ' Seconds';

/*
 * GAME MODAL
 *
 * Modal referenced from: https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript#7-a-congratulations-modal
 *
 * This modal will be shown once the player makes the last card match. Modal will
 * let the player know the time he/she took to finish the game, how many moves and
 * how many stars the player gets. The modal will also ask whether the player
 * would like to play the game again.
 */

let modal = document.getElementById("popup1") //modal
let starsList = document.querySelectorAll(".stars li"); //stars list
let closeicon = document.querySelector(".close"); //close icon in modal
//congratulations fxn that will show player's game stats
function congratulations(){
    if (matchedCards.length == 16){   //Once the number of matched cards = 16, the timer will stop
        clearInterval(interval);
        finalTime = timerContainer.innerHTML;
    modal.classList.add("show");      //show congratulations modal
    var starRating = document.querySelector(".stars").innerHTML; //declare star rating variable
    document.getElementById("finalMove").innerHTML = moves + 1; //show/call for number of moves
    //I added 1 to the final number of moves because the modal did not count the last move
    //the player made. Without it, the final number of moves will be minus 1 from the true
    //number of moves
    document.getElementById("starRating").innerHTML = starRating; //show/call for player's star rating
    document.getElementById("totalTime").innerHTML = finalTime; //show/call for player's time
    closeModal(); //closeicon on modal
    };
}

//Close icon for modal
function closeModal(){
    closeicon.addEventListener("click", function(e){  //Create event listener for close btn
        modal.classList.remove("show"); //This will close the modal
    });
}

//Play again button for modal
function playAgain(){
    button.addEventListener("click", function(e){
    modal.classList.remove("show");
    //window.location.reload()
      //I was going to leave the reload() command for playAgain on js but decided
      //to leave it on the on-click line in the html file
  });
}

/*
 * CALL INIT FXN TO START GAME!
 */
init();
