// Promise function that resolves with a value after a delay
function getNewPromise(value, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { 
            resolve(value);
        }, delay);
    });
}

// What does the new promise do?
// It promises to return the value specified by 'value', after the time specified by 'delay' (in milliseconds).
// The promise creates an asynchronous operation that waits for the specified delay before resolving with the value.

// Exercise 1
getNewPromise(" Promise Text after 2000ms", 2000)
    .then(value => {
        const p1 = document.createElement('p');
        p1.textContent = value;
        document.body.appendChild(p1);
    });

// Exercise 2
getNewPromise("dlrow olleh", 3000)
    .then(str => str.toUpperCase())  // First: change to uppercase
    .then(str => str.split('').reverse().join(''))  // Second: reverse the string
    .then(str => {  // Third: write to a second paragraph
        const p2 = document.createElement('p');
        p2.textContent = str;
        document.body.appendChild(p2);
    });

// Exercise 3: 

getNewPromise(42, 3000)
    .then(result => result * 2)  // 42 * 2 = 84
    .then(result => {
        getNewPromise(result + 16, 1000)  // 84 + 16 = 100
            .then(result => console.log("Nested result: ", result)) 
            .catch((e) => { })
        return result;  // Returns 84 to the next then
    })
    .then(result => console.log("Final result: ", result * -1))
    .catch((e) => console.error("Failed: ", e.message));

// What it does:
// 1. Creates a promise that resolves to 42 after 3 seconds
// 2. Multiplies by 2 to get 84
// 3. In the second then:
//    - Creates a nested promise with 84+16=100 that resolves after 1 second
//    - The nested promise logs "Nested result: 100" when it resolves
//    - But returns 84 (not the nested promise result) to the next then
// 4. Final then logs "Final result: -84"
// 5. The catch handles any errors in the chain

// Exercise 4: test the catch clause by throwing an exception

getNewPromise(42, 3000)
    .then(result => result * 2)
    .then(result => {
        throw new Error("Davids lab 5 assignment error lol ");  // Throw an exception
        return result;
    })
    .then(result => console.log("Final result: ", result * -1))
    .catch((e) => console.error("Failed: ", e.message));  //catch the error
