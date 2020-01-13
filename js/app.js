const taskInput = document.querySelector('#taskInput');
const addTaskButton = document.querySelector('#addTaskButton');
const taskList = document.querySelector('#taskList');
const removeFinishedTasksButton = document.querySelector('#removeFinishedTasksButton');
const dateElement = document.querySelector('#date')
const errorBox = document.querySelector('.errorBox');

const today = new Date();
const options = { 
    year: 'numeric', 
    day: 'numeric', 
    month: 'long' 
};

dateElement.innerHTML = today.toLocaleDateString('en-PL', options)

function addNewTask () {
    let taskInputValue = taskInput.value
    
    if (!(taskInputValue === '') && taskInputValue.length >= 5 && taskInputValue.length < 100){
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <p class="task">${taskInputValue}</p>
        <i class="far fa-check-circle btnComplete"></i>
        <i class="far fa-trash-alt btnDelete"></i>       
    `;
    newTask.className = 'item'
    taskList.appendChild(newTask);
    errorBox.textContent = "";
    myErrors = []
    taskInput.value = '';
    }   else {
        errorBox.textContent = "You must use min 5 max 100 characters"
    }   

    function completeTask (el) {
        el.stopImmediatePropagation()        
        let closestLi = el.target.closest('li')
        closestLi.classList.toggle('completed') 
    }

    const completedBtn = taskList.querySelectorAll('.btnComplete');
    
    completedBtn.forEach(function(element) {
        element.addEventListener('click', completeTask)
    })

    const deletedBtn = taskList.querySelectorAll('.btnDelete');
    deletedBtn.forEach(function(element){
        element.addEventListener('click', function(el){
            el.stopImmediatePropagation()
            closestLi = el.target.closest('li')
            taskList.removeChild(closestLi)
        })
    })
}

addTaskButton.addEventListener('click', addNewTask);

removeFinishedTasksButton.addEventListener('click', function() {
    const allCompletedTasks = taskList.getElementsByClassName('completed');    
    while (allCompletedTasks.length > 0) {
        allCompletedTasks[0].parentNode.removeChild(allCompletedTasks[0])
    }
})


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addNewTask();
    }
})