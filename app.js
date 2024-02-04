const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      {text: "Shark",correct: false},
      {text: "Blue Whale",correct: true},
      {text: "Elephant",correct: false},
      {text: "Giraffe",correct: false},
    ]
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      {text: "Vatican City",correct: true},
      {text: "Bhutan",correct: false},
      {text: "Nigeria",correct: false},
      {text: "Austria",correct: false},
    ]
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      {text: "Kalahari",correct: false},
      {text: "Gobi",correct: false},
      {text: "Sahara",correct: false},
      {text: "Antarctica",correct: true},
    ]
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      {text: "Asia",correct: false},
      {text: "Australia",correct: true},
      {text: "Arctic",correct: false},
      {text: "Europe",correct: false},
    ]
  },
  {
    question: "Which is the tallest animal?",
    answers: [
      {text: "lion",correct: false},
      {text: "Kangaroo",correct: false},
      {text: "Elephant",correct: false},
      {text: "Giraffe",correct: true},
    ]
  }
]

const questionElement = document.querySelector(".question")
const answerButtons = document.querySelector("#answer-buttons")
const nextButton = document.querySelector("#next-btn")

let currentQuestionIndex = 0
let score = 0

const startQuiz = () => {
  currentQuestionIndex = 0
  nextButton.innerHTML= "Next"
  showQuestion()
}


const showQuestion = () =>{
  resetState();
  let currentQuestion = questions[currentQuestionIndex]
  let questionNo = currentQuestionIndex + 1
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`

  currentQuestion.answers.forEach(answer =>{
    const btn = document.createElement("button")
    btn.innerHTML = answer.text
    btn.classList.add("btn")
    answerButtons.appendChild(btn)
    if (answer.correct) {
      btn.dataset.correct = answer.correct
    }
    btn.addEventListener("click", selectAnswer)
  })
}

const resetState = () =>{
  nextButton.style.display = "none"
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  };
}


const selectAnswer = (e) =>{
  const selectedBtn = e.target
  const isCorrect = selectedBtn.dataset.correct === 'true'
  if (isCorrect) {
    selectedBtn.classList.add("correct")
    score++
  }else {
    selectedBtn.classList.add("incorrect")
  }

  Array.from(answerButtons.children).forEach(btn =>{
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct")
    }
    btn.disabled = true
  })
  nextButton.style.display = "block"
}

const showScore = () =>{
  resetState()
  questionElement.innerHTML = ` You scored ${score} out of ${questions.length}!`
  questionElement.classList.remove("question")
  questionElement.classList.add("score")
  nextButton.innerHTML = `Play Again`
  nextButton.style.display ="block"
}


const handleNextBtn = () =>{
  currentQuestionIndex++
  if (currentQuestionIndex < questions.length) {
    showQuestion()
  }else{
    showScore()
  }
}

nextButton.addEventListener('click', ()=>{
  if (currentQuestionIndex < questions.length) {
    handleNextBtn()
  }else{
    startQuiz()
  }
})





 startQuiz()