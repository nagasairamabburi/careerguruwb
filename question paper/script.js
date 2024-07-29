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
  
  // Get a reference to the Realtime Database
  var db = firebase.database();
  
  
  // Get the user input and output elements
  var userInput = document.getElementById('user-input');
  var output = document.getElementById('output');
  
  // Function to submit user input to database
  function submitInput() {
    var text = userInput.value;
    db.ref('user_input').push({
      text: text
    });
    userInput.value = '';
  }
  
  // Function to read data from database
  function readData() {
    db.ref('user_input').on('value', function(data) {
      output.innerHTML = '';
      data.forEach(function(childData) {
        var text = childData.val().text;
        output.innerHTML += '<p>' + text + '</p>';
      });
    });
  }
  
  // Add event listener to submit button
  document.getElementById('submit-btn').addEventListener('click', submitInput);
  
  // Read data from database on page load
  readData();
  db.collection("dream role exam").add({
    name: "Dream role exam",
    date: "",
    questions: [
      {
        question: "What is the value of x?",
        answers: ["A", "B", "C", "D"],
        correctAnswer: "A"
      },
      {
        question: "What is the value of y?",
        answers: ["A", "B", "C", "D"],
        correctAnswer: "B"
      }
    ]
  })
  .then((docRef) => {
    console.log("Exam data added successfully");
  })
  .catch((error) => {
    console.error("Error adding exam data: ", error);
  });

  // Set the timer duration in seconds
// Retrieve the timer state from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const storedTimerState = urlParams.get('timerState');
if (storedTimerState) {
  timer = JSON.parse(storedTimerState);
  startTimer();
}
 