let timerInterval;
let startTime;
let elapsedTime = 0;
const scrambleInput = document.getElementById('scramble-input');
const startTimerBtn = document.getElementById('start-timer');
const stopTimerBtn = document.getElementById('stop-timer');
const timeDisplay = document.getElementById('time');
const resultsList = document.getElementById('results-list');
const generateScrambleBtn = document.getElementById('generate-scramble');

startTimerBtn.addEventListener('click', startTimer);
stopTimerBtn.addEventListener('click', stopTimer);
generateScrambleBtn.addEventListener('click', generateScramble);

function startTimer() {
    const scramble = scrambleInput.value.trim();
    if (scramble === "") {
        alert("Please enter a scramble.");
        return;
    }

    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10);
    startTimerBtn.disabled = true;
    stopTimerBtn.disabled = false;
    scrambleInput.disabled = true;
}

function updateTimer() {
    elapsedTime = (Date.now() - startTime) / 1000;
    timeDisplay.textContent = elapsedTime.toFixed(2);
}

function stopTimer() {
    clearInterval(timerInterval);
    stopTimerBtn.disabled = true;
    startTimerBtn.disabled = false;
    scrambleInput.disabled = false;
    logResult(scrambleInput.value.trim(), elapsedTime.toFixed(2));
    scrambleInput.value = "";
    timeDisplay.textContent = "0.00";
}

function logResult(scramble, time) {
    const li = document.createElement('li');
    li.textContent = `Time: ${time} seconds - Scramble: ${scramble}`;
    resultsList.appendChild(li);
}

function generateScramble() {
    const moves = ["U", "U'", "U2", "R", "R'", "R2", "F", "F'", "F2"];
    let scramble = [];
    let lastMove = null;

    for (let i = 0; i < 9; i++) {
        let newMove;
        do {
            newMove = moves[Math.floor(Math.random() * moves.length)];
        } while (newMove[0] === lastMove);  // Avoid consecutive moves on the same face
        scramble.push(newMove);
        lastMove = newMove[0];
    }

    scrambleInput.value = scramble.join(" ");
}
