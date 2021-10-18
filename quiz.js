const quizQuestions = document.getElementsByClassName("question");
const correctAnswers = document.getElementsByClassName("correct-answer");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const quizOptions = document.querySelectorAll("input[type=radio]");

let buttonChecked = false;
let currentQuestion = 0;
let count = 0;
let currentScore = 0;

function showQuestion() {
  //selects all the current question answers
  const currentQuestionAnswers = document.querySelectorAll(
    ".question.active .radio-btn"
  );
  //loop through those
  for (let answer of currentQuestionAnswers) {
    if (answer.checked) {
      buttonChecked = true;
    }
  }

  //apparently we don't need this any longer
  // for (let i = 0; i < quizQuestions.length; i++) {
  //   if (quizOptions[i].checked) {
  //     buttonChecked = true;
  //   }
  // }

  if (buttonChecked === false) {
    alert("Please select an answer to proceed");
  } else {
    quizQuestions[currentQuestion].classList.remove("active");
    quizQuestions[currentQuestion].classList.add("hideme");
    quizQuestions[currentQuestion + 1].classList.remove("hideme");
    quizQuestions[currentQuestion + 1].classList.add("active");

    currentQuestion++;
    document.getElementById("question-number").innerText = `Question ${
      currentQuestion + 1
    } of 3`;
  }

  buttonChecked = false;
}

function btnDisplay() {
  if (currentQuestion === 0) {
    backBtn.style.display = "none";
    console.log(currentQuestion);
  } else {
    backBtn.style.display = "inline-block";
  }

  if (currentQuestion === quizQuestions.length - 2) {
    nextBtn.textContent = "submit";
    var btnStyles = {
      background: "red",
      color: "black",
      "font-weight": "bold",
      "font-size": "15px",
    };
    for (var key in btnStyles) {
      nextBtn.style[key] = btnStyles[key];
    }
  } else if (currentQuestion === quizQuestions.length - 1) {
    nextBtn.classList.add("hideme");
  }
}

function keepScore() {
  if (correctAnswers[count].checked) {
    currentScore++;
    //don't need the double incrementation
    // count++;
  }
  count++;
  if (currentQuestion === 3) {
    document.getElementById(
      "question-number"
    ).innerText = `Final Score: ${currentScore} of 3`;
  }
}

function showPreviousQuestion() {
  quizQuestions[currentQuestion].classList.add("hideme");
  quizQuestions[currentQuestion - 1].classList.remove("hideme");
  currentQuestion--;
  document.getElementById("question-number").innerText = `Question ${
    currentQuestion + 1
  } of 3`;
  btnDisplay();
  count--;
}

nextBtn.addEventListener("click", function () {
  showQuestion();
  keepScore();
  btnDisplay();
});
backBtn.addEventListener("click", showPreviousQuestion);
