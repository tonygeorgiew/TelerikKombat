let wrapper = document.getElementById('wrapper');
let mainContainer = document.getElementsByClassName('main-menu-container')[0];
let backgroundMenu = document.getElementsByClassName('backgrounds-container')[0];
let mainBackground = document.getElementsByClassName('menu-starting-img')[0];
let backButton = document.getElementById('back');
let chosseOtherButton = document.getElementById('chose-different');
let imageContainer = document.getElementsByClassName('background-imgs-container')[0];
let images = imageContainer.getElementsByTagName('td');
let canClick = true;
let site = 'MortalCombat.html';

//set default background for game
let imgSrc = mainBackground.src;

const RESULT_IMG = {
    src: imgSrc
};

wrapper.addEventListener('click', function(event) {
    let target = event.target;

    //When clicked on button "CHOOSE BACKGROUND"
    if (target.className == 'menu-item-content' && target.innerHTML == "CHOOSE BACKGROUND") {
        mainContainer.className += ' hidden';
        mainBackground.src = '../Telerik-Combat/assets/menu/background.jpg'
        backgroundMenu.style.display = 'block';
    }

    //WHEN clicked on image to choose what the background must be
    if (target.className == 'background-img' && canClick == true) {

        //get img src
        RESULT_IMG.src = target.src;
        let parent = target.parentElement;
        parent.style.backgroundColor = 'rebeccapurple';
        canClick = false;
    }

    //When new game pressed
    if (target.className == 'menu-item-content' && target.innerHTML == "NEW GAME") {
        if (RESULT_IMG.src.includes('apocalypse-1.jpg')) {
            window.location = './MortalCombatApocalypse.html';
        }
        if (RESULT_IMG.src.includes('dungeon-2.jpg')) {
            window.location = './MortalCombatDungeonTwo.html';
        }
        if (RESULT_IMG.src.includes('dungeon-one.jpg')) {
            window.location = './MortalCombatDungeonOne.html';
        }
        if (RESULT_IMG.src.includes('mortal.jpg')) {
            window.location = './MortalCombat.html';
        }
        if (RESULT_IMG.src.includes('sky.png')) {
            window.location = './MortalCombatSky.html';
        }
    }
});

backButton.addEventListener('click', function() {
    backgroundMenu.style.display = 'none';
    mainBackground.src = '../Telerik-Combat/assets/menu/Mortal-Kombat.jpg'
    mainContainer.classList.remove('hidden');
});

chosseOtherButton.addEventListener('click', function() {
    for (let i = 0; i < images.length; i += 1) {
        let currentTD = images[i];
        currentTD.style.backgroundColor = 'transparent';
        canClick = true;
    }
});