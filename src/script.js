// Import the stylesheet
import './style.css';

import * as crud from './CRUD.js'

// Select relevant HTML elements
export const form = document.getElementById('form'); 
export const input = document.getElementById('your-todo'); 
const todoList = document.getElementById('todo-list'); 
const clearAll = document.getElementById('clear-all'); 
const refMe = document.querySelector('.bi-arrow-clockwise'); 
const enterIcon = document.querySelector('.bi-box-arrow-in-left'); 

export var tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

export function displayTasks() {
  todoList.innerHTML = ''; 
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${
  task.completed ? 'checked' : ''
} data-index="${index}">
      <span>${task.description}</span>
      <i class="bi bi-three-dots-vertical"></i>
      <i class="bi bi-trash2"></i>
    `;
    li.classList.toggle('completed', task.completed);
    todoList.appendChild(li); 
  });
}

function clearAllFunc() {
  tasks = tasks.filter((task) => !task.completed); 
  tasks.forEach((task, index) => {
    task.index = index; 
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks(); 
}




function toggleItem(e) {
  const li = e.target.closest('li');
  if (li) {
    li.classList.toggle('selected');
    const threeDots = li.querySelector('.bi-three-dots-vertical');
    const trashIcon = li.querySelector('.bi-trash2');
    if (li.classList.contains('selected')) {
      threeDots.style.display = 'none';
      trashIcon.style.display = 'block';
      trashIcon.style.cursor = 'pointer';
    } else {
      threeDots.style.display = 'block';
      trashIcon.style.display = 'none';
    }
  }

  refMe.addEventListener('click', () => {
    window.location.reload();
  });

  if (e.target.tagName === 'INPUT') {
    const { index } = e.target.dataset;
    tasks[index].completed = e.target.checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
  } else if (e.target.classList.contains('bi-three-dots-vertical')) {
    const item = e.target.parentNode;
    const prev = item.previousElementSibling;
    todoList.insertBefore(item, prev);
    tasks.forEach((task, index) => {
      task.index = index; 
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else if (e.target.classList.contains('bi-trash2')) {
    const item = e.target.parentNode;
    const { index } = item.querySelector('input').dataset;
    crud.deleteTask(index);
  }
}
  
form.addEventListener('submit', crud.addItem);
todoList.addEventListener('click', toggleItem);
enterIcon.addEventListener('click', crud.addItem);
clearAll.addEventListener('click', clearAllFunc);
todoList.addEventListener('dblclick', crud.editTaskDescription);

// Render the initial tasks on the page when it loads
window.onload = () => {
  displayTasks();
};
