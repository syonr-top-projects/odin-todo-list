import { format, compareAsc, parse } from "date-fns";
import * as components from "./components";
import SubTodo from "./subTodo";

export default class Todo {

    // TODO: Add error checks for the parameters
    constructor(name, dueDate, priority, description) {
        this.name = name;
        this.dueDate = parse(dueDate, "MM/dd/yyyy", new Date());
        this.priority = priority;
        this.description = description;
        this.subTodoList = components.listComponent();
    }

    addSubTodo(name, dueDate, priority, description) {
        this.subTodoList.add(new SubTodo(name, dueDate, priority, description));
    } 

    removeSubTodo(subTodoName) {
        this.subTodoList.remove(subTodoName);
    }

    listSubTodos() {
        this.subTodoList.listAll();
    }

}

Todo.prototype.add(editName());
Todo.prototype.add(editDueDate());
Todo.prototype.add(editPriority());
Todo.prototype.add(editDescription());

