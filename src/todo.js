import { format, compareAsc, parse } from "date-fns";

export default class TodoItem {

    // dueDate must be in "MM/dd/yyyy" format
    // priority 1(highest) - 4(lowest)

    // TODO: Add error checks for the parameters
    constructor(name, dueDate, priority, description) {
        this.name = name;
        this.dueDate = parse(dueDate, "MM/dd/yyyy", new Date());
        this.priority = 4;
        this.description = description;
    }
    
    editName(newName) {
        this.name = newName;
    }

    editDate(newDate) {
        this.dueDate = parse(newDate, "MM/dd/yyyy", new Date());
    }

    editPriority(newPriority) {
        this.priority = newPriority;
    }

    editDescription(newDescription) {
        this.description = newDescription;
    }
}

