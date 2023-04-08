import { tasks, todoList } from './script.js';

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

export const funny = true;