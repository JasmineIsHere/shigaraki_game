const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
function jump(){
    if (dino.classList != "jump"){
        dino.classList.add("jump");
        setTimeout(function() {
            dino.classList.remove("jump");
        }, 500);
    }
}

let isAlive = setInterval(function(){
    // get current dino Y position
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    // console.log(dinoTop);

    // get current cactus X position
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    // console.log(cactusLeft);

    // detect collision
    if (cactusLeft < 60 && cactusLeft > 40 && dinoTop >= 115){
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
