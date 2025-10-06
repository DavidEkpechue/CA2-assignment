// Variable declarations: let, var, const
let movingBox;
var clickCount = 0;
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

// Algorithm: Get random color
const getRandomColor = () => {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

// Algorithm: Position element in center of page
const centerElement = () => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let boxWidth = movingBox.offsetWidth;
    let boxHeight = movingBox.offsetHeight;
    
    movingBox.style.left = (windowWidth - boxWidth) / 2 + 'px';
    movingBox.style.top = (windowHeight - boxHeight) / 2 + 'px';
};

// Web Storage API - Load position
function loadPosition() {
    let savedPosition = localStorage.getItem('boxPosition');
    if (savedPosition) {
        movingBox.className = 'moving-box ' + savedPosition;
    } else {
        centerElement(); // Use centering algorithm
    }
}

// Web Storage API - Save position  
function savePosition(position) {
    localStorage.setItem('boxPosition', position);
}

// Drag and Drop API setup
function setupDragAndDrop() {
    const dropZones = document.querySelectorAll('.drop-zone');
    
    // Set dragstart event using addEventListener
    movingBox.addEventListener('dragstart', (e) => {
        e.dataTransfer.effectAllowed = 'move';
        movingBox.style.opacity = '0.5';
    });
    
    // Set dragend event using addEventListener
    movingBox.addEventListener('dragend', (e) => {
        movingBox.style.opacity = '1';
    });
    
    // Setup each drop zone using forEach
    dropZones.forEach((zone) => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });
        
        zone.addEventListener('dragleave', (e) => {
            zone.classList.remove('drag-over');
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            
            const position = zone.getAttribute('data-position');
            movingBox.className = 'moving-box position-' + position;
            savePosition('position-' + position);
        });
    });
}

// Set click handler using addEventListener (from JavaScript, not HTML)
function setupClickHandler() {
    document.body.addEventListener('click', (e) => {
        if (e.target !== movingBox) {
            clickCount++; // Use var variable
            let randomColor = getRandomColor(); // Use arrow function
            document.body.style.backgroundColor = randomColor;
        }
    });
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    movingBox = document.getElementById('movingBox');
    loadPosition();
    setupDragAndDrop();
    setupClickHandler();
});