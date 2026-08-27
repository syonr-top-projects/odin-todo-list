import { format, compareAsc, parse } from "date-fns";

// object must have name attribute
export const editName = {
    editName(newName) {
        this.name = newName;
    }
} 

// object must be include dueDate and the string must be like Aug 26, 2026
export const editDueDate = {
    editDate(newDueDateString) {
        this.dueDate = parse(newDueDateString, "PP", new Date());
    }
}

// object must have priority attribute
export const editPriority = {
    editPriority(newPriority) {
        this.priority = newPriority;
    }
}

// object must have description attribute
export const editDescription = {
    editDescription(newDescription) {
        this.description = newDescription;
    }
}

// object must have name attribute, object needs to have its own state hence why we use a factory function 
export const listComponent = () => { 

    const list = [];

    return {
        add(object) { 
            list.push(object); //can access list via closure
        },

        remove(objectName) {
            list = list.filter(name => name !== objectName);
        },

        listAll() {
            list.forEach(object => console.log(object.name));
        }        
    }
}


