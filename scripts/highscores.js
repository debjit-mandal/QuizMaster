document.addEventListener('DOMContentLoaded', () => {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const highscoresList = document.getElementById('highscores-list');
    highScores.forEach((scoreEntry, index) => {
        const scoreItem = document.createElement('div');
        scoreItem.classList.add('score-item');
        scoreItem.innerHTML = `
            <p>${index + 1}. Score: ${scoreEntry.score}, Time: ${scoreEntry.time} seconds</p>
        `;
        highscoresList.appendChild(scoreItem);
    });

    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
});
