const form = document.getElementById('form');
const input = document.getElementById('your-todo');
const refMe = document.querySelector('.bi-arrow-clockwise');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const todoList = document.getElementById('todo-list');

function displayTasks() {
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

function editTask(index, newDescription) {
  tasks[index].description = newDescription;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

function addItem(event) {
  event.preventDefault();
  if (input.value) {
    const x = tasks.length;
    const addedTask = {
      description: input.value,
      completed: false,
      index: x,
    };
    tasks.push(addedTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
    form.reset();
    input.focus();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  tasks.forEach((task, index) => {
    task.index = index;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

function editTaskDescription(e) {
  const li = e.target.closest('li');
  const span = li.querySelector('span');
  const { index } = li.querySelector('input').dataset;
  span.setAttribute('contentEditable', true);
  span.focus();
  span.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      span.blur();
    }
  });

  span.addEventListener('blur', () => {
    const newDescription = span.textContent.trim();
    if (newDescription === '') {
      deleteTask(index);
    } else {
      editTask(index, newDescription);
    }
  });
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
    deleteTask(index);
  }
}

export {
  addItem,
  editTaskDescription,
  toggleItem,
  form,
  tasks,
  todoList,
  displayTasks,
};