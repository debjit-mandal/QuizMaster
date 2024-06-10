import fetch from 'node-fetch';
import fs from 'fs';

// Category mappings based on Open Trivia Database category IDs
const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 17, name: "Science & Nature" },
    { id: 23, name: "History" },
    { id: 22, name: "Geography" },
    { id: 21, name: "Sports" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 14, name: "Entertainment: Television" },
    { id: 15, name: "Entertainment: Video Games" },
    { id: 16, name: "Entertainment: Board Games" },
    { id: 18, name: "Science: Computers" },
    { id: 19, name: "Science: Mathematics" },
    { id: 20, name: "Mythology" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    { id: 29, name: "Comics" },
    { id: 30, name: "Science: Gadgets" },
    { id: 31, name: "Japanese Anime & Manga" },
    { id: 32, name: "Cartoon & Animations" }
];

const fetchQuizData = async (categoryId, retryCount = 0) => {
    const url = `https://opentdb.com/api.php?amount=50&category=${categoryId}&type=multiple`;
    const maxRetries = 5; // Maximum number of retries

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 429 && retryCount < maxRetries) {
                const delay = Math.pow(2, retryCount) * 10000; // Exponential backoff, starting with 10 seconds
                console.log(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchQuizData(categoryId, retryCount + 1);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }
        const data = await response.json();
        if (!data.results) {
            throw new Error('No results in the API response');
        }
        return data.results;
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        return null; // Return null to explicitly indicate failure
    }
};

const generateQuizData = async () => {
    const delayBetweenRequests = 10000; // 10 seconds delay between requests
    let quizzes = [];

    for (const category of categories) {
        const questions = await fetchQuizData(category.id);
        if (!questions || questions.length === 0) {
            console.error(`No questions fetched for category ${category.name}`);
            continue;
        }
        const quiz = {
            title: category.name,
            questions: questions.map(q => ({
                question: q.question,
                options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
                correctOption: q.correct_answer
            }))
        };
        quizzes.push(quiz);
        console.log(`Quiz for category "${category.name}" fetched successfully.`);
        await new Promise(resolve => setTimeout(resolve, delayBetweenRequests)); // Add delay before the next request
    }

    if (quizzes.length === 0) {
        console.error('No quizzes generated. Please check the API and try again.');
        return;
    }

    try {
        fs.writeFileSync('data/quiz-data.json', JSON.stringify({ quizzes }, null, 2));
        console.log('Quiz data generated successfully.');
    } catch (error) {
        console.error('Error writing quiz data to file:', error);
    }
};

generateQuizData();
