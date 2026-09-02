import Todo from "./todo";
import * as components from "./logicComponents";
import { loadData, saveData } from "./localStorage";

export default class Project {

    constructor(name, description) {
        this.name = name;
        this.description = description;
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
Object.assign(Project.prototype, components.editDescription);



