const shigaraki = document.getElementById("shigaraki");
const cactus = document.getElementById("cactus");
const bg = document.getElementById("bg")

let gameOver = false;
function start(){
    bg.classList.add("startBg");
}

function jump(){
    if (shigaraki.classList != "jump"){
        shigaraki.classList.add("jump");
        setTimeout(function() {
            shigaraki.classList.remove("jump");
        }, 500);
    }
}

let isAlive = setInterval(function(){
    // get current shigaraki Y position
    let shigarakiTop = parseInt(window.getComputedStyle(shigaraki).getPropertyValue("top"));
    // console.log(shigarakiTop);

    // get current cactus X position
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    // console.log(cactusLeft);

    // detect collision
    if (cactusLeft < 60 && cactusLeft > 40 && shigarakiTop >= 115){
        //collision hppens
        console.log("collision");
        alert("Game Over!");
    }
}, 10);

function cactusRandomizer(){

}

document.addEventListener("keydown", function(event){
    jump();
});
