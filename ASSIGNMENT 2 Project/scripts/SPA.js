import {CanvasController} from "./PLAY.js";

let SPAState={};
let readyState = 0;
window.onhashchange = switchToStateFromURLHash;
    
function switchToStateFromURLHash() {
    let URLHash = window.location.hash;
    let state = URLHash.substr(1);

    if (state !== '') {
        let parts = state.split("_");
        SPAState = {pageName: parts[0]};
    } else {
        SPAState = {pageName: 'Load'};
    }
    
    let menu = document.querySelector('.game__menu');
    let play = document.querySelector('.game__levels');
    let game = document.querySelector('.game__game-play');
    let localStorageName = localStorage.getItem('name');

    switch (SPAState.pageName) {
        case 'Menu':
            if (localStorageName) {
                play.classList.add('hidden');
                game.classList.add('hidden');
                menu.classList.remove('hidden');
            }
            break;

        case 'Play':
            if (localStorageName) {
                menu.classList.add('hidden');
                game.classList.add('hidden');
                play.classList.remove('hidden');
            }
            break;

        case 'Game' :
            if (localStorage) {
                menu.classList.add('hidden');
                play.classList.add('hidden');
                game.classList.remove('hidden');
            } else {
                game.classList.add('hidden');
            }
            break;
            
        case 'Load':
            menu.classList.add('hidden');
            play.classList.add('hidden');
            game.classList.add('hidden');
            break;
    }
}

function switchToState(newState) {
    location.hash = newState.pageName;
}

function switchToMenuPage() {
    switchToState({pageName: 'Menu'});
}

function switchToPlayPage() {
    switchToState({pageName: 'Play'});
}

function switchToGamePage() {
    switchToState({pageName: 'Game'});
}

function  run(run) {
    let oldHash = window.location.hash;

    if (readyState) {
        if (oldHash === '#Game') {
            location.hash = 'Play';
        } else if (oldHash && oldHash !== '#Game') {
            location.hash = oldHash.substr(1);
        } else {
            location.hash = 'Menu';
        }
    }

    let logo = document.querySelector('h1');
    logo.addEventListener('click', (eo) => {
        switchToMenuPage();
    });

    let buttonPlay = document.querySelector('.play__game');
    buttonPlay.addEventListener('click', () => {
        switchToPlayPage();
    });

    let buttonsLevel = document.querySelectorAll('.game__level-button');

    for (let i = 0; i < buttonsLevel.length; i++) {

        buttonsLevel[i].addEventListener('click', (eo) => {
            let div = document.getElementById('canvas');
            div.setAttribute('level', buttonsLevel[i].value);
            run();
            switchToGamePage();                
        });
    }
    switchToStateFromURLHash();
}

async function ready() {
    readyState = 1;
    return SPAState;
}

ready().then(SPAState => run(start));

function start() {
    let now;
    let delta;
    let then = Date.now();
    let interval = 1000 / 62;
    let canvasController = new CanvasController();

    function work() {
        requestAnimationFrame(work);
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);
            canvasController.draw();
        }
    }

    requestAnimationFrame(work);
}