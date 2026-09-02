import { format, compareAsc, parse } from "date-fns";
import ProjectManager from "./projectManager";
import Project from "./project";
import Todo from "./todo";
import SubTodo from "./subTodo";

// object must have name attribute
export function editName(newName) {
    this.name = newName;
} 

// object must be include dueDate and the string must be like Aug 26, 2026
export function editDueDate(newDueDateString) {
    this.dueDate = parse(newDueDateString, "PP", new Date());
}

// object must have priority attribute
export function editPriority(newPriority) {
    this.priority = newPriority;
}

// object must have description attribute
export function editDescription(newDescription) {
    this.description = newDescription;
}

// object must have name attribute, object needs to have its own state hence why we use a factory function 
export function listComponent() { 

    let list = [];

    return {
        add(object) { 
            list.push(object); //can access list via closure
        },

        remove(objectName) {
            list = list.filter(object => object.name !== objectName);
        },

        listAll() {
            list.forEach(object => console.log(object.name));
        },

        toArray() {
            return list;
        }
    }
}
