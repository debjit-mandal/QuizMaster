let currentQuizIndex = localStorage.getItem('currentQuiz');
let currentQuestionIndex = 0;
let score = 0;
let time = 60;
let timer;
let quizData;
let questionCount = localStorage.getItem('questionCount');

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/quiz-data.json')
        .then(response => response.json())
        .then(data => {
            quizData = data.quizzes[currentQuizIndex];
            shuffleArray(quizData.questions);
            quizData.questions = quizData.questions.slice(0, questionCount);
            document.getElementById('total-questions').innerText = quizData.questions.length;
            displayQuestion(quizData.questions[currentQuestionIndex]);
            startTimer();
        });
});

function displayQuestion(question) {
    document.getElementById('current-question').innerText = currentQuestionIndex + 1;
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    questionContainer.innerHTML = `<h2>${question.question}</h2>`;
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.innerHTML = option;
        optionButton.classList.add('option-button');
        optionButton.onclick = () => checkAnswer(optionButton, index, question.correctOption);
        optionsContainer.appendChild(optionButton);
    });
}

function checkAnswer(button, selectedIndex, correctAnswer) {
    const options = document.querySelectorAll('.option-button');
    options.forEach(option => option.disabled = true);
    const correctIndex = [...options].findIndex(option => option.innerText === correctAnswer);
    if (selectedIndex === correctIndex) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
        options[correctIndex].classList.add('correct');
    }
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.questions.length) {
        displayQuestion(quizData.questions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        document.getElementById('time').innerText = time;
        if (time <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    localStorage.setItem('score', score);
    localStorage.setItem('time', 60 - time);
    localStorage.setItem('quizData', JSON.stringify(quizData));
    window.location.href = 'summary.html';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
