document.addEventListener('DOMContentLoaded', () => {
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    fetch('/questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        });

    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            showResults();
            return;
        }

        const question = questions[currentQuestionIndex];
        document.getElementById('question').innerText = question.question;
        const options = document.getElementById('options');
        options.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.addEventListener('click', () => handleAnswer(index));
            options.appendChild(button);
        });
    }

    function handleAnswer(selectedIndex) {
        if (selectedIndex === questions[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        showQuestion();
    }

    function showResults() {
        document.getElementById('app').innerHTML = `
            <h2>Your Score: ${score}/${questions.length}</h2>
            <button onclick="location.reload()">Retake Quiz</button>
        `;
    }
});

