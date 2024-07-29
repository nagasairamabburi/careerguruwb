// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBBRzi40DS9hnrPvnIemI6SSur34z8nIHw",
  authDomain: "careercrew-ca56d.firebaseapp.com",
  databaseURL: "https://careercrew-ca56d-default-rtdb.firebaseio.com",
  projectId: "careercrew-ca56d",
  storageBucket: "careercrew-ca56d.appspot.com",
  messagingSenderId: "756903487544",
  appId: "1:756903487544:web:a2c885de740a7a65039ecd",
  measurementId: "G-7LRBZ7CFXX"
};
  firebase.initializeApp(firebaseConfig);
  
  // Get the input elements and button
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const submitButton = document.getElementById('submit-button');
  const resultElement = document.getElementById('result');
  
  // Add event listener to the submit button
  submitButton.addEventListener('click', handleSubmit);
  
  // Function to handle form submission
  function handleSubmit() {
    let selectedAnswer;
    radioButtons.forEach((radioButton) => {
      if (radioButton.checked) {
        selectedAnswer = radioButton.value;
      }
    });
    console.log(`Selected answer: ${selectedAnswer}`);
  
    // Submit the answer to Firebase
    firebase.database().ref('answers').push({
      answer: selectedAnswer
    })
    .then(() => {
      console.log('Answer submitted successfully!');
      resultElement.textContent = 'Answer submitted successfully!';
    })
    .catch((error) => {
      console.error('Error submitting answer:', error);
      resultElement.textContent = 'Error submitting answer!';
    });
  }
  

  // Set the timer duration in seconds
const timerDuration = 60 * 60; // 1 hour

// Get the timer div
const timerDiv = document.getElementById('timer');

// Initialize the timer
let timer = {
  startTime: null,
  elapsedTime: 0,
  intervalId: null
};

// Function to start the timer
function startTimer() {
  // Get the current time
  const currentTime = new Date().getTime();

  // If the timer is already running, calculate the elapsed time
  if (timer.startTime) {
    timer.elapsedTime = (currentTime - timer.startTime) / 1000;
  } else {
    // Otherwise, set the start time
    timer.startTime = currentTime;
  }

  // Update the timer display
  updateTimerDisplay();

  // Set the interval to update the timer every second
  timer.intervalId = setInterval(updateTimer, 1000);
}

// Function to update the timer display
function updateTimerDisplay() {
  // Calculate the remaining time
  const remainingTime = timerDuration - timer.elapsedTime;

  // Format the remaining time as HH:MM:SS
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = Math.floor(remainingTime % 60);

  // Update the timer display
  timerDiv.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to update the timer
function updateTimer() {
  // Increment the elapsed time
  timer.elapsedTime++;

  // Update the timer display
  updateTimerDisplay();

  // If the timer has expired, stop the interval
  if (timer.elapsedTime >= timerDuration) {
    clearInterval(timer.intervalId);
  }
}

// Start the timer
startTimer();

// Store the timer state in local storage
window.onbeforeunload = function() {
  localStorage.setItem('timerState', JSON.stringify(timer));
  //timer continue to next page
  const nextPageUrl = 'http://127.0.0.1:5500/index.html' + JSON.stringify(timer);
  window.location.href = nextPageUrl;
};


