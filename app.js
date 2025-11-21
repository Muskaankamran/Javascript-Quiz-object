var javascriptQuiz ={
   'question No 1':{
      text: "Which company developed JavaScript?",
      choices:  ["Microsoft" ,   "Sun Microsystems" ,  " Netscape" , "IBM "] ,
      correct: "Netscape",
   },
   'question No 2':{
    text: "Which array method adds an item to the end?",
    choices:  ["push()" ,   "pop()" ,  "shift() " , " unshift()"] ,
    correct: "push()",
 },
 'question No 3':{
    text: "What is the output of: typeof null?",
    choices:  ["object" ,   "null" ,  "undefined" , " string"] ,
    correct: "object",
 },
 'question No 4':{
    text: "Which operator is used for strict equality?",
    choices:  ["==" ,   "===" ,  "= " , " !="] ,
    correct: "===",
 },
 'question No 5':{
    text: "JavaScript runs in the ______.",
    choices:  ["Browser" ,   "TV" ,  "Keyboard" , "Speaker"] ,
    correct: "",
 },
 'question No 6':{
    text: "Inside which HTML element do we put JavaScript?",
    choices:  ["<javascript>" ,   "<script>" ,  "<js> " , " <code>"] ,
    correct: "<script>",
 },
 'question No 7':{
    text: "What does DOM stand for?",
    choices:  ["Document Object Model" ,   "Data Object Method" ,  "Desktop Oriented Mode " , "Document Oriented Markup"] ,
    correct: "Document Object Model",
 },
 'question No 8':{
    text: "Which keyword declares a variable?",
    choices:  ["var" ,   "let" ,  " const" , " All of the above"] ,
    correct: "All of the above",
 },
 'question No 9':{
    text: "How do you write a comment in JavaScript?",
    choices:  ["<!-- comment -->" ,   "# comment" ,  "// comment " , "$ comment "] ,
    correct: "// comment ",
 },
 'question No 10':{
    text: "What is JavaScript used for?",
    choices:  ["Styling webpages" ,   "Adding interactivity to webpages" ,  "Storing data on servers " , " Designing logos"] ,
    correct: "Adding interactivity to webpages",
 },
 'question No 11':{
    text: "What file extension does JavaScript use?",
    choices:  [".html" ,   ".css" ,  ".java " , " .js"] ,
    correct: ".js",
 },
 'question No 12':{
    text: "Which method shows a pop-up message?",
    choices:  ["alert()" ,   "show()" ,  "popup() " , "print() "] ,
    correct: "",
 },
}

var keys = Object.keys(javascriptQuiz);
var index = 0;
var score = 0;

function loadQuestion() {
    let qKey = keys[index];
    let qData = javascriptQuiz[qKey];

    document.getElementById("qTitle").innerText = qKey;
    document.getElementById("qText").innerText = qData.text;

    let choicesHtml = "";
    qData.choices.forEach((choice, i) => {
        choicesHtml += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="answer" id="option${i}" value="${choice}">
                <label class="form-check-label" for="option${i}">${choice}</label>
            </div>
        `;
    });

    document.getElementById("qChoices").innerHTML = choicesHtml;
}

document.getElementById("nextBtn").addEventListener("click", () => {
    let selected = document.querySelector("input[name='answer']:checked");
    if(!selected) {
        Swal.fire({
         title: 'Select an answer',
         theme: 'dark'
         
       })
        return;
    }
    let correctAnswer = javascriptQuiz[keys[index]].correct;
    if(selected.value === correctAnswer) score++;
    index++;
    if(index < keys.length){
        loadQuestion();
    } else {
        document.getElementById("qTitle").innerText = "Quiz Completed!";
        document.getElementById("qText").innerText = `Your Score: ${score} / ${keys.length}`;
        document.getElementById("qChoices").innerHTML = "";
        document.getElementById("nextBtn").style.display = "none";
    }
});
loadQuestion();
  