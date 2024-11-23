// Load tasks from local storage on page load
let Task = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks or initialize as empty array

showItems();

function addTodo(){
    let inputElement=document.querySelector('#task');
    let dateElement=document.querySelector('#todo-date');
    let notesElement = document.querySelector('#task-notes');
    let priorityElement = document.querySelector('#task-priority');

    let taskItem=inputElement.value;
    let dateItem=dateElement.value;
    let notesItem = notesElement.value;
    let priorityItem = priorityElement.checked;

    if (taskItem && dateItem) {  // Only add non-empty tasks and dates
        Task.push({item: taskItem, dueDate: dateItem, notes: notesItem || '', priority: priorityItem });
        // Clear the input field
        inputElement.value = '';
        dateElement.value = '';
        notesElement.value = '';
        priorityElement.checked = false;

        saveToLocalStorage(); // Save updated tasks to local storage
        showItems();  // Update the display
    }
}


function showItems(){
    let displayElement=document.querySelector('#Todolist');
    displayElement.innerText='';

    for (let i = 0; i < Task.length; i++) {
        let listItem = document.createElement('li');  // Create a new list item

         // Create task text span
        let taskSpan = document.createElement('span');
        taskSpan.classList.add('task-item');
        taskSpan.innerText = Task[i].item;

        // Create due date span
        let dateSpan = document.createElement('span');
        dateSpan.classList.add('due-date');
        dateSpan.innerText = `Due: ${Task[i].dueDate}`;

         // Create priority star
        let priorityStar = document.createElement('span');
        priorityStar.classList.add('priority-star');
         priorityStar.innerText = Task[i].priority ? '⭐' : ''; // Display star if priority is true

        // Create notes span
        let notesSpan = document.createElement('span');
        notesSpan.classList.add('task-notes');
        notesSpan.innerText = `Notes: ${Task[i].notes}`;

        // Create a delete button
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = function() {
        Task.splice(i,1);  // Call the deleteTask function when clicked
        saveToLocalStorage(); // Save updated tasks to local storage
        showItems();
    };
    // Append task, due date, and delete button to the list item
    listItem.appendChild(taskSpan);
    listItem.appendChild(dateSpan);
    listItem.appendChild(deleteButton);
    listItem.appendChild(priorityStar);
    listItem.appendChild(notesSpan);
    displayElement.appendChild(listItem);  // Append the list item to the <ul>
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(Task)); // Save tasks to local storage
}

