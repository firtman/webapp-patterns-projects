import { observerMixin } from "./mixins.js";

export class TodoItem {
    constructor(text) {
        this.text = text;
    }
    equals(other) {
        return this.text == other.text;
    }
}

export class TodoList {
    // Data
    #data = new Set();
    get items() { return this.#data }

    // Singleton
    static instance=null;
    static {
        this.instance = new TodoList();
    }
    static getInstance() {
        return this.instance;
    }
    constructor() {
        if (TodoList.instance) {
            throw new Error("Use TodoList.getInstance() instead.");
        }
    }

    // List Behaviour
    add(todoItem) {
        const array = Array.from(this.#data);
        const todoExists = array.filter(t=>t.equals(todoItem)).length>0;
        if (!todoExists) {
            this.#data.add(todoItem);
            this.notify();
        }
    }
    delete(todo) {
        const array = Array.from(this.#data);
        const todoToDelete = array.filter(t=>t.text==todo);
        this.#data.delete(todoToDelete[0]);
        this.notify();
    }
    find(text) {
        const array = Array.from(this.#data);
        return array.find(i=>i.text==text);
    }
    replaceList(list) {
        this.#data = list;
        this.notify();
    }
}

// Apply Observer mixin
Object.assign(TodoList.prototype, observerMixin);
