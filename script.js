let tasks = [];

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const taskType = document.getElementById('taskType').value;
    const priority = document.getElementById('priority').value;

    if (taskName) {
        const newTask = {
            name: taskName,
            dueDate: dueDate,
            type: taskType,
            priority: priority,
            completed: false,
        };
        tasks.push(newTask);
        tasks.sort((a, b) => a.priority.localeCompare(b.priority)); // Sort by priority
        displayTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.draggable = true;
        taskItem.className = `task-item ${task.priority.toLowerCase()}`;
        taskItem.ondragstart = (event) => drag(event, index);

        taskItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.name} - ${task.type} (Due: ${task.dueDate}) - Priority: ${task.priority}
            </span>
            <div class="task-controls">
                <button class="btn complete-btn" onclick="toggleComplete(${index})">✔️</button>
                <button class="btn edit-btn" onclick="editTask(${index})">✏️</button>
                <button class="btn delete-btn" onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById('taskName').value = task.name;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('taskType').value = task.type;
    document.getElementById('priority').value = task.priority;
    tasks.splice(index, 1);
    displayTasks();
}

function drag(event, index) {
    event.dataTransfer.setData('text/plain', index);
}

document.getElementById('taskList').ondrop = (event) => {
    event.preventDefault();
    const droppedIndex = parseInt(event.dataTransfer.getData('text/plain'), 10);
    const targetIndex = Array.from(event.currentTarget.children).indexOf(event.target.closest('li'));
    const [draggedTask] = tasks.splice(droppedIndex, 1);
    tasks.splice(targetIndex, 0, draggedTask);
    displayTasks();
};

document.getElementById('taskList').ondragover = (event) => event.preventDefault();
