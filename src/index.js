import "./styles.css";
import { createSidebar } from "./frontend/sidebar";
import ProjectManager from "./backend/projectManager";
import Project from "./backend/project";
import Todo from "./backend/todo";
import SubTodo from "./backend/subTodo";
import { save, load } from "./backend/localStorage";
import { parse } from "date-fns";
import { renderProject } from "./frontend/main";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}
 
const app = document.querySelector("#app");

let manager = load();
if (!manager) {
    manager = new ProjectManager(); 
    createSampleProject(manager);
}

console.log(manager);

const todoSection = document.createElement("div");
todoSection.id = "todo-section";

const sidebar = createSidebar(manager, todoSection);
app.appendChild(sidebar);
app.appendChild(todoSection);

renderProject(manager, manager.list[0], todoSection);

function createSampleProject(manager) {

    const projectOne = new Project("sample project one", "sample project descipriton one");

    const dueDateOne = parse("09-07-2026", "MM-dd-yyyy", new Date());
    const dueDateTwo = parse("09-06-2026", "MM-dd-yyyy", new Date());
    const dueDateThree = parse("09-05-2026", "MM-dd-yyyy", new Date());

    const todoOne = new Todo("sample todo one", dueDateThree, 1, "sample todo descipriton one");
    const subTodoOne = new SubTodo("sample subTodo one", dueDateOne, 2, "sample sub todo descipriton one");

    const todoTwo = new Todo("sample todo two", dueDateTwo, 2, "sample todo descipriton two");
    const todoThree = new Todo("sample todo three", dueDateThree, 3, "sample todo descipriton three");

    const subTodoTwo = new SubTodo("sample subTodo two", dueDateOne, 4, "sample sub todo descipriton two");

    todoOne.add(subTodoOne);
    projectOne.add(todoOne);

    todoThree.add(subTodoTwo);
    projectOne.add(todoTwo);
    projectOne.add(todoThree);

    manager.add(projectOne);

    save(manager);

}
