const startBtn = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timeCounterEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#92374d', '#8c5383', '#4a5899', '#559cad', '#c1b2ab', '#129490', '#e0a890', '#065143'];
let timeCounter = 0;
let gameScore = 0;

const endGame = () => {
    timeCounterEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Cчет: <span class='primary'>${gameScore}</span></h1>`;
};

const setTime = (time) => {
    timeCounterEl.innerHTML = `00:${time}`;
};

const getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const getRandomColor = () => {
    const colorIndex = Math.floor(Math.random() * colors.length);
    return colors[colorIndex];
};

const createRandomCircle = () => {
    const circle = document.createElement('div');
    let circleSize = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - circleSize);
    const y = getRandomNumber(0, height - circleSize);

    circle.classList.add('circle');

    circle.style.background = `linear-gradient(90deg, ${getRandomColor()} 0%, ${getRandomColor()} 47%, ${getRandomColor()} 100%)`;
    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;
    circle.style.top = `${x}px`;
    circle.style.left = `${y}px`;

    board.append(circle);
};

const decreaseTime = () => {
    if (timeCounter === 0) {
        endGame();
    } else {
        let current = --timeCounter;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
};

const startGame = () => {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(timeCounter);
};

startBtn.addEventListener('click', event => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        timeCounter = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        gameScore++;
        event.target.remove();
        createRandomCircle();
    }
});
