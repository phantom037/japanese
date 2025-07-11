class HiraganaQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.mistakes = [];
        this.questions = [];
        this.answered = false;
        
        this.initializeElements();
        this.bindEvents();
        this.setupQuiz();
    }
    
    initializeElements() {
        this.startScreen = document.getElementById('startScreen');
        this.quizScreen = document.getElementById('quizScreen');
        this.resultScreen = document.getElementById('resultScreen');
        this.startBtn = document.getElementById('startBtn');
        this.retryBtn = document.getElementById('retryBtn');
        this.reviewBtn = document.getElementById('reviewBtn');
        this.currentHiragana = document.getElementById('currentHiragana');
        this.optionButtons = document.querySelectorAll('.option-btn');
        this.feedback = document.getElementById('feedback');
        this.progressFill = document.getElementById('progressFill');
        this.questionCounter = document.getElementById('questionCounter');
        this.scoreCounter = document.getElementById('scoreCounter');
        this.gradeDisplay = document.getElementById('gradeDisplay');
        this.finalScore = document.getElementById('finalScore');
        this.mistakesList = document.getElementById('mistakesList');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.retryBtn.addEventListener('click', () => this.resetQuiz());
        this.reviewBtn.addEventListener('click', () => this.showReviewMode());
        
        this.optionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAnswer(e));
        });
    }
    
    setupQuiz() {
        this.questions = this.shuffleArray([...hiraganaArray]);
        this.currentQuestion = 0;
        this.score = 0;
        this.mistakes = [];
        this.answered = false;
        this.updateUI();
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    startQuiz() {
        this.showScreen('quiz');
        this.showQuestion();
    }
    
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        switch(screenName) {
            case 'start':
                this.startScreen.classList.add('active');
                break;
            case 'quiz':
                this.quizScreen.classList.add('active');
                break;
            case 'result':
                this.resultScreen.classList.add('active');
                break;
        }
    }
    
    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }
        
        const question = this.questions[this.currentQuestion];
        this.currentHiragana.textContent = question.character;
        this.answered = false;
        
        // Generate options
        const options = this.generateOptions(question.sound);
        
        // Update option buttons
        this.optionButtons.forEach((btn, index) => {
            btn.textContent = options[index];
            btn.className = 'option-btn';
            btn.disabled = false;
        });
        
        // Clear feedback
        this.feedback.textContent = '';
        this.feedback.className = 'feedback';
        
        // Update UI
        this.updateUI();
    }
    
    generateOptions(correctAnswer) {
        const options = [correctAnswer];
        
        // Add 3 wrong answers
        while (options.length < 4) {
            const randomSound = allSounds[Math.floor(Math.random() * allSounds.length)];
            if (!options.includes(randomSound)) {
                options.push(randomSound);
            }
        }
        
        return this.shuffleArray(options);
    }
    
    handleAnswer(e) {
        if (this.answered) return;
        
        this.answered = true;
        const selectedAnswer = e.target.textContent;
        const correctAnswer = this.questions[this.currentQuestion].sound;
        const isCorrect = selectedAnswer === correctAnswer;
        
        // Update button states
        this.optionButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            } else if (btn === e.target && !isCorrect) {
                btn.classList.add('wrong');
            }
        });
        
        // Show feedback
        if (isCorrect) {
            this.feedback.textContent = '✓ Correct!';
            this.feedback.className = 'feedback correct';
            this.score++;
        } else {
            this.feedback.textContent = `✗ Wrong! The correct answer is "${correctAnswer}"`;
            this.feedback.className = 'feedback wrong';
            this.mistakes.push({
                character: this.questions[this.currentQuestion].character,
                correctAnswer: correctAnswer,
                yourAnswer: selectedAnswer
            });
        }
        
        // Auto-advance after 2 seconds
        setTimeout(() => {
            this.currentQuestion++;
            this.showQuestion();
        }, 2000);
    }
    
    updateUI() {
        const progress = ((this.currentQuestion) / this.questions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        this.questionCounter.textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`;
        this.scoreCounter.textContent = `Score: ${this.score}`;
    }
    
    showResults() {
        this.showScreen('result');
        
        const percentage = (this.score / this.questions.length) * 100;
        const grade = this.calculateGrade(percentage);
        
        this.gradeDisplay.textContent = grade;
        this.finalScore.textContent = `${this.score}/${this.questions.length}`;
        
        // Show mistakes
        if (this.mistakes.length > 0) {
            this.mistakesList.innerHTML = `
                <h3>Mistakes to Review:</h3>
                ${this.mistakes.map(mistake => `
                    <div class="mistake-item">
                        <span class="mistake-hiragana">${mistake.character}</span>
                        <div class="mistake-details">
                            <div class="correct-answer">Correct: ${mistake.correctAnswer}</div>
                            <div class="your-answer">Your answer: ${mistake.yourAnswer}</div>
                        </div>
                    </div>
                `).join('')}
            `;
        } else {
            this.mistakesList.innerHTML = `
                <div style="text-align: center; padding: 20px; color: #28a745;">
                    <h3>🎉 Perfect Score!</h3>
                    <p>You got all questions correct!</p>
                </div>
            `;
        }
        
        // Hide review button if no mistakes
        this.reviewBtn.style.display = this.mistakes.length > 0 ? 'inline-block' : 'none';
    }
    
    calculateGrade(percentage) {
        if (percentage >= 95) return 'A+';
        if (percentage >= 90) return 'A';
        if (percentage >= 85) return 'A-';
        if (percentage >= 80) return 'B+';
        if (percentage >= 75) return 'B';
        if (percentage >= 70) return 'B-';
        if (percentage >= 65) return 'C+';
        if (percentage >= 60) return 'C';
        if (percentage >= 55) return 'C-';
        if (percentage >= 50) return 'D';
        return 'F';
    }
    
    resetQuiz() {
        this.setupQuiz();
        this.showScreen('start');
    }
    
    showReviewMode() {
        // Create a new quiz with only the mistakes
        if (this.mistakes.length === 0) return;
        
        this.questions = this.mistakes.map(mistake => ({
            character: mistake.character,
            sound: mistake.correctAnswer
        }));
        
        this.currentQuestion = 0;
        this.score = 0;
        this.mistakes = [];
        this.answered = false;
        
        this.showScreen('quiz');
        this.showQuestion();
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new HiraganaQuiz();
});