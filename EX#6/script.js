const TASKS_KEY = "TASKS_DB";
let taskList = [];

// Initialize taskList from localStorage if available
const savedTasks = localStorage.getItem(TASKS_KEY);
if (savedTasks) {
    taskList = JSON.parse(savedTasks);
} else {
    localStorage.setItem(TASKS_KEY, JSON.stringify(taskList));
}

// Update localStorage whenever taskList changes
const syncLocalStorage = () => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(taskList));
};

// Re-sync taskList from localStorage
const refreshTasks = () => {
    const storedData = localStorage.getItem(TASKS_KEY);
    if (storedData) {
        taskList = JSON.parse(storedData);
    }
};

// Input handling with validation
const getUserChoice = () => {
    const userChoice = parseInt(prompt("Select an option:"));
    return isNaN(userChoice) || userChoice < 1 || userChoice > 7 ? null : userChoice;
};

// Display available actions
const displayMenu = () => {
    console.log(`
Task Manager Options:
1- Add Task
2- View All Tasks
3- Toggle Task Completion
4- Edit Task Description
5- Delete Task
6- Search Task
7- Exit
    `);
};

// Display tasks with ID and status
const listTasks = () => {
    refreshTasks();
    if (taskList.length === 0) {
        console.log("No tasks available.");
    } else {
        taskList.forEach((task, idx) => {
            console.log(`${idx + 1} - ${task.desc} [${task.isComplete ? "Done" : "Pending"}]`);
        });
    }
};

// Add a new task to the list
const createTask = () => {
    const taskDescription = prompt("Enter the task description:");
    taskList.push({ desc: taskDescription, isComplete: false });
    syncLocalStorage();
    console.log("Task added successfully.");
};

// Toggle task completion status
const toggleCompletion = () => {
    const taskId = parseInt(prompt("Enter the Task ID to toggle:")) - 1;
    if (taskList[taskId]) {
        taskList[taskId].isComplete = !taskList[taskId].isComplete;
        console.log("Task completion status updated.");
    } else {
        console.log("Task not found.");
    }
    syncLocalStorage();
};

// Update an existing task's description
const modifyTask = () => {
    const taskId = parseInt(prompt("Enter the Task ID to edit:")) - 1;
    if (taskList[taskId]) {
        const newDescription = prompt("Enter new description:");
        taskList[taskId].desc = newDescription;
        console.log("Task updated successfully.");
    } else {
        console.log("Task not found.");
    }
    syncLocalStorage();
};

// Remove a task from the list
const removeTask = () => {
    const taskId = parseInt(prompt("Enter the Task ID to delete:")) - 1;
    if (taskList[taskId]) {
        taskList.splice(taskId, 1);
        console.log("Task deleted.");
    } else {
        console.log("Task not found.");
    }
    syncLocalStorage();
};

// Search tasks by description keyword
const searchTasks = () => {
    refreshTasks();
    const searchTerm = prompt("Enter search term:");
    const filteredTasks = taskList.filter((task) => task.desc.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filteredTasks.length > 0) {
        filteredTasks.forEach((task, idx) => {
            console.log(`${idx + 1} - ${task.desc} [${task.isComplete ? "Done" : "Pending"}]`);
        });
    } else {
        console.log("No tasks matched the search.");
    }
};

// Main loop to run the task manager
let option = 0;
while (option !== 7) {
    displayMenu();
    option = getUserChoice();
    switch (option) {
        case 1:
            createTask();
            break;
        case 2:
            listTasks();
            break;
        case 3:
            toggleCompletion();
            break;
        case 4:
            modifyTask();
            break;
        case 5:
            removeTask();
            break;
        case 6:
            searchTasks();
            break;
        case 7:
            console.log("Exiting Task Manager. Goodbye!");
            break;
        default:
            console.log("Invalid choice, please try again.");
            break;
    }
}
