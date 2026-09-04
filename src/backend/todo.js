import * as components from "./classComponents";

export default class Todo {

    constructor(name, dueDate, priority, description) {
        this.name = name;
        this.dueDate = dueDate; //must be a Date obj
        this.priority = priority; //must be 1-4
        this.description = description;
        this.list = [];
    }
}

Object.assign(Todo.prototype, { 
    add : components.add, 
    remove : components.remove,
    editDueDate : components.editDueDate 
});


