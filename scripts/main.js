document.addEventListener('DOMContentLoaded', () => {
    fetch('data/quiz-data.json')
        .then(response => response.json())
        .then(data => {
            const quizList = document.getElementById('quiz-list');
            data.quizzes.forEach((quiz, index) => {
                const quizItem = document.createElement('div');
                quizItem.classList.add('quiz-item');
                quizItem.innerHTML = `
                    <h2>${quiz.title}</h2>
                    <label for="question-count-${index}">Number of Questions:</label>
                    <select id="question-count-${index}" class="question-count">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <button onclick="startQuiz(${index})">Start Quiz</button>
                `;
                quizList.appendChild(quizItem);
            });
        });
});

function startQuiz(index) {
    const questionCount = document.getElementById(`question-count-${index}`).value;
    localStorage.setItem('currentQuiz', index);
    localStorage.setItem('questionCount', questionCount);
    window.location.href = 'quiz.html';
}
