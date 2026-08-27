import "./styles.css";
import { format, compareAsc, parse } from "date-fns";
import TodoItem from "./todo";
import ProjectItem from "./project";
import User from "./projectManager";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const mainUser = new User("Syon");

const welcomeText = document.createElement("p");
welcomeText.textContent = `Welcome ${mainUser.name}`;
document.appendChild(welcomeText);