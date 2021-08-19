window.addEventListener('load', function() {

    tasks = [];

    function addTask(description) {
        tasks.push({
            description: description,
            completed: false,
            selected: false
        });
    }

    function selectTask(index) {
        tasks[index].selected = true;
    }

    function deselectTask(index) {
        tasks[index].selected = false;
    }

    function deselectAllTasks() {
        for(let task of tasks) {
            task.selected = false;
        }
    }

    function toggleSelectTask(index) {
        if (tasks[index].selected) {
            deselectTask(index);
        } else {
            deselectAllTasks();
            selectTask(index);
        }
    }

    function completeTask(index) {
        tasks[index].completed = true;
    }

    function uncompleteTask(index) {
        tasks[index].completed = false;
    }

    function toggleCompleteTask(index) {
        if (tasks[index].completed) {
            uncompleteTask(index);
        } else {
            completeTask(index);
        }
    }

    function clearTasks() {
        tasks = [];
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
    }

    function save() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function load() {
        if (localStorage.getItem('tasks')) {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }    
    }

    function switchTasks(fromIndex, toIndex) {
        if (toIndex < 0 || toIndex >= tasks.length) return;
        const oldFrom = tasks[fromIndex];
        tasks[fromIndex] = tasks[toIndex];
        tasks[toIndex] = oldFrom;
    }

    function moveUpTask(index) {
        switchTasks(index, index - 1);
    }

    function moveDownTask(index) {
        switchTasks(index, index + 1);
    }

    function removeCompletedTasks() {
        tasks = tasks.filter(task => !task.completed);
    }

    function getSelectedTaskIndex() {
        for(let index = 0; index < tasks.length; index += 1) {
            const task = tasks[index];

            if (task.selected) return index;
        }
        return -1;
    }

    const tasksElement = document.getElementById('lista-tarefas');
    const addButton = document.getElementById('criar-tarefa');
    const moveUpButton = document.getElementById('mover-cima');
    const moveDownButton = document.getElementById('mover-baixo');
    const clearButton = document.getElementById('apaga-tudo');
    const removeCompletedButton = document.getElementById('remover-finalizados');
    const removeButton = document.getElementById('remover-selecionado');
    const saveButton = document.getElementById('salvar-tarefas');
    const taskTextInput = document.getElementById('texto-tarefa');
    const completeButton = document.getElementById('completar-selecionado');

    function clearScreen() {
        tasksElement.innerHTML = '';
    }

    function renderScreen() {
        if (tasks) {
            for (let index = 0; index < tasks.length; index += 1) {
                const task = tasks[index];
                const taskElement = document.createElement('li');
                taskElement.innerHTML = task.description;
                taskElement.setAttribute('index', index);
                if (task.completed) {
                    taskElement.classList.add('completed');
                }
                if (task.selected) {
                    taskElement.classList.add('selected');
                }
                tasksElement.appendChild(taskElement);
            }    
        }
    }

    function updateScreen() {
        clearScreen();
        renderScreen();
    }

    // Events
    function onWindowLoad() {
        load();
        renderScreen();
    }

    function onAddTaskButtonClick() {
        const description = taskTextInput.value;
        addTask(description);
        updateScreen();
        taskTextInput.value = '';
    }

    function onClearButtonClick() {
        clearTasks();
        updateScreen();
    }

    function onSaveButtonClick() {
        save();
    }

    function onTaskElementClick(event) {
        if (event.target.nodeName == 'LI') {
            const elementIndex = event.target.getAttribute('index');
            toggleSelectTask(elementIndex);
            updateScreen();
        };
    }

    function onMoveUpButtonClick() {
        const selectedTaskIndex = getSelectedTaskIndex();
        if (selectedTaskIndex !== -1) {
            moveUpTask(selectedTaskIndex);
            updateScreen();
        }
    }

    function onMoveDownButtonClick() {
        const selectedTaskIndex = getSelectedTaskIndex();
        if (selectedTaskIndex !== -1) {
            moveDownTask(selectedTaskIndex);
            updateScreen();
        }
    }

    function onRemoveButtonClick() {
        const selectedTaskIndex = getSelectedTaskIndex();
        if (selectedTaskIndex !== -1) {
            deleteTask(selectedTaskIndex);
            updateScreen();
        }
    }

    function onCompleteButtonClick() {
        const selectedTaskIndex = getSelectedTaskIndex();
        if (selectedTaskIndex !== -1) {
            toggleCompleteTask(selectedTaskIndex);
            updateScreen();
        }
    }

    function onRemoveCompletedButtonClick() {
        removeCompletedTasks();
        updateScreen();
    }

    // Event Listeners
    onWindowLoad();
    addButton.addEventListener('click', onAddTaskButtonClick);
    clearButton.addEventListener('click', onClearButtonClick);
    saveButton.addEventListener('click', onSaveButtonClick);
    tasksElement.addEventListener('click', onTaskElementClick);
    moveUpButton.addEventListener('click', onMoveUpButtonClick);
    moveDownButton.addEventListener('click', onMoveDownButtonClick);
    removeButton.addEventListener('click', onRemoveButtonClick);
    completeButton.addEventListener('click', onCompleteButtonClick);
    removeCompletedButton.addEventListener('click', onRemoveCompletedButtonClick);
});


