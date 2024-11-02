const shigaraki = document.getElementById("shigaraki");
const obstacle = document.getElementById("obstacle");
const bg = document.getElementById("bg")
const play = document.getElementById("playState");
const text = document.getElementById("text");
const scoreDisplay = document.getElementById("score");

let score = 0;
let gameOver = false;
function playState(){
    bg.classList.add("paused");
    play.style.display = "block";
    text.style.display = "none";
    scoreDisplay.innerHTML = `Score: ${score}`;
}

function endState(){
    bg.classList.remove("startBg");
    play.style.display = "none";
    text.style.display = "block";
    text.innerText = `Game Over!\nScore:${score}\nPress Enter to play again`;
    score = 0;
}

function jump(){
    if (shigaraki.classList != "jump"){
        shigaraki.classList.add("jump");
        setTimeout(function() {
            shigaraki.classList.remove("jump");
        }, 500);
    }
}

let obstaclePassed = false;
let isAlive = setInterval(function(){
    // get current shigaraki Y position
    let shigarakiTop = parseInt(window.getComputedStyle(shigaraki).getPropertyValue("top"));
    // console.log(shigarakiTop);

    // get current obstacle X position
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    // console.log(obstacleLeft);

    // detect collision
    if (obstacleLeft < 60 && obstacleLeft > 40 && shigarakiTop >= 140){
        //collision hppens
        console.log("collision");
        endState();
        // alert("Game Over!\nPress Enter to play again");
    } else if (obstacleLeft < 40 && !obstaclePassed){
        score++;
        scoreDisplay.innerHTML = `Score: ${score}`;
        obstaclePassed = true;
    } else if (obstacleLeft > 60){
        obstaclePassed = false;
    }
}, 10);


function obstacleRandomizer(){
    // TODO: randomize obstacle image
}

document.addEventListener("keydown", function(event){
    jump();
});

document.addEventListener("keypress", function(event){
    if (event.key === 'Enter') {
        playState();
    }
});