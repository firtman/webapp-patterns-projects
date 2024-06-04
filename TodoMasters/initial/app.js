document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    addBtn.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const listItem = document.createElement('li');
            listItem.className = 'todo-item';
            listItem.innerHTML = `${todoText} <button class="delete-btn">Delete</button>`;
            todoList.appendChild(listItem);
            todoInput.value = '';
        }
    });

    todoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            event.target.parentElement.remove();
        }
    });
});