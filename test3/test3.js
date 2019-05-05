// declare all 
const tds = document.querySelectorAll('.td');
const showMinutes = document.getElementById("minutes");
const showSeconds = document.getElementById("seconds");
const buttonStart = document.getElementById('button');

// array with color classes
const arrayColors = ['red', 'green', 'blue', 'yellow', 'purple', 'crimson', 'lime', 'orange', 'red', 'green', 'blue', 'yellow', 'purple', 'orange', 'lime', 'crimson'];

// function that get colors from array
const colorize = function setColorsToTds() {
    // get random number (position) from array length (16)
    const i = Math.floor(Math.random() * arrayColors.length);
    // get value of each element from array;
    const value = arrayColors[i];
    // remove value from the value position from array
    arrayColors.splice(i, 1);
    return value;
}

// function that start game
const gameStart = function addColorsAndCovers() {
    // get each td
    tds.forEach((el) => {
        // set colors to tds
        el.classList.add((colorize()));
        // then cover tds with white color
        el.classList.add('white');
    });
}

// when page loaded
document.addEventListener('DOMContentLoaded', () => {
    gameStart();
});

// count for 2 clicks
let count = 0;

// function to onclick attribute of td
function firstclick(el) {
    // first click
    if (count == 0) {
        // remove white cover from clicked td
        el.classList.remove('white');
        // prevent second click of already clicked td
        el.setAttribute("id", "clicked");
        el.removeAttribute("onclick", "firstclick(this)");

        // counting to 1 for second click
        count += 1;
    // second click
    } else {
        // declare first clicked td for further use
        const elClicked = document.getElementById('clicked');

        // check if first and second clicked tds have same color
        if (elClicked.classList[1] === el.classList[1]) {
            // remove white cover of second td
            el.classList.remove('white');
            // make unclickable first and second tds
            el.removeAttribute("onclick", "firstclick(this)");
            elClicked.removeAttribute("id", "clicked");

            const arrayTdsColors = [];
            // add classlist of td to array
            tds.forEach((el) => {
                arrayTdsColors.push(el.classList);
            })
            // array of all tds classlist
            const tdsArray = arrayTdsColors.join();

            // check if all tds have white cover
            if (tdsArray.includes('white') === false) {
                // stops timer
                clearInterval(interval);
                // show time for player
                alert('You won! Your time: ' + showMinutes.innerHTML + ':' + showSeconds.innerHTML);
                // message to player
                document.getElementById('result').innerHTML = 'Press F5 to start the game again';
            }

            // get back count to 0 for first click
            count = 0;
        // if first and second clicked haven't same color
        } else {
            // reveal color of second td
            el.classList.remove('white');
            // make clickable for first clicked td
            elClicked.setAttribute("onclick", "firstclick(this)");
            elClicked.removeAttribute("id", "clicked");
            // add white cover after 0.5 sec to first and second td
            setTimeout(function() {elClicked.classList.add('white')}, 500)
            setTimeout(function() {el.classList.add('white')}, 500);

            // get back count to 0 for first click
            count = 0;
        }
        
    }
}

// stopwatch didnt started
let seconds = 00; 
let minutes = 00;
let interval;

// reseting stopwatch function
const reset = function() {
    // stop stopwatch
    clearInterval(interval);
    // setting time to zero
    minutes = '00';
    seconds = '00';
    showMinutes.innerHTML = minutes;
    showSeconds.innerHTML = seconds;
}

// click Start button 
buttonStart.onclick = function() {
    // reset stopwatch every time
    reset();
    // start stopwatch
    //do function start every 1sec
    interval = setInterval(start, 1000);
}

// function that start stopwatch
const start = function startStopWatch() {
    //start counting seconds 
    seconds++; 

    // if 0-9sec add 0 to front 
    if (seconds < 10) {
        showSeconds.innerHTML = '0' + seconds;
    }

    // if 10-59sec
    if (seconds < 60 && seconds > 9) {
        showSeconds.innerHTML = seconds;
    }

    // if 60sec
    if (seconds > 59) {
        // start count min every time when 60sec
        minutes++
        // refresh seconds
        seconds = 0;
        showSeconds.innerHTML = '00';
    } 

    // if 1-9min add 0 to front
    if (minutes < 10 && minutes != 0) {
        showMinutes.innerHTML = '0' + minutes;
    }

    // if 10-60min
    if (minutes < 60 && minutes > 9) {
        showMinutes.innerHTML = minutes;
    }

    // if 60min than stop stopwatch
    if (minutes == 60 && seconds == 0) {
        clearInterval(interval);
    }
}  
