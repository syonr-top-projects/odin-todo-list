import * as components from "./classComponents";

export default class ProjectManager {

    constructor() {
        this.list = []
    }

}

Object.assign(ProjectManager.prototype, { 
    add : components.add, 
    remove : components.remove 
});



