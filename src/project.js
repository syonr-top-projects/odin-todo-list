import TodoItem from "./todo";
import { editName } from "./user";

export default class ProjectItem {

    constructor(name) {
        this.name = name;
        this.taskList = [];
    }
}

ProjectItem.prototype.add(editName);



