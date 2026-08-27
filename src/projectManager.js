import Project from "./project";
import * as components from "./components";

export default class ProjectManager {

    constructor(name) {
        this.name = name;
        this.projectList = components.listComponent();
    }

    addProject(projectName) {
        this.projectList.add(new Project(projectName));
    }

    removeProject(projectName) {
        this.projectList.remove(projectName);
    }

    listProjects() {
        this.projectList.listAll();
    }

}

Object.assign(ProjectManager.prototype, components.editName);



