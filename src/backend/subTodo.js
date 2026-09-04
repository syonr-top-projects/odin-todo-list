import * as components from "./classComponents";

export default class SubTodo {

    constructor(name, dueDate, priority, description) {
        this.name = name;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
    }

}

Object.assign(SubTodo.prototype, { 
    editDueDate : components.editDueDate 
});


