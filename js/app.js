/*EDIT CODE SO IT'S MORE READABLE & ADD COMMENTS!!!*/

/*
 * LIST THAT HOLDS ALL CARDS
 *
 * This array holds all the cards that are presented on the board. There are 2
 * of each card because the player will be matching them. From the original html,
 * we moved the list of cards to here to create an array.
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
"fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube",
"fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"]

//Selected the parent deck from index.html. This contained all the cards from the html code
const cardsContainer = document.querySelector(".deck");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page


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
}*/

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


  //shuffle(icons); //Calls icons (line 4) to shuffle all cards (from shuffle fxn) before game starts

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

    congratulations(); //isOver(); //Call 'isOver' when players finds all matches

  } else {

    //Using setTimeout allows to wait 500 ms until the unmatched cards turn back
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
      openedCards = [];   //resets all opened cards
    }, 300);
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
      //playAgain();  //Calls playAgain fxn to show a confim message to the player showing
                    //game results and asking if user wants to play again
     congratulations();
    }
}

/*
 * PLAY AGAIN MESSAGE
 *
 * This fxn will show an alert message (confirm) once the player is finished
 * with the game. The message will show the player the game results and asking
 * if he/she whould like to play again. If user presses 'ok', the page will
 * reload and the game will reset. If user presses 'cancel', the page will
 * stay where it is.


function playAgain() {

  var message;
  if (confirm('GAME OVER! You completed the game in '+ timerContainer.innerHTML
  + ' and ' + movesContainer.innerHTML + ' moves! You get '
  + starsContainer.innerText + ' stars! Would you like to play again?')) {
    window.location.reload();
  }
} */

/*
 * STAR RATING
 *
 * This fxn determines the player's star rating throughout the game. A switch
 * was used to determine the number of stars the player gets within a specific
 * number of moves the player makes
 */
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`
function starRating() { //rating wil be measured by the no. of player moves
  switch(moves) {
    case 15:
      starsContainer.innerHTML = star + star;
    break;

    case 20:
     starsContainer.innerHTML = star;
    break;
  }
}

/*
 * RESET STAR RATING
 *
 * This fxn will reset the player's star rating
 */
 function resetStarRating() {
   starsContainer.innerHTML = star + star + star;
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
 * RESET MOVES
 *
 * This fxn will reset the player's moves made in the game
 */
function resetMoves() {
  moves = 0;
  movesContainer.innerHTML = moves;
}

//game timer
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" Minutes "+second+" Seconds";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

/*
 * TIMER FUNCTIONS
*/
const timerContainer = document.querySelector(".timer");
let gameTimer,
    totalSeconds = 0; //set starting gameTimer to 0 seconds
    totalMinutes = 0; //set starting gameTimer to 0 minutes

//Set default value to the timer's container
timerContainer.innerHTML = totalMinutes + ' Minutes ' + totalSeconds + ' Seconds';

/*
 * START TIMER
 *
 * This fxn will start the game timer counting in seconds. Increments will be
 * made in miliseconds (1000 ms = 1 second of gameplay)

 function startTimer() {
    gameTimer = setInterval(function() {
        totalSeconds++; //Increase totalSeconds by 1
        timerContainer.innerHTML = totalSeconds + ' Seconds'; //Update game with new time
    }, 1000); //used 1000 ms beacuse 1 second = 1000 ms
}

/*
 * STOP TIMER
 *
 * This fxn will call 'clearInterval' to stop the timer

function finalTime() {
  clearInterval(gameTimer);
}*/

/*
 * RESET TIMER
*/
function resetTimer() {
  firstClick = true;
  totalSeconds = 0; //set starting gameTimer to 0 seconds
  totalMinutes = 0; //set starting gameTimer to 0 minutes
  timerContainer.innerHTML = totalMinutes + ' Minutes ' + totalSeconds + " Seconds";
}

/*
 * RESTART BUTTON
 *
 * Once the player presses the restart button, the game will automatically
 * reset.
 * Full fxn of restart button: All cards on board will be deleted and 'init'
 * is called to create new cards on the board. All past matched cards,
 * counted moves, star rating and timer will reset
*/
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {

  cardsContainer.innerHTML = "";    //Delete ALL cards
  init(); //Call 'init' to create new cardsContainer
  matchedCards = [];  //Reset cards
  resetMoves(); //Reset moves
  resetStarRating(); //Reset star rating to 3 stars
  //finalTime();  // Call 'finalTime' to stop timer
  resetTimer(); // Call 'resetTimer' to reset timer

});

//modal referenced from https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript#7-a-congratulations-modal
//modal
let modal = document.getElementById("popup1")
//stars list
 let starsList = document.querySelectorAll(".stars li");
//close icon in modal
let closeicon = document.querySelector(".close");
//congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    if (matchedCards.length == 16){
        clearInterval(interval);
        finalTime = timerContainer.innerHTML;
    //show congratulations modal
    modal.classList.add("show");
    //declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;
    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    //closeicon on modal
    closeModal();
    };
}

//close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
    });
}

//for player to play Again
function playAgain(){
    button.addEventListener("click", function(e){
    modal.classList.remove("show");
    //window.location.reload()
  });
}

/*
 * CALL INIT FXN TO START GAME!
 */
init();



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
