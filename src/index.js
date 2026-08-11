import "./styles.css";
import { format, compareAsc, parse } from "date-fns";
import TodoItem from "./todo";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const todoItem1 = new TodoItem("clean room", "8/11/2026", 1, "empty suitcase and move into closet");
console.log(todoItem1.name);
todoItem1.editPriority(4);
console.log(todoItem1.priority);