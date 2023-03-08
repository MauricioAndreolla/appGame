let height = 0;
let width = 0;

const easy = 2000;
const medium = 1500;
const hard = 1000;


let life = 3;
let segundos = 10;
let interval = null;
let intervalSetMosquito = null;

let ids = [];

function resizeDisplay() {
    height = window.innerHeight;
    width = window.innerWidth;
}

function createElement() {

    let randomHeight = randomValue(720, height);
    let randomWidth = randomValue(1820, width);

    let element = document.createElement("img");
    element.setAttribute("src", "./assets/mosca.png");
    element.width = 120;
    element.height = 100;
    element.style = `position: absolute; top: ${randomHeight}px; left: ${randomWidth}px;`;
    element.onclick = resetTimer;
    element.id = randomValue(50, 5000);

    ids.push(element.id);

    return element;

}


function app() {
    let difficulty = document.querySelector("#level").value;

    displayMenu(false);
    displayDisplay(true);

    displayTimer();

    if (difficulty === 0) {
        level(easy);
    } else if (difficulty === 1) {
        level(medium);
    } else {
        level(hard);
    }

}

function displayMenu(value) {
    let container = document.querySelector(".menu");
    if (value == true) {
        container.style = "display: flex;";
    } else {
        container.style = "display: none;";
    }
}

function displayDisplay(value) {
    let level = document.querySelector(".display");
    if (value == true) {
        level.style = "display: flex;";
    } else {
        level.style = "display: none;";
    }
}

function displayTimer() {
    interval = setInterval(() => {
        let time = document.querySelector("#timer");
        segundos = segundos - 1;
        time.innerHTML = segundos;

        if (life == 0) {
            endGame();
        }

        if (segundos <= 0) {
            resetTimerAndRemove();
        }
    }, 1000);
}

function removeElement() {
    let value;

    ids.forEach((id) => {
        value = document.getElementById(id);
        value.remove();
    });

    ids = [];
}

function stopTimer() {
    removeElement();
    segundos = 10;
    clearInterval(interval);
}

function resetTimer() {
    console.log("clicado");
    removeElement();
    clearInterval(interval);
    segundos = 10;
    displayTimer();
}

function resetTimerAndRemove() {
    if (life > 0) {
        segundos = 10;
        clearInterval(interval);
        displayTimer();
        removeHeart();
        life = life - 1;
    } else {
        endGame();
    }
}


function level(difficulty) {

    intervalSetMosquito = setInterval(() => {
        let element = createElement();
        document.body.append(element);
    }, difficulty);
}

function randomValue(min, max) {
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

function removeHeart() {

    if (life == 3) {
        let first = document.querySelector("#first");
        first.setAttribute("src", "./assets/coracao_vazio.png");
    } else if (life == 2) {
        let second = document.querySelector("#second");
        second.setAttribute("src", "./assets/coracao_vazio.png");
    } else if (life == 1) {
        let third = document.querySelector("#third");
        third.setAttribute("src", "./assets/coracao_vazio.png");
    }

}

function resetHeart() {
    let first = document.querySelector("#first");
    first.setAttribute("src", "./assets/coracao_cheio.png");

    let second = document.querySelector("#second");
    second.setAttribute("src", "./assets/coracao_cheio.png");

    let third = document.querySelector("#third");
    third.setAttribute("src", "./assets/coracao_cheio.png");

    life = 3;
}

function endGame() {
    stopTimer();
    clearInterval(intervalSetMosquito);
    alert("Fim de jogo");
    displayDisplay(false);
    displayMenu(true);
    resetHeart();
}

