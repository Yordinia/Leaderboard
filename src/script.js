import './style.css';
import * as crud from './CRUD.js';
import { tasks, todoList, displayTasks } from './CRUD.js';

const clearAll = document.getElementById('clear-all');
const enterIcon = document.querySelector('.bi-box-arrow-in-left');

function clearAllFunc() {
  const task = tasks.filter((task) => !task.completed);
  task.forEach((task, index) => {
    task.index = index;
  });
  localStorage.setItem('tasks', JSON.stringify(task));
  displayTasks();
  window.location.reload();
}

crud.form.addEventListener('submit', crud.addItem);
todoList.addEventListener('click', crud.toggleItem);
enterIcon.addEventListener('click', crud.addItem);
clearAll.addEventListener('click', clearAllFunc);
todoList.addEventListener('dblclick', crud.editTaskDescription);

// Render the initial tasks on the page when it loads
window.onload = () => {
  displayTasks();
};
