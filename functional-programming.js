// Student data as JSON string
const STUDENT_DATA_JSON = '[' + 
'{"name": "Annie Apple","id": "X00111111","address": "Phibsboro, D7","grades": [60, 71, 55, 53, 44, 62]},' + 
'{"name": "Ben Bounce","id": "B00111111","address": "Rathmines, D6","grades": [44, 22, 77, 33, 41, 50]},' +
'{"name": "Charlie Curry","id": "B00222222","address": "Phibsboro, D7","grades": [80, 88, 75, 81, 90, 77]},' +
'{"name": "Dan Dreamer","id": "X00222222","address": "Cabra, D7","grades": [64, 55, 66, 65, 78, 62]},' +
'{"name": "Emmy Ember","id": "X00333333","address": "Stoneybatter, D7","grades": [53, 55, 55, 52, 51, 60]},' +
'{"name": "Fiona Falls","id": "C00111111","address": "Grangegorman, D7","grades": [90, 91, 88, 80, 81, 97]},' +
'{"name": "Georgina Gull","id": "C00222222","address": "City Centre, D1","grades": [76, 67, 63, 71, 55, 82]},' +
'{"name": "Harry Hops","id": "C00333333","address": "Cabra, D7","grades": [50, 33, 55, 11, 42, 61]},' +
'{"name": "Iris Indie","id": "X00444444","address": "Tallaght, D24","grades": [61, 71, 58, 70, 65, 67]},' +
'{"name": "Jack Jobs","id": "C00444444","address": "Phibsboro, D7","grades": [60, 71, 55, 53, 44, 62]},' +
'{"name": "Kat Kid","id": "C00555555","address": "Grangegorman, D7","grades": [41, 41, 50, 48, 55, 44]},' +
'{"name": "Lula Lock","id": "C00666666","address": "Cabra, D7","grades": [77, 80, 85, 80, 78, 81]}' + 
']';

// Parse JSON
const students = JSON.parse(STUDENT_DATA_JSON);

// Exercise 1:

const idsList = students.map(student => student.id).join(', ');

// Displaying of IDs
const h2Ids = document.createElement('h2');
h2Ids.textContent = 'Student IDs';
document.body.appendChild(h2Ids);

const divIds = document.createElement('div');
divIds.className = 'ids-list';
divIds.textContent = idsList;
document.body.appendChild(divIds);

// Exercise 2: 

// calculate max average to find top student
const studentsWithAverage = students.map(student => {
    const average = student.grades.reduce((sum, grade) => sum + grade, 0) / student.grades.length;
    return { ...student, average };
});

const maxAverage = Math.max(...studentsWithAverage.map(s => s.average));

// transformed list
const transformedStudents = students.map(student => {
    // Split into first name and surname
    const nameParts = student.name.split(' ');
    const firstName = nameParts[0];
    const surname = nameParts.slice(1).join(' ');
    
    // Split into town and postcode
    const addressParts = student.address.split(', ');
    const town = addressParts[0];
    const postcode = addressParts[1].replace('D', '');
    
    // Calculate average
    const average = student.grades.reduce((sum, grade) => sum + grade, 0) / student.grades.length;
    
    // results
    let resultCategory;
    if (average < 40) {
        resultCategory = 'F';
    } else if (average >= 40 && average === maxAverage) {
        resultCategory = 'A';
    } else {
        resultCategory = 'P';
    }
    
    return {
        firstName: firstName,
        surname: surname,
        id: student.id,
        town: town,
        postcode: postcode,
        average: average,
        resultCategory: resultCategory
    };
});

// Display transformed list on table
const h2Transformed = document.createElement('h2');
h2Transformed.textContent = 'Transformed Student List';
document.body.appendChild(h2Transformed);

const table1 = document.createElement('table');
const thead1 = document.createElement('thead');
const headerRow1 = document.createElement('tr');
['First Name', 'Surname', 'ID', 'Town', 'Postcode', 'Average', 'Result'].forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow1.appendChild(th);
});
thead1.appendChild(headerRow1);
table1.appendChild(thead1);

const tbody1 = document.createElement('tbody');
transformedStudents.forEach(student => {
    const row = document.createElement('tr');
    ['firstName', 'surname', 'id', 'town', 'postcode'].forEach(field => {
        const td = document.createElement('td');
        td.textContent = student[field];
        row.appendChild(td);
    });
    
    const tdAvg = document.createElement('td');
    tdAvg.textContent = student.average.toFixed(2);
    row.appendChild(tdAvg);
    
    const tdResult = document.createElement('td');
    tdResult.textContent = student.resultCategory;
    tdResult.className = `result-${student.resultCategory}`;
    row.appendChild(tdResult);
    
    tbody1.appendChild(row);
});
table1.appendChild(tbody1);
document.body.appendChild(table1);

// Exercise 3a:

const h2Summary = document.createElement('h2');
h2Summary.textContent = 'Student Summary (Name, Surname, ID, Result)';
document.body.appendChild(h2Summary);

const table2 = document.createElement('table');
const thead2 = document.createElement('thead');
const headerRow2 = document.createElement('tr');
['First Name', 'Surname', 'ID', 'Result'].forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow2.appendChild(th);
});
thead2.appendChild(headerRow2);
table2.appendChild(thead2);

const tbody2 = document.createElement('tbody');
transformedStudents.forEach(student => {
    const row = document.createElement('tr');
    ['firstName', 'surname', 'id'].forEach(field => {
        const td = document.createElement('td');
        td.textContent = student[field];
        row.appendChild(td);
    });
    
    const tdResult = document.createElement('td');
    tdResult.textContent = student.resultCategory;
    tdResult.className = `result-${student.resultCategory}`;
    row.appendChild(tdResult);
    
    tbody2.appendChild(row);
});
table2.appendChild(tbody2);
document.body.appendChild(table2);

// Exercise 3b: 

const anyFailed = transformedStudents.some(student => student.resultCategory === 'F');

const h2Failed = document.createElement('h2');
h2Failed.textContent = 'Has Any Student Failed?';
document.body.appendChild(h2Failed);

const divFailed = document.createElement('div');
divFailed.className = 'ids-list';
divFailed.textContent = anyFailed ? 'Yes' : 'No.';
document.body.appendChild(divFailed);

// Exercise 3c: 

const failedStudents = transformedStudents.filter(student => student.resultCategory === 'F');

const h2FailedList = document.createElement('h2');
h2FailedList.textContent = 'Students Who Failed';
document.body.appendChild(h2FailedList);

if (failedStudents.length > 0) {
    const table3 = document.createElement('table');
    const thead3 = document.createElement('thead');
    const headerRow3 = document.createElement('tr');
    ['First Name', 'Surname', 'ID', 'Result'].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow3.appendChild(th);
    });
    thead3.appendChild(headerRow3);
    table3.appendChild(thead3);
    
    const tbody3 = document.createElement('tbody');
    failedStudents.forEach(student => {
        const row = document.createElement('tr');
        ['firstName', 'surname', 'id'].forEach(field => {
            const td = document.createElement('td');
            td.textContent = student[field];
            row.appendChild(td);
        });
        
        const tdResult = document.createElement('td');
        tdResult.textContent = student.resultCategory;
        tdResult.className = `result-${student.resultCategory}`;
        row.appendChild(tdResult);
        
        tbody3.appendChild(row);
    });
    table3.appendChild(tbody3);
    document.body.appendChild(table3);
} else {
    const divNoFailed = document.createElement('div');
    divNoFailed.className = 'ids-list';
    divNoFailed.textContent = 'No students have failed.';
    document.body.appendChild(divNoFailed);
}

// Exercise 3d:
const classAverage = transformedStudents.reduce((sum, student) => sum + student.average, 0) / transformedStudents.length;

const h2ClassAvg = document.createElement('h2');
h2ClassAvg.textContent = 'Class Average Percentage';
document.body.appendChild(h2ClassAvg);

const divClassAvg = document.createElement('div');
divClassAvg.className = 'average';
divClassAvg.textContent = `${classAverage.toFixed(2)}%`;
document.body.appendChild(divClassAvg);
