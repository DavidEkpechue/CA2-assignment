import {ShapeCard} from './shapecard.js';

class MemoryGame extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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

        // Set up the grid
        const gameBoard = this.shadowRoot.querySelector('.game-board');
        gameBoard.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
        gameBoard.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';

        // Generate unique cards with duplicates (pairs)
        gameBoard.innerHTML = ShapeCard.getUniqueRandomCardsAsHTML(uniqueCards, true);

        // Add click event listeners to flip cards
        this.shadowRoot.querySelectorAll('shape-card').forEach(sc => sc.addEventListener('click', e => {
            e.target.flip();
            console.log("Shape card is face up:", e.target.isFaceUp());
        }));
    }
}

customElements.define('memory-game', MemoryGame);
