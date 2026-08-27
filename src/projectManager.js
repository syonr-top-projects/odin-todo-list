import Project from "./project";
import * as components from "./components";

export default class ProjectManager {

    constructor(name) {
        this.name = name;
        this.projectList = components.listComponent();
    }

    addProject(projectObject) {
        this.projectList.add(projectObject);
    }

    removeProject(projectName) {
        this.projectList.remove(projectName);
    }

    listProjects() {
        this.projectList.listAll();
    }

}

Object.assign(ProjectManager.prototype, components.editName);



