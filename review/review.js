class HiraganaReview {
    constructor() {
        this.currentLine = 'a';
        this.currentIndex = 0;
        this.lines = {
            'a': ['あ', 'い', 'う', 'え', 'お'],
            'ka': ['か', 'き', 'く', 'け', 'こ'],
            'sa': ['さ', 'し', 'す', 'せ', 'そ'],
            'ta': ['た', 'ち', 'つ', 'て', 'と'],
            'na': ['な', 'に', 'ぬ', 'ね', 'の'],
            'ha': ['は', 'ひ', 'ふ', 'へ', 'ほ'],
            'ma': ['ま', 'み', 'む', 'め', 'も'],
            'ya': ['ゃ', 'ゅ', 'ょ']',
            'ra': ['ら', 'り', 'る', 'れ', 'ろ']
        };

        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }

    initializeElements() {
        this.lineSelect = document.getElementById('lineSelect');
        this.currentHiragana = document.getElementById('currentHiragana');
        this.currentSound = document.getElementById('currentSound');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
    }

    bindEvents() {
        this.lineSelect.addEventListener('change', (e) => {
            this.currentLine = e.target.value;
            this.currentIndex = 0;
            this.updateDisplay();
        });

        this.prevBtn.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex - 1 + 5) % 5;
            this.updateDisplay();
        });

        this.nextBtn.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex + 1) % 5;
            this.updateDisplay();
        });
    }

    updateDisplay() {
        const character = this.lines[this.currentLine][this.currentIndex];
        this.currentHiragana.textContent = character;
        this.currentSound.textContent = hiraganaData[character];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HiraganaReview();
});
