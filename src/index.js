import "./styles.css";
import { format, compareAsc, parse } from "date-fns";
import Todo  from "./todo";
import SubTodo  from "./subTodo";
import Project from "./project";
import ProjectManager from "./projectManager";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const mainPM = new ProjectManager("Syon");
const body = document.querySelector("body");

const welcomeText = document.createElement("p");
welcomeText.textContent = `Welcome ${mainPM.name}`;
body.appendChild(welcomeText);

const floodProject = new Project("FloodWatch");

const taskOne = new Todo("Create Project Report", "Aug 28 2026", 1);
const taskTwo = new Todo("Figure Out Tech Stack", "Aug 28 2026", 1);
const subtaskOne = new SubTodo("Schedule a Meeting", "Aug 27 2026", 2);

taskTwo.addSubTodo(subtaskOne);

floodProject.addTodo(taskOne);
floodProject.addTodo(taskTwo);

taskTwo.listSubTodos();
floodProject.listTodos();

