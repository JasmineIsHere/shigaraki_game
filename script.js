const shigaraki = document.getElementById("shigaraki");
const obstacle = document.getElementById("obstacle");
const gigantomachia = document.getElementById("gigantomachia");
const bg = document.getElementById("bg");
const play = document.getElementById("playState");
const ready = document.getElementById("readyState");
const text = document.getElementById("text");
const scoreDisplay = document.getElementById("score");

let score = 0;
let isAlive; // variable to store interval ID

// trigger jump() when user presses any key
// document.addEventListener("keydown", function (event) {
//   jump();
// });

// trigger playState() when user clicks on the enter button
document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    if (!isAlive) {
      readyState();
    }
  } else {
    jump();
  }
});

// readyState(): game is ready to start, a few seconds before character starts moving
function readyState() {
  ready.style.display = "block";
  text.style.display = "none";
  scoreDisplay.innerHTML = `Score: ${score}`;
  gigantomachia.style.visibility = "visible";
  // timer to start playState after 3 seconds
  setTimeout(function () {
    gigantomachia.classList.add("moveoutGiganto");
    playState();
  }, 1000);
}

gigantomachia.addEventListener("animationiteration", function () {
  const leftPos = parseInt(
    window.getComputedStyle(gigantomachia).getPropertyValue("left")
  );
  if (leftPos >= 550) {
    gigantomachia.style.visibility = "hidden";
    gigantomachia.classList.remove("moveoutGiganto");
  }
});

// playState(): game is running and character is moving
function playState() {
  // change display
  play.style.display = "block";
  text.style.display = "none";
  scoreDisplay.innerHTML = `Score: ${score}`;
  bg.classList.add("startBg");

  // collision detection logic that will keep running every 10ms while in playState
  let obstaclePassed = false;
  isAlive = setInterval(function () {
    const readyStateRect = ready.getBoundingClientRect();
    const shigarakiRect = shigaraki.getBoundingClientRect();
    // get current shigaraki Y position
    const shigarakiLeft = shigarakiRect.left - readyStateRect.left;
    const shigarakiBottom = Math.abs(shigarakiRect.bottom - readyStateRect.bottom);

    let shigarakiWidth = parseInt(
      window.getComputedStyle(shigaraki).getPropertyValue("width")
    );

    // get current obstacle X position
    const obstacleRect = obstacle.getBoundingClientRect();
    const obstacleLeft = obstacleRect.left - readyStateRect.left;

    let obstacleHeight = obstacleRect.height;

    // detect collision
    if (
      obstacleLeft < shigarakiLeft + shigarakiWidth &&
      obstacleLeft > shigarakiLeft &&
      shigarakiBottom <= obstacleHeight
    ) {
      // stop collision detection before going into endState
      clearInterval(isAlive);
      endState();
    } else if (obstacleLeft < shigarakiLeft && !obstaclePassed) {
      // shigaraki passed the obstacle
      score++;
      scoreDisplay.innerHTML = `Score: ${score}`;
      obstaclePassed = true;
    } else if (obstacleLeft > shigarakiLeft + shigarakiWidth && obstaclePassed) {
      // obstacle is off screen
      obstaclePassed = false;
    }
  }, 10);
}

// endState(): game is over and character is not moving
function endState() {
  bg.classList.remove("startBg");
  ready.style.display = "none";
  play.style.display = "none";
  text.style.display = "block";
  text.innerText = `Game Over!\nScore:${score}\nPress Enter to play again`;
  score = 0;
  isAlive = null;
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
