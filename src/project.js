import * as components from "./classComponents";

export default class Project {

    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.list = [];
    }
}

Object.assign(Project.prototype, { 
    add : components.add,
    remove : components.remove
});


