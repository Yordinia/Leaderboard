/* eslint-disable import/no-cycle */
// Import the stylesheet
import './style.css';

import * as crud from './CRUD.js';

// Select relevant HTML elements
export const form = document.getElementById('form');
export const input = document.getElementById('your-todo');
export const todoList = document.getElementById('todo-list');
const clearAll = document.getElementById('clear-all');
export const refMe = document.querySelector('.bi-arrow-clockwise');
const enterIcon = document.querySelector('.bi-box-arrow-in-left');

export const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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
  const task = tasks.filter((task) => !task.completed);
  task.forEach((task, index) => {
    task.index = index;
  });
  localStorage.setItem('tasks', JSON.stringify(task));
  displayTasks();
}

form.addEventListener('submit', crud.addItem);
todoList.addEventListener('click', crud.toggleItem);
enterIcon.addEventListener('click', crud.addItem);
clearAll.addEventListener('click', clearAllFunc);
todoList.addEventListener('dblclick', crud.editTaskDescription);

// Render the initial tasks on the page when it loads
window.onload = () => {
  displayTasks();
};
