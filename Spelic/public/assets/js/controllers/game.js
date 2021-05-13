// Constants
const ASTEROID_WIDTH =
  20 * parseFloat(getComputedStyle(document.documentElement).fontSize);
const EARTH_DIAMETER =
  60 * parseFloat(getComputedStyle(document.documentElement).fontSize);

//URL data
var url = window.location.search;
var params = new URLSearchParams(url);

// If the student was not assigned a level the default is set to first grade
var level = FIRST_GRADE;

// DOM elements
var earth = document.getElementById("earth");
var asteroid = document.getElementById("asteroid");
var asteroidWord = asteroid.children[0];
var hint = document.getElementById("hint");
var playToggle = document.getElementById("play-pause");

// Game settings
var gameWords = [];
var isPlaying = false;
var lives = 3;
var hiddenLetter = "";
var vowels = ["a", "e", "i", "o", "u"];
var speed = 5;
var currentPos = -ASTEROID_WIDTH;
var motionInterval = undefined;

// Sounds
var music;



/**
 * @description listen to updates on the user status. If the
 * user is signed in we update the ui of home page.
 */
currentUserListener.registerListener(function (val) {
  if (val) {
    init();
  } else {
    // User is not signed in
    window.location.replace("/");
  }
});

function init() {
  // Load background
  particlesJS.load("particles-js", "/assets/js/particles/particles.json");

  if (currentUserIsTeacher()) {
    level = params.get("level");
  } else {
    if (currentUser.grade != null) {
      level = currentUser.grade;
    }
  }

  // Set asteroid styling
  asteroid.style.width = ASTEROID_WIDTH + "px";
  asteroid.style.height = ASTEROID_WIDTH / 2 + "px";
  asteroid.style.left = -ASTEROID_WIDTH + "px";

  // TODO: retrieve users progress, game words, and custom
  // words on completion of all promises start the game
  var promise = retrieveGameWords(level);
  promise.then(function (result) {
    if (result.success) {
      // Words successfully retrieved
      gameWords = result.return;
      play();
    } else {
      // Error retrieving words
      console.log(result.return);
    }
  });
}

function play() {
  if (gameWords.length == 0) {

    if(level == FIFTH_GRADE) {
      swal("Congratulations", "You successfully completed all levels! You can keep practicing fifth grade word if you want.", "success");
    } else {
      var win = new Audio("/assets/sound/win.wav")
      win.play();
      swal("Good job!", "You passed the level!", "success");
      updateStudentGrade(currentUser.auth.uid, ++level);
    }
  } else if (lives == 0) {
    swal("You Lose!", "Please refresh and try again!", "error");
    isPlaying = false;
  } else {
    sendAsteroid();
  }
}

function sendAsteroid() {
  var ran = Math.floor(Math.random() * gameWords.length);
  var testWord = gameWords.splice(ran, 1)[0];
  testWord.word = removeVowel(testWord.word);
  asteroidWord.innerHTML = testWord.word;
  hint.innerHTML = testWord.hint;

  motionInterval = setInterval(function () {
    if (isPlaying) {
      currentPos += speed;
      asteroid.style.left = currentPos + "px";
      var asteroidRect = asteroid.getBoundingClientRect();
      var earthRect = earth.getBoundingClientRect();
      if (asteroidRect.right > earthRect.left) {
        var heart = document.getElementById("life" + lives);
        heart.style.color = "gray";
        lives--;
        asteroid.style.left = -ASTEROID_WIDTH;
        currentPos = -ASTEROID_WIDTH;
        clearInterval(motionInterval);
        var smash = new Audio("/assets/sound/earthSmash.wav");
        smash.play();
        play();
      }
    }
  }, 20);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  var timeup = null;
  do {
    timeup = new Date().getTime();
  } while (timeup - start < milliseconds);
}

document.onkeypress = function(e) {
  e = e || window.event;
  var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
  if (charCode) {
      submitGuess(String.fromCharCode(charCode));
  }
};

// document.onkeypress = function() {myFunction()};

function submitGuess(guess) {
  // TODO: make both lowercase
  if (guess == hiddenLetter) {
    clearInterval(motionInterval);
    asteroid.style.backgroundImage = "url('/assets/images/explosion.png')";
    asteroidWord.style.visibility = "hidden";
    var explosion = new Audio("/assets/sound/explosion.wav");
    explosion.play();

    setTimeout(() => {
      asteroid.style.visibility = "hidden";
      asteroid.style.left = -ASTEROID_WIDTH;
      currentPos = -ASTEROID_WIDTH;
  
      setTimeout(() => {
        asteroid.style.backgroundImage = "url('/assets/images/asteroid.png')";
        asteroidWord.style.visibility = "visible";
        asteroid.style.visibility = "visible";
        var music = new Audio("/assets/sound/Dreamcatcher.mp3")
        music.play();
        play();
      }, 250);
    }, 750);
  }
}

function removeVowel(word) {

  var i = Math.floor(Math.random() * (word.length - 1));

  hiddenLetter = word[i];
  word = word.substr(0, i) + "_" + word.substr(i + "_".length);
  return word;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function togglePlay() {
  if (isPlaying) {
    isPlaying = false;
    playToggle.classList = "icon fa-play";
  } else {
    isPlaying = true;
    playToggle.classList = "icon fa-pause";
  }
}
