// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "https://careercrew-ca56d-default-rtdb.firebaseio.com/",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signIn(email, password);
});

function signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("User signed in:", userCredential.user);
            fetchUserData(userCredential.user.uid);
        })
        .catch(error => {
            console.error("Error signing in:", error);
        });
}

function fetchUserData(userId) {
    const userRef = db.ref('users/' + userId);
    userRef.once('value')
        .then(snapshot => {
            const userData = snapshot.val();
            displayUserData(userData);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
        });
}

function displayUserData(userData) {
    document.getElementById('dream-role').textContent = userData.dreamRole;
    document.getElementById('dream-company').textContent = userData.dreamCompany;
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('welcome-section').style.display = 'block';
}

function submitExam() {
    const score = Math.floor(Math.random() * 100); // Simulating exam score
    const user = auth.currentUser;
    if (user) {
        const userRef = db.ref('users/' + user.uid);
        userRef.update({
            examScore: score
        }).then(() => {
            alert('Exam submitted! Your score: ' + score);
        }).catch(error => {
            console.error("Error submitting exam:", error);
        });
    } else {
        alert('No user is signed in.');
    }
}
