
import {displayTasks, tasks, form, input} from './script.js'

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

  

export {
    addItem,
    editTaskDescription,
    deleteTask
}