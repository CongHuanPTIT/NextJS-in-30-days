import { renderTaskDOM, addTaskDOM } from "./dom.js";
import { getTask, saveTask } from "./storage.js";

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('btnAdd');
const taskList = document.getElementById('taskList');

const init = () => {
    const tasks = getTask();
    renderTaskDOM(taskInput, taskList);
}

/*
Uncaught TypeError: 
Cannot read properties of null 
(reading 'addEventListener')

fix later
*/ 
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskDOM(taskText, taskList);
        renderTaskDOM(taskText, taskList);
        taskInput.value = '';
    }
})

init();