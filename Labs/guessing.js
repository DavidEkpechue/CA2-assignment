// Guessing game JavaScript

let gameState = {
    isGameActive: false,
    correctBox: -1,
    attempts: 0,
    imageUrl: 'https://jelena-vk-itt.github.io/jvk-tudt-notes/rwat/res/images/logo.png'
};

document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.box');
    const startButton = document.querySelector('button');
    const messageElement = document.getElementById('msg');
    
    // Style the page
    styleElements();
    
    // Add event listeners
    startButton.addEventListener('click', startGame);
    
    boxes.forEach((box, index) => {
        box.addEventListener('click', () => handleBoxClick(index));
    });
    
    function styleElements() {
        // Style the body
        document.body.style.cssText = `
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        `;
        
        // Style the container
        const container = document.querySelector('.container');
        container.style.cssText = `
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
        `;
        
        // Style the boxes
        boxes.forEach(box => {
            box.style.cssText = `
                width: 150px;
                height: 150px;
                border: 3px solid #333;
                background-color: #fff;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                font-weight: bold;
                color: #666;
                transition: all 0.3s ease;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            `;
            
            // Add hover effect
            box.addEventListener('mouseenter', function() {
                if (gameState.isGameActive) {
                    this.style.backgroundColor = '#e3f2fd';
                    this.style.transform = 'scale(1.05)';
                }
            });
            
            box.addEventListener('mouseleave', function() {
                if (this.style.backgroundImage === '') {
                    this.style.backgroundColor = '#fff';
                    this.style.transform = 'scale(1)';
                }
            });
        });
        
        // Style the start button
        startButton.style.cssText = `
            padding: 15px 30px;
            font-size: 18px;
            font-weight: bold;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;
        
        startButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#45a049';
        });
        
        startButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#4CAF50';
        });
        
        // Style the message
        messageElement.style.cssText = `
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
            min-height: 30px;
            color: #333;
        `;
    }
    
    function startGame() {
        // Reset game state
        gameState.isGameActive = true;
        gameState.attempts = 0;
        gameState.correctBox = Math.floor(Math.random() * 3);
        
        // Clear all boxes
        boxes.forEach(box => {
            box.textContent = '';
            box.style.backgroundImage = '';
            box.style.backgroundColor = '#fff';
            box.style.color = '#666';
        });
        
        // Update message
        messageElement.textContent = 'Game started! Click on a box to guess where the picture is hidden.';
        messageElement.style.color = '#2196F3';
        
        // Update button text
        startButton.textContent = 'Restart';
        
        console.log(`Game started! Correct box is: ${gameState.correctBox}`);
    }
    
    function handleBoxClick(boxIndex) {
        if (!gameState.isGameActive) {
            messageElement.textContent = 'Click "Start" to begin a new game!';
            messageElement.style.color = '#ff9800';
            return;
        }
        
        gameState.attempts++;
        
        if (boxIndex === gameState.correctBox) {
            // Correct guess!
            const winningBox = boxes[boxIndex];
            winningBox.style.backgroundImage = `url(${gameState.imageUrl})`;
            winningBox.style.backgroundSize = 'contain';
            winningBox.style.backgroundRepeat = 'no-repeat';
            winningBox.style.backgroundPosition = 'center';
            winningBox.style.backgroundColor = '#c8e6c9';
            
            const attemptText = gameState.attempts === 1 ? 'try' : 'tries';
            messageElement.textContent = `Congratulations! You found the picture in ${gameState.attempts} ${attemptText}!`;
            messageElement.style.color = '#4CAF50';
            
            // End the game
            gameState.isGameActive = false;
            startButton.textContent = 'Start';
            
        } else {
            // Wrong guess
            const clickedBox = boxes[boxIndex];
            clickedBox.textContent = 'Not here';
            clickedBox.style.backgroundColor = '#ffcdd2';
            clickedBox.style.color = '#c62828';
            
            messageElement.textContent = `Try again! Attempts: ${gameState.attempts}`;
            messageElement.style.color = '#f44336';
        }
    }
    
    // Initial message
    messageElement.textContent = 'Click "Start" to begin the guessing game!';
    messageElement.style.color = '#666';
});