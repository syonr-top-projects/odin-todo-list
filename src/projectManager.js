import * as components from "./logicComponents";
import { loadData, saveData } from "./localStorage";

export default class ProjectManager {

    constructor() {
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




