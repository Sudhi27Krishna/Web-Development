

// function handleClick() {
//     alert("I got clicked.");
// }

// function sound(){
//     var audio = new Audio("sounds/snare.mp3");
//     audio.play();
// }

// detecting button press
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        // this.style.color = "white";
        var letter = this.innerHTML;
        mixSound(letter);
        buttonAnimation(letter);
    });
}

// detecting keyboard press
document.addEventListener("keypress", function (event) {
    mixSound(event.key);
    buttonAnimation(event.key);
});

function mixSound(key) {
    switch (key) {
        case "w": var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;

        case "a": var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;

        case "s": var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;

        case "d": var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;

        case "j": var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;

        case "k": var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;

        case "l": var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;

        default: console.log(key);
    }
}

function buttonAnimation(currentKey) {
    var activeKey = document.querySelector("." + currentKey);
    activeKey.classList.add("pressed");
    setTimeout(function () {
        activeKey.classList.remove("pressed");
    }, 100);
}