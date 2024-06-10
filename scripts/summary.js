document.addEventListener('DOMContentLoaded', () => {
    const score = localStorage.getItem('score');
    const time = localStorage.getItem('time');
    const quizData = JSON.parse(localStorage.getItem('quizData'));
    const summaryContainer = document.getElementById('summary-container');
    const correctAnswersContainer = document.getElementById('correct-answers');

    summaryContainer.innerHTML = `
        <p>Your score: ${score}</p>
        <p>Your time: ${time} seconds</p>
    `;

    quizData.questions.forEach((question, index) => {
        const answerItem = document.createElement('div');
        answerItem.innerHTML = `
            <p>Q${index + 1}: ${question.question}</p>
            <p class="correct">Correct Answer: ${question.correctOption}</p>
        `;
        correctAnswersContainer.appendChild(answerItem);
    });

    saveHighScore(score, time);

    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
});

function saveHighScore(score, time) {
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ score, time });
    highScores.sort((a, b) => b.score - a.score || a.time - b.time);
    highScores = highScores.slice(0, 10);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}
