import { format, compareAsc, parse } from "date-fns";
import * as components from "./components";
import SubTodo from "./subTodo";

export default class Todo {

    // TODO: Add error checks for the parameters
    constructor(name, dueDateStr, priority, description) {
        this.name = name;
        this.dueDate = parse(dueDateStr, "PP", new Date());
        this.priority = priority;
        this.description = description;
        this.subTodoList = components.listComponent();
    }

    addSubTodo(subTodoObject) {
        this.subTodoList.add(subTodoObject);
    } 

    removeSubTodo(subTodoName) {
        this.subTodoList.remove(subTodoName);
    }

    listSubTodos() {
        this.subTodoList.listAll();
    }

}

Object.assign(Todo.prototype, components.editName);
Object.assign(Todo.prototype, components.editDueDate);
Object.assign(Todo.prototype, components.editPriority);
Object.assign(Todo.prototype, components.editDescription);

