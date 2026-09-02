import "./styles.css";
import { createSidebar, populateSideBar } from "./sidebar";
import ProjectManager from "./projectManager";
import Project from "./project";
import Todo from "./todo";
import SubTodo from "./subTodo";
import startingData from "./startingData.json"

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const app = document.querySelector("#app");

const manager = new ProjectManager();
const data = startingData;
populate(manager, data);

const sidebar = createSidebar(manager);

app.appendChild(sidebar);

function populate(projectManager, data) {

    data.projects.forEach(project => {
        const p = new Project(project.name, project.description);

        project.todoList.forEach(todo => {
            const t = new Todo(todo.name, todo.dueDateStr, todo.priority, todo.description);
            
            todo.subTodoList.forEach(subTodo => {
                const sT = new SubTodo(subTodo.name, subTodo.dueDateStr, subTodo.priority, subTodo.description);
                
                t.addSubTodo(sT);
            });
            p.addTodo(t);
        })
        projectManager.addProject(p)
    })
} 
