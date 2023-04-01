// Import the stylesheet
import './style.css';

// Select relevant HTML elements
const form = document.getElementById('form'); // Get the form element
const input = document.getElementById('new-item'); // Get the input element
const todoList = document.getElementById('todo-list'); // Get the todo list element
// const archiveBtn = document.getElementById('archive'); // Get the archive button element
const refMe = document.querySelector('.fa-refresh'); // Get the refresh icon element
const enterIcon = document.querySelector('.fa-level-down'); // Get the down arrow icon element

// Define tasks array and get tasks from local storage
const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Get the tasks from local storage, if any, or initialize an empty array

function displayTasks() {
  todoList.innerHTML = ''; // Clear current todo list
  // Render new todo list based on updated tasks array
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${
  task.completed ? 'checked' : ''
} data-index="${index}">
      <span>${task.description}</span>
      <i class="fa fa-ellipsis-v"></i>
      <i class="fa fa-trash"></i>
    `;
    li.classList.toggle('completed', task.completed);
    todoList.appendChild(li); // Add the new list item to the todo list
  });
}

function addItem(e) {
  e.preventDefault(); // Prevent the form from submitting and refreshing the page
  if (input.value) {
    const x = tasks.length;
    const newTask = {
      description: input.value,
      completed: false,
      index: x,
    };
    tasks.push(newTask); // Add the new task to the tasks array
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(); // Render the updated todo list
    form.reset(); // Clear the input field
    input.focus(); // focus on input
  }
}

// This function is called when a user clicks on a task or its associated icons
function toggleItem(e) {
  // Find the closest li element to the clicked element
  const li = e.target.closest('li');
  if (li) {
    // Toggle the "selected" class of the li element
    li.classList.toggle('selected');
    // Find the ellipsis and trash icons within the li element
    const ellipsisIcon = li.querySelector('.fa-ellipsis-v');
    const trashIcon = li.querySelector('.fa-trash');
    if (li.classList.contains('selected')) {
      // If the li element has the "selected" class, hide the ellipsis icon and show the trash icon
      ellipsisIcon.style.display = 'none';
      trashIcon.style.display = 'block';
      trashIcon.style.cursor = 'pointer';
    } else {
      // If the li element does not have the "selected" class,
      // show the ellipsis icon and hide the trash icon
      ellipsisIcon.style.display = 'block';
      trashIcon.style.display = 'none';
    }
  }

  refMe.addEventListener('click', () => {
    window.location.reload();
  });

  function deleteTask(index) {
    tasks.splice(index, 1); // Remove the task at the given index from the tasks array

    tasks.forEach((task, index) => {
      task.index = index; // Update the task index
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the tasks array to local storage

    displayTasks(); // Render the updated todo list
  }

  // If the clicked element is an input element, update the completed status of the task
  if (e.target.tagName === 'INPUT') {
    const { index } = e.target.dataset;
    tasks[index].completed = e.target.checked;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
  } else if (e.target.classList.contains('fa-ellipsis-v')) {
    // If the clicked element is the ellipsis icon, move the task up one position in the list
    const item = e.target.parentNode;
    const prev = item.previousElementSibling;
    todoList.insertBefore(item, prev);
    tasks.forEach((task, index) => {
      task.index = index; // Update the task index
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else if (e.target.classList.contains('fa-trash')) {
    // If the clicked element is the trash icon, delete the task
    const item = e.target.parentNode;
    const { index } = item.querySelector('input').dataset;
    deleteTask(index);
  }
}

// Add event listeners to various elements on the page
form.addEventListener('submit', addItem);
todoList.addEventListener('click', toggleItem);
enterIcon.addEventListener('click', addItem);

// Render the initial tasks on the page when it loads
window.onload = () => {
  displayTasks();
};
