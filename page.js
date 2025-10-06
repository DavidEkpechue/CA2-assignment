// Page construction JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Create the main heading
    const heading = document.createElement('h1');
    heading.textContent = 'In Brief';
    heading.style.cssText = `
        font-family: Arial, sans-serif;
        font-size: 48px;
        font-weight: bold;
        margin: 20px 0;
        color: #000;
    `;
    
    // Create the description paragraph
    const description = document.createElement('p');
    description.textContent = 'This is a very short page. It includes some text, an image and a list.';
    description.style.cssText = `
        font-family: Arial, sans-serif;
        font-size: 16px;
        margin: 20px 0;
        color: #000;
    `;
    
    // Create the RWAT image
    const image = document.createElement('img');
    image.src = 'https://jelena-vk-itt.github.io/jvk-tudt-notes/rwat/res/images/logo.png';
    image.alt = 'RWAT Logo';
    image.style.cssText = `
        display: block;
        margin: 20px 0;
        max-width: 200px;
        height: auto;
    `;
    
    // Create the TODO heading
    const todoHeading = document.createElement('h2');
    todoHeading.textContent = 'TODO';
    todoHeading.style.cssText = `
        font-family: Arial, sans-serif;
        font-size: 24px;
        font-weight: bold;
        margin: 30px 0 10px 0;
        color: #000;
    `;
    
    // Create the TODO list
    const todoList = document.createElement('ul');
    todoList.style.cssText = `
        font-family: Arial, sans-serif;
        font-size: 16px;
        margin: 10px 0;
        padding-left: 40px;
        color: #000;
    `;
    
    const todoItems = ['finish lab', 'practice', 'practice some more'];
    todoItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.style.marginBottom = '5px';
        todoList.appendChild(li);
    });
    
    // Add all elements to the body
    document.body.appendChild(heading);
    document.body.appendChild(description);
    document.body.appendChild(image);
    document.body.appendChild(todoHeading);
    document.body.appendChild(todoList);
    
    // Set body styles
    document.body.style.cssText = `
        margin: 20px;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        line-height: 1.4;
    `;
});