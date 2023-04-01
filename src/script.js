/* eslint-disable import/no-cycle */
// Import the stylesheet
import './style.css';
import { displayTasks } from './interactive.js';
import * as crud from './CRUD.js';

// Select relevant HTML elements
export const form = document.getElementById('form');
export const input = document.getElementById('your-todo');
export const todoList = document.getElementById('todo-list');
const clearAll = document.getElementById('clear-all');
export const refMe = document.querySelector('.bi-arrow-clockwise');
const enterIcon = document.querySelector('.bi-box-arrow-in-left');

export const tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function clearAllFunc() {
  const task = tasks.filter((task) => !task.completed);
  task.forEach((task, index) => {
    task.index = index;
  });
  localStorage.setItem('tasks', JSON.stringify(task));
  displayTasks();
  window.location.reload();
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
