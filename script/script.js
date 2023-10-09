// const inputcontainer = document.getElementById("input-container");
// const countDownForm = document.getElementById("countdown-form");
// const dateEl = document.getElementById("date-picker");

// const countdownEl = document.getElementById("countdown");
// const countdownElTitle = document.getElementById("count-down-title");
// const countdownBtn = document.getElementById('count-down-button');
// const timeElements = document.querySelectorAll('span');

// const completeEl = document.getElementById('complete');
// const completeElInfo = document.getElementById('complete-info');
// const completeBtn = document.getElementById('complete-button');

// // const saveCountDown = [];

// let countDownValue = 0 ;
// let countdownTitle = "";
// let countDownDate = "";
// let savedCountdown;
// let countdownActive;

// const second = 1000;
//     const minute = second * 60;
// const hour = minute * 60;
// const day = hour * 24;

// // Set Input With Date
// const today = new Date().toISOString().split("T")[0];
// dateEl.setAttribute("min", today);

// // Update DOM
// function updateDOM() {
//     countdownActive = setInterval(() => {
//         const now = new Date().getTime();
//         const distance = countDownValue - now;
//           const days = Math.floor(distance / day);
//           const hours = Math.floor((distance % day) / hour);
//           const minutes = Math.floor((distance % hour) / minute);
//           const seconds = Math.floor((distance % minute) / second);
//         // Hide Input
//         inputcontainer.hidden = true;
//         // If the countdown has ended, show final state
//         if (distance < 0) {
//           countdownEl.hidden = true;
//           clearInterval(countdownActive);
//           completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
//           completeEl.hidden = false;
//         } else {
//           // else, show the countdown in progress
//           countdownElTitle.textContent = `${countdownTitle}`;
//           timeElements[0].textContent = `${days}`;
//           timeElements[1].textContent = `${hours}`;
//           timeElements[2].textContent = `${minutes}`;
//           timeElements[3].textContent = `${seconds}`;
//           completeEl.hidden = true;
//           countdownEl.hidden = false;
//         }
//       }, second);
    
// }
// // Event Listerner
// function updateCountDown(e) {
//     e.preventDefault();
//     countdownTitle = e.srcElement[0].value;
//     countDownDate = e.srcElement[1].value;
//     console.log(countDownDate, countdownTitle);
//     // Get Number version of current date
//     countDownValue = new Date(countDownDate).getTime();
//     console.log("Current Time", countDownValue)

//     savedCountdown = {
//         title :countdownTitle,
//         date: countDownDate,
//     }

//     localStorage.setItem("countDown", JSON.stringify(savedCountdown));
//     if (countDownDate === '') {
//         alert("Please enter a date")
//     } else {
//         countDownValue = new Date(countDownDate).getTime();
//         console.log("Current Time", countDownValue)
//     }
//     updateDOM();
// }

// // RESET

// function reset() {
//     countdownEl.hidden = true;
//     inputcontainer.hidden = false;
//     clearInterval(countdownActive);
//     countdownTitle = '';
//     countDownDate ='';
//     localStorage.removeItem('countdown');
// }
// function restorePreviousCountdown() {
//     if (localStorage.getItem('countdown')) {
//         inputcontainer.hidden = true; 
//         savedCountdown = JSON.parse(localStorage.getItem('countdown'));
//         countdownTitle = savedCountdown.title;
//         countDownDate = savedCountdown.date;
//         countDownValue = new Date(countDownDate).getTime();
//         updateDOM();
//       }
// }
// countDownForm.addEventListener("submit", updateCountDown);
// countdownBtn.addEventListener("click", reset)

// restorePreviousCountdown();

const countdownForm = document.getElementById('countdown-form');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('count-down-title');
const countdownBtn = document.getElementById('count-down-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min & Value with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour);
      const minutes = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);
    // Hide Input
    inputContainer.hidden = true;
    // If the countdown has ended, show final state
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // else, show the countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

function updateCountdown(e) {
  e.preventDefault();
  // Set title and date, save to localStorage
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  // Check if no date entered
  if (countdownDate === '') {
    alert('Please select a date for the countdown.');
  } else {
    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

function reset() {
  // Hide countdowns, show input form
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  // Stop the countdown
  clearInterval(countdownActive);
  // Reset values, remove localStorage item
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
  // Get countdown from localStorage if available
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true; 
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, check localStorage
restorePreviousCountdown();
