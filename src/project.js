import Todo from "./todo";
import * as components from "./components";

export default class Project {

    constructor(name) {
        this.name = name;
        this.todoList = components.listComponent();
    }

    addTodo(todoObject) {
        this.todoList.add(todoObject);
    }

    removeTodo(taskName) {
        this.todoList.remove(taskName);
    }

    listTodos() {
        this.todoList.listAll();
    }
}

Object.assign(Project.prototype, components.editName);



