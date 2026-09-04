import Project from "./project";
import ProjectManager from "./projectManager";
import Todo from "./todo";
import SubTodo from "./subTodo";

const KEY = "projects";

export function load() {
    const projects = JSON.parse(localStorage.getItem(KEY)); 

    const manager = new ProjectManager();

    projects.forEach(project => {
        const p = new Project(project.name, project.description);

        project.list.forEach(todo => {
            const t = new Todo(todo.name, todo.dueDate, todo.priority, todo.description);

            todo.list.forEach(subTodo => {
                const sT = new SubTodo(subTodo.name, subTodo.dueDate, subTodo.priority, subTodo.description);
                t.add(sT);
            })

            p.add(t);
        })

        manager.add(p);
    });

    return manager;
}

export function save(projectManager) {
    localStorage.setItem(
        KEY, JSON.stringify(projectManager.list)
    );
}


