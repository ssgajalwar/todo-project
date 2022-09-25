window.onload = loadTasks;

function loadTasks(){
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    tasks.forEach(task => {
        const list = document.querySelector("ul");
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.complete ? 'checked': ''}>
        <input type="text" value="${task.task}" class="task ${task.completed ? 'completed': ''}" onfocus="getCurrentTask(this)" onblur="editTask">
        <img onclick="removeTask(this)"  class="delete-img" src="images/delete.png" alt="">`;
        list.insertBefore(li,list.children[0]);
    });
}

function addTask(){
    const task = document.querySelector("form input");
    const list = document.querySelector("ul")
    //return if task is empty
    if(task.value === ""){
        alert("please add some task")
        return false;
    }
    // check if task is already exists
    
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    tasks.forEach(todo => {
        if(todo.task===task.value){
            alert("Task is aleready exist");
            task.value ="";
            return;
        }
    });

    // add task to local storage
    localStorage.setItem("tasks",JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || []),{task:task.value,completed:false}]));

    // create list items add innerHtml and append to ul

    const li =document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
    <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <img onclick="removeTask(this)"  class="delete-img" src="images/delete.png" alt=""> `;

    list.insertBefore(li,list.children[0]);

    task.value = "";

}

document.querySelector("form").addEventListener("submit",e => {
    e.preventDefault();
    addTask();
});

// store current task to track changes
var currentTask = null;

//get current tasks
function getCurrentTask(event){
    currentTask = event.value;
}

function editTask(event){
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    // check if task is empty
    if(event.value === ""){
        alert("task is empty");
        event.value = currentTask;
        return;
    }
    // task already exists
    tasks.forEach(task => {
        if(task.task === event.value){
            alert("Task already Exists");
            event.value = currentTask;
            return;
        }
    });
    // update task
    tasks.forEach(task =>{
        if(task.task === currentTask){
            task.task = event.value;
        }
    });
    // update local storage
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function taskComplete(event){
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task =>{
        if(task.task === event.nextElementSibling.value){
            task.completed = !task.completed;
        }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
    event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event){
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
      if(task.task === event.parentNode.children[1].value){
        tasks.splice(tasks.indexOf(task),1);
      }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
    event.parentElement.remove();
}
