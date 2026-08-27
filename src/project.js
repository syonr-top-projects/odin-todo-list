import Todo from "./todo";
import * as components from "./components";

export default class Project {

    constructor(name) {
        this.name = name;
        this.todoList = components.listComponent();
    }

    addTask(taskName, dueDate, priority, description) {
        this.todolist.add(new Todo(taskName, dueDate, priority, description))
    }

    removeTask(taskName) {
        this.todoList.remove(taskName);
    }

    listTasks() {
        this.todoList.listAll();
    }
}

Project.prototype.add(editName());  



