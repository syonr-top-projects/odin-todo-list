import Project from "./project";
import * as components from "./components";

export default class ProjectManager {

    constructor() {
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




