class WordReview {
    constructor() {
        this.currentIndex = 0;
        this.words = [];

        this.initializeElements();
        this.loadData();
    }

    initializeElements() {
        this.wordImage = document.getElementById('wordImage');
        this.currentWord = document.getElementById('currentWord');
        this.currentMeaning = document.getElementById('currentMeaning');
        this.currentSound = document.getElementById('currentSound');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
    }

    async loadData() {
        try {
            const response = await fetch('words.json');
            if (!response.ok) throw new Error('Network response was not ok');
            this.words = await response.json();
            this.bindEvents();
            this.updateDisplay();
        } catch (error) {
            console.error('Failed to load words.json:', error);
            this.words = [
                { "word": "いす", "meaning": "Chair", "sound": "isu", "image": "https://via.placeholder.com/150" }
            ];
            this.bindEvents();
            this.updateDisplay();
        }
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex - 1 + this.words.length) % this.words.length;
            this.updateDisplay();
        });

        this.nextBtn.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex + 1) % this.words.length;
            this.updateDisplay();
        });
    }

    updateDisplay() {
        const wordData = this.words[this.currentIndex];
        this.wordImage.src = wordData.image || 'https://via.placeholder.com/150';
        this.currentWord.textContent = wordData.word;
        this.currentMeaning.textContent = wordData.meaning;
        this.currentSound.textContent = wordData.sound;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WordReview();
});