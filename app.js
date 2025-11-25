// Dummy in-memory user store
var users = [];
var loggedInUser = null;

// Quiz Questions
var questions = [
  {question: "Which company developed JavaScript?", options:["Microsoft", "Sun Microsystems", "Netscape", "IBM"], ans:"Netscape"},
  {question: "Which array method adds an item to the end?", options:["push()", "pop()", "shift()", "unshift()"], ans:"push()"},
  {question: "What is the output of: typeof null?", options:["object", "null", "undefined", "string"], ans:"object"},
  {question: "Which operator is used for strict equality?", options:["==", "===", "=", "!="], ans:"==="},
  {question: "JavaScript runs in the ______.", options:["Browser", "TV", "Keyboard", "Speaker"], ans:"Browser"},
  {question: "Inside which HTML element do we put JavaScript?", options:["javascript", "script", "js", "code"], ans:"script"},
  {question: "What does DOM stand for?", options:["Document Object Model", "Data Object Method", "Desktop Oriented Mode", "Document Oriented Markup"], ans:"Document Object Model"},
  {question: "Which keyword declares a variable?", options:["var", "let", "const", "All of the above"], ans:"All of the above"},
  {question: "How do you write a comment in JavaScript?", options:["!-- comment --", "# comment", "// comment", "$ comment"], ans:"// comment"},
  {question: "What is JavaScript used for?", options:["Styling webpages", "Adding interactivity to webpages", "Storing data on servers", "Designing logos"], ans:"Adding interactivity to webpages"},
  {question: "What file extension does JavaScript use?", options:[".html", ".css", ".java", ".js"], ans:".js"},
  {question: "Which method shows a pop-up message?", options:["alert()", "show()", "popup()", "print()"], ans:"alert()"}
];

var index = 0;
var score = 0;
var selectedAnswers = [];

// Default profile image
const defaultProfileImage = './images/avator.jpg';

// Show signup form
function showSignup() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-form').style.display = 'block';
}

// Show login form
function showLogin() {
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

// Toggle password image
function togglePassword(inputId, img) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    img.src = "./images/eye hide.png";
  } else {
    input.type = "password";
    img.src = "./images/eye show.png";
  }
}

// Handle signup
function handleSignup() {
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  if (!name || !email || !password) {
    Swal.fire('Error', 'Please fill in all fields.', 'error');
    return;
  }

  if (users.find(u => u.email === email)) {
    Swal.fire('Oops!', 'User already exists. Please login.', 'warning');
    return;
  }

  users.push({ name, email, password, profileImage: defaultProfileImage });
  loggedInUser = { name, email, password, profileImage: defaultProfileImage };

  document.getElementById('profileImg').src = loggedInUser.profileImage;

  Swal.fire({
    icon: 'success',
    title: 'Signup Successful!',
    text: 'You will now start the quiz.',
    timer: 2000,
    showConfirmButton: false
  }).then(() => {
    showQuiz();
  });
}

// Handle login
function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    Swal.fire('Error', 'Please fill in all fields.', 'error');
    return;
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    Swal.fire('Error', 'Invalid email or password.', 'error');
    return;
  }

  loggedInUser = user;

  document.getElementById('profileImg').src = loggedInUser.profileImage || defaultProfileImage;

  Swal.fire({
    icon: 'success',
    title: 'Login Successful!',
    text: 'You will now start the quiz.',
    timer: 2000,
    showConfirmButton: false
  }).then(() => {
    showQuiz();
  });
}

// Show quiz
function showQuiz() {
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('quiz-wrapper').style.display = 'block';
  document.getElementById('navbar').style.display = 'flex';
  restartQuiz();
}

// Logout
function logout() {
  loggedInUser = null;
  document.getElementById('auth-container').style.display = 'block';
  document.getElementById('quiz-wrapper').style.display = 'none';
  document.getElementById('navbar').style.display = 'none';

  Swal.fire({
    icon: 'info',
    title: 'Logged Out',
    text: 'You have been logged out successfully.',
    timer: 1500,
    showConfirmButton: false
  });
}

// Render question
function renderQues() {
  var container = document.getElementById("container");

  if (index >= questions.length) {
    showResult();
    return;
  }

  let q = questions[index];
  let html = `
    <h3 class="text-center text-body-secondary">JavaScript Quiz</h3>
    <p class="fw-bold">${index + 1}. ${q.question}</p>
    <hr/>
  `;

  q.options.forEach(opt => {
    html += `<div class="options"><label><input type="radio" name="option" value="${opt}"> ${opt}</label></div>`;
  });

  html += `
    <div class="d-flex justify-content-between mt-4">
      <button id="prev" class="btn btn-primary" onclick="previousQuestion()">Previous</button>
      <button id="next" class="btn btn-success" onclick="nextQuestion()">
        ${index === questions.length - 1 ? 'Submit' : 'Next'}
      </button>
    </div>
  `;

  container.innerHTML = html;
  document.getElementById("prev").disabled = (index === 0);

  if (selectedAnswers[index]) {
    let opts = document.getElementsByName("option");
    opts.forEach(o => {
      if (o.value === selectedAnswers[index]) o.checked = true;
    });
  }
}

// Next Question
function nextQuestion() {
  let opts = document.getElementsByName("option");
  let selected = '';

  opts.forEach(o => { if (o.checked) selected = o.value; });

  if (selected === '') {
    Swal.fire('Please select an option before continuing.');
    return;
  }

  selectedAnswers[index] = selected;

  if (selected === questions[index].ans && !questions[index].counted) {
    score++;
    questions[index].counted = true;
  }

  index++;
  renderQues();
}

// Previous Question
function previousQuestion() {
  if (index > 0) index--;
  renderQues();
}

// Show result
function showResult() {
  document.getElementById("container").style.display = 'none';
  document.getElementById("result-container").style.display = 'block';

  let percent = ((score / questions.length) * 100).toFixed(2);
  let scoreText = `You scored ${score}/${questions.length} (${percent}%)`;

  if (percent >= 70) {
    scoreText = "🎉 Congratulations!<br>" + scoreText;
  } else {
    scoreText = "❌ You Failed.<br>" + scoreText;
    document.getElementById("score").style.color = "#dc3545";
  }

  document.getElementById("score").innerHTML = scoreText;
}

// Restart quiz
function restartQuiz() {
  index = 0;
  score = 0;
  selectedAnswers = [];
  questions.forEach(q => q.counted = false);

  document.getElementById("result-container").style.display = 'none';
  document.getElementById("container").style.display = 'block';

  renderQues();
}

// Show profile
function showProfile() {
  if (!loggedInUser) return;

  document.getElementById('profileName').innerText = loggedInUser.name || 'N/A';
  document.getElementById('profileEmail').innerText = loggedInUser.email || 'N/A';
  document.getElementById('profilePassword').innerText = loggedInUser.password ? '******' : 'N/A';

  var profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
  profileModal.show();
}
