import "./styles.css";
import { createSidebar, populateSideBar } from "./sidebar";
import ProjectManager from "./projectManager";
import Project from "./project";
import Todo from "./todo";
import SubTodo from "./subTodo";
import { save, load } from "./localStorage";
import { format, parse } from "date-fns";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const app = document.querySelector("#app");

createSampleData();

const manager = load();
console.log(manager);

const sidebar = createSidebar(manager);
app.appendChild(sidebar);

function createSampleData() {

    const manager = new ProjectManager();

    const projectOne = new Project("sample project one", "sample project one");

    const dueDateOne = parse("Sep 07, 2026", "PP", new Date());
    const dueDateTwo = parse("Sep 06, 2026", "PP", new Date());
    const dueDateThree = parse("Sep 05, 2026", "PP", new Date());

    const todoOne = new Todo("sample todo one", dueDateThree, 1, "sample todo one");
    const subTodoOne = new SubTodo("sample subTodo one", dueDateOne, 2, "sample subTodo one");

    const projectTwo = new Project("sample project two", "hi");

    const todoTwo = new Todo("sample todo two", dueDateTwo, 2, "sample todo two");
    const todoThree = new Todo("sample todo three", dueDateThree, 3, "sample todo three");

    const subTodoTwo = new SubTodo("sample subTodo two", dueDateOne, 4, "sample subTodo two");

    todoOne.add(subTodoOne);
    projectOne.add(todoOne);

    todoThree.add(subTodoTwo);
    projectTwo.add(todoTwo);
    projectTwo.add(todoThree);

    manager.add(projectOne);
    manager.add(projectTwo)

    save(manager);

}