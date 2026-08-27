import { format, compareAsc, parse } from "date-fns";
import * as components from "./components";

export default class SubTodo {

    // TODO: Add error checks for the parameters
    constructor(name, dueDateStr, priority, description) {
        this.name = name;
        this.dueDate = parse(dueDateStr, "PP", new Date());
        this.priority = priority;
        this.priority = description;
    }

}

SubTodo.prototype.add(editName());
SubTodo.prototype.add(editDueDate());
SubTodo.prototype.add(editPriority());
SubTodo.prototype.add(editDescription());

