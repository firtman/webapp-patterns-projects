import { TodoList, TodoItem } from './classes.js';
import { TodoHistory } from './memento.js';

export class Command {
    name;
    args;
    constructor(name, args) {
        this.name = name;
        this.args = args;
    }
}

export const Commands = {
    ADD: "add",
    DELETE: "delete",
    UNDO: "undo",
}

export const CommandExecutor = {
    execute(command) {
        const todoList = TodoList.getInstance();
        switch (command.name) {
            case Commands.ADD:
                const todoInput = globalThis.DOM.todoInput;
                const todoText = todoInput.value.trim();
                const itemToAdd = todoList.find(todoText);

                if (todoText !== '' && itemToAdd==null) {
                    todoInput.value = '';
                    todoList.add(new TodoItem(todoText));
                }        
                break;
            case Commands.DELETE:
                const [itemToDelete] = command.args;
                todoList.delete(itemToDelete);
                break;
            case Commands.UNDO:
                const previousList = TodoHistory.pop();
                if (previousList) {
                    todoList.replaceList(previousList);
                }
        }
    }
}