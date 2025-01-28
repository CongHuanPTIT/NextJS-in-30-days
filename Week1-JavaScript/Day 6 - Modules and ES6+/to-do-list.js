// JS code for To-Do List

const taskInput = document.querySelector('.taskInput');
const dateInput = document.querySelector('.dateInput'); // separated to ensure we are declaring a variable
dateInput.min = new Date().toISOString().slice(0, 10);  // and adding properties to it the right way
const addTaskBtn = document.querySelector('.btnAdd');
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

// Render the task list and display it on the screen
function renderTask() {         
    let taskListHTML = '';
    taskList.forEach((task, taskIndex) => {
        const name = task.taskName;
        const date = task.taskDate;
        const taskHTML = 
        `<div>${name}</div> 
         <div>${date}</div>
        <button class="btnDelete" data-index="${taskIndex}">
            Delete
        </button>`;
        taskListHTML += taskHTML; 
    });
    document.querySelector('.taskGridDisplay').innerHTML = taskListHTML;
    
    const deleteTaskBtns = document.querySelectorAll('.btnDelete');
    deleteTaskBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', deleteTask)
    })
}

// Initial render
renderTask();

// Pressing 'Enter' and hit 'Add' has the same goal => Use one function
taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
})

addTaskBtn.addEventListener('click', addTask);

function addTask() {    
    const task = taskInput.value;
    const date = dateInput.value;
    if (task != '' && date != '') {
        taskList.push({
            taskName: task,
            taskDate: date
        });
        taskInput.value = '';
        dateInput.value = '';
        saveTaskToLocal();
        renderTask();   
    }
}

function deleteTask() {
    const taskIndex = parseInt(this.getAttribute('data-index'));
    taskList.splice(taskIndex, 1);
    saveTaskToLocal();
    renderTask();
}

// Preserve task list in local storage to ensure content stays after webpage is closed or refresed 
function saveTaskToLocal() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}