import ProjectItem from "./project";

export default class User {

    constructor(name) {
        this.name = name;
        this.projectList = [];
    }

    addProject(projectName) {
        this.projectList.push(new ProjectItem(projectName));
    }

    removeProject(projectName) {
        this.projectList.filter(name => name !== projectName);
    }
}

export function editName(obj, newName) {
    obj.name = newName;
}

User.prototype.add(editName);



