(() => {
  let taskArray = [];
  const form = document.querySelector('.task-form'); 
  const input = document.querySelector('.task-input');
  const taskList = document.querySelector('.task-list'); 

  form.addEventListener('submit', function(e) {
      e.preventDefault();
      const taskId = Date.now().toString();
      const taskValue = input.value;
      appendTaskToDOM(taskId, taskValue);
      addTaskToArray(taskId, taskValue);
      input.value = '';
  });

  taskList.addEventListener('click', function(e) {
      const taskId = e.target.getAttribute('data-id');
      if (!taskId) return;
      removeTaskFromDOM(taskId);
      removeTaskFromArray(taskId);
  });

  function appendTaskToDOM(taskId, taskValue) {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-id', taskId);
      listItem.innerText = taskValue;
      taskList.appendChild(listItem);
  }

  function addTaskToArray(taskId, taskValue) {
      taskArray.push({ taskId, taskValue });
  }

  function removeTaskFromDOM(taskId) {
      const itemToRemove = document.querySelector(`[data-id="${taskId}"]`);
      taskList.removeChild(itemToRemove);
  }

  function removeTaskFromArray(taskId) {
      taskArray = taskArray.filter(task => task.taskId !== taskId);
  }
})();