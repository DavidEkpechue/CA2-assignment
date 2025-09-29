let draggedElement = null;
let currentPosition = 'top-left';

document.addEventListener('DOMContentLoaded', function() {
    initializeDragAndDrop();
    initializeClickHandler();
    loadBoxPosition();
});

function initializeDragAndDrop() {
    const movingBox = document.getElementById('moving-box');
    const corners = document.querySelectorAll('.corner');

    movingBox.addEventListener('dragstart', handleDragStart);
    movingBox.addEventListener('dragend', handleDragEnd);

    corners.forEach(corner => {
        corner.addEventListener('dragover', handleDragOver);
        corner.addEventListener('dragenter', handleDragEnter);
        corner.addEventListener('dragleave', handleDragLeave);
        corner.addEventListener('drop', handleDrop);
    });
}

function initializeClickHandler() {
    document.body.addEventListener('click', function(event) {
        if (!event.target.closest('.moving-box')) {
            changeBackgroundColor();
        }
    });
}

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.target.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    
    document.querySelector('.moving-box').remove();
    document.querySelectorAll('.corner').forEach(corner => corner.classList.remove('has-box'));
    
    const newBox = document.createElement('div');
    newBox.className = 'moving-box';
    newBox.id = 'moving-box';
    newBox.draggable = true;
    newBox.textContent = 'Moving box';
    
    newBox.addEventListener('dragstart', handleDragStart);
    newBox.addEventListener('dragend', handleDragEnd);
    
    e.target.appendChild(newBox);
    e.target.classList.add('has-box');
    
    localStorage.setItem('movingBoxPosition', e.target.id);
}

function changeBackgroundColor() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2', '#A9DFBF', '#F9E79F', '#D5A6BD', '#AED6F1', '#F4D03F'];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

function loadBoxPosition() {
    const savedPosition = localStorage.getItem('movingBoxPosition');
    if (savedPosition) {
        document.querySelector('.moving-box').remove();
        document.querySelectorAll('.corner').forEach(corner => corner.classList.remove('has-box'));
        
        const newBox = document.createElement('div');
        newBox.className = 'moving-box';
        newBox.id = 'moving-box';
        newBox.draggable = true;
        newBox.textContent = 'Moving box';
        
        newBox.addEventListener('dragstart', handleDragStart);
        newBox.addEventListener('dragend', handleDragEnd);
        
        document.getElementById(savedPosition).appendChild(newBox);
        document.getElementById(savedPosition).classList.add('has-box');
    } else {
        document.getElementById('top-left').classList.add('has-box');
    }
}