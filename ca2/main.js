import {ShapeCard} from './shapecard.js';

class MemoryGame extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
        this.matchedPairs = 0;
    }

    connectedCallback() {
        // Get the template and add it to shadow DOM
        const template = document.getElementById('memory-game-template');
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Start the game
        this.setupGame();
    }

    setupGame() {
        // Get dimensions from attribute
        const dimensions = this.getAttribute('dimensions');
        const parts = dimensions.split('x');
        const rows = parseInt(parts[0]);
        const cols = parseInt(parts[1]);
        
        const totalCards = rows * cols;
        const uniqueCards = totalCards / 2;
        this.totalPairs = uniqueCards;

        // Set up the grid
        const gameBoard = this.shadowRoot.querySelector('.game-board');
        gameBoard.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
        gameBoard.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';

        // Generate unique cards with duplicates (pairs)
        gameBoard.innerHTML = ShapeCard.getUniqueRandomCardsAsHTML(uniqueCards, true);

        // Add click event listeners to flip cards
        const cards = this.shadowRoot.querySelectorAll('shape-card');
        cards.forEach(card => {
            card.addEventListener('click', () => this.handleCardClick(card));
        });
    }

    handleCardClick(card) {
        // Don't allow clicking if board is locked or card is already face up
        if (this.lockBoard || card.isFaceUp()) {
            return;
        }

        // Flip the card
        card.flip();

        // First card clicked
        if (!this.firstCard) {
            this.firstCard = card;
            return;
        }

        // Second card clicked
        this.secondCard = card;
        this.lockBoard = true;

        // Check if cards match
        this.checkForMatch();
    }

    checkForMatch() {
        const isMatch = this.firstCard.getAttribute('type') === this.secondCard.getAttribute('type') &&
                        this.firstCard.getAttribute('colour') === this.secondCard.getAttribute('colour');

        if (isMatch) {
            this.handleMatch();
        } else {
            this.handleMismatch();
        }
    }

    handleMatch() {
        console.log('Match found!');
        this.matchedPairs++;

        // Reset for next turn
        this.resetBoard();

        // Check if game is complete
        if (this.matchedPairs === this.totalPairs) {
            setTimeout(() => {
                alert('Congratulations! You won the game!');
            }, 500);
        }
    }

    handleMismatch() {
        console.log('Not a match');
        
        // Flip cards back after delay
        setTimeout(() => {
            this.firstCard.flip();
            this.secondCard.flip();
            this.resetBoard();
        }, 1000);
    }

    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    }
}

customElements.define('memory-game', MemoryGame);
