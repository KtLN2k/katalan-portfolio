function getSum() {
    let correctAnswers = 0;
    
    document.querySelector('.section1').innerHTML = `
        <h1>משחק חשבון</h1>
        <div id="question-container"></div>
        <div id="result-container"></div>
    `;
    
    let currentQuestion = 0;
    showQuestion();
    
    function showQuestion() {
        if (currentQuestion < 10) {
            let num1 = Math.floor(Math.random() * 10) + 1;
            let num2 = Math.floor(Math.random() * 10) + 1;
            let operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
            let correctResult;
            
            if (operator === '+') correctResult = num1 + num2;
            else if (operator === '-') correctResult = num1 - num2;
            else if (operator === '*') correctResult = num1 * num2;
            
            document.getElementById('question-container').innerHTML = `
                <div class="question">
                    <h2>שאלה ${currentQuestion + 1} מתוך 10</h2>
                    <p>כמה זה ${num1} ${operator} ${num2}?</p>
                    <input type="number" id="answer-input">
                    <button onclick="checkAnswer(${correctResult})" class="submit-btn">בדוק תשובה</button>
                </div>
            `;
        } else {
            document.querySelector('.section1').innerHTML = `
                <h1>סיימת!</h1>
                <h2>ענית נכון על ${correctAnswers} שאלות מתוך 10!</h2>
                <button onclick="getSum()">שחק שוב</button>
            `;
        }
    }
    
    window.checkAnswer = function(correctResult) {
        let userAnswer = parseInt(document.getElementById('answer-input').value);
        if (userAnswer === correctResult) {
            correctAnswers++;
        }
        currentQuestion++;
        showQuestion();
    }
}