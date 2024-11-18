const shigaraki = document.getElementById("shigaraki");
const obstacle = document.getElementById("obstacle");
const bg = document.getElementById("bg");
const play = document.getElementById("playState");
const text = document.getElementById("text");
const scoreDisplay = document.getElementById("score");

let score = 0;
let isAlive; // variable to store interval ID

// trigger jump() when user presses any key
document.addEventListener("keydown", function (event) {
  jump();
});

// trigger playState() when user clicks on the enter button
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    playState();
  }
});

// playState(): game is running and character is moving
function playState() {
  // change display
  bg.classList.add("startBg");
  play.style.display = "block";
  text.style.display = "none";
  scoreDisplay.innerHTML = `Score: ${score}`;

  // collision detection logic that will keep running every 10ms while in playState
  let obstaclePassed = false;
  isAlive = setInterval(function () {
    // get current shigaraki Y position
    let shigarakiTop = parseInt(
      window.getComputedStyle(shigaraki).getPropertyValue("top")
    );

    // get current obstacle X position
    let obstacleLeft = parseInt(
      window.getComputedStyle(obstacle).getPropertyValue("left")
    );

    // detect collision
    if (obstacleLeft < 60 && obstacleLeft > 40 && shigarakiTop >= 140) {
      // stop collision detection before going into endState
      clearInterval(isAlive);
      endState();
    } else if (obstacleLeft < 40 && !obstaclePassed) {
      // shigaraki passed the obstacle
      score++;
      scoreDisplay.innerHTML = `Score: ${score}`;
      obstaclePassed = true;
    } else if (obstacleLeft > 60) {
      // obstacle is off screen
      obstaclePassed = false;
    }
  }, 10);
}

// endState(): game is over and character is not moving
function endState() {
  bg.classList.remove("startBg");
  play.style.display = "none";
  text.style.display = "block";
  text.innerText = `Game Over!\nScore:${score}\nPress Enter to play again`;
  score = 0;
}

// jump(): make the character jump
function jump() {
  if (shigaraki.classList != "jump") {
    shigaraki.classList.add("jump");
    setTimeout(function () {
      shigaraki.classList.remove("jump");
    }, 500);
  }
}

function obstacleRandomizer() {
  // TODO: randomize obstacle image
}
