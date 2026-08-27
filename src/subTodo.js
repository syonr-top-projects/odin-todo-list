import { format, compareAsc, parse } from "date-fns";
import * as components from "./components";

export default class SubTodo {

    // dueDate must be in "MM dd YYYY" format
    // priority 1(highest) - 4(lowest)

    // TODO: Add error checks for the parameters
    constructor(name, dueDateStr, priority, description) {
        this.name = name;
        this.dueDate = parse(dueDateStr, "PP", new Date());
        this.priority = priority;
        this.priority = description;
    }

}

Object.assign(SubTodo.prototype, components.editName);
Object.assign(SubTodo.prototype, components.editDueDate);
Object.assign(SubTodo.prototype, components.editPriority);
Object.assign(SubTodo.prototype, components.editDescription);

