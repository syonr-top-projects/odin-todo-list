import { format, parse } from "date-fns";
import SubTodo from "../backend/subTodo";
import { save } from "../backend/localStorage";
import { addTodoForm, priorityColor } from "./main.js";

export function renderTodo(projectManager, project, todo) {
    
    const todoPopUp = document.createElement("div");
    todoPopUp.id = "todo-pop-up";

    if (document.querySelector("#todo-pop-up")) return;

    // create main section
    const todoMainSection = document.createElement("div");
    todoMainSection.id = "todo-main-section";
    const todoTitle = document.createElement("div");
    todoTitle.id = "todo-pop-up-title";
    todoTitle.textContent = todo.name;
    const todoDescription = document.createElement("div");
    todoDescription.id = "todo-pop-up-description";
    todoDescription.textContent = todo.description;

    todoMainSection.appendChild(todoTitle);
    todoMainSection.appendChild(todoDescription);

    const subTodoList = document.createElement("div");
    subTodoList.id = "sub-todo-list";

    renderSubTodos(projectManager, todo, subTodoList);

    todoMainSection.appendChild(subTodoList);

    const cancelButton = document.createElement("button");
    cancelButton.id = "close-todo";
    cancelButton.textContent = "Close";

    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        todoPopUp.remove();
    })

    const addSubTodobutton = document.createElement("button");
    addSubTodobutton.id = "add-sub-todo";
    addSubTodobutton.textContent = "Add Sub-Todo";
    addSubTodobutton.addEventListener("click", () => addTodoForm(projectManager, todo, subTodoList));
    
    todoMainSection.appendChild(addSubTodobutton);

    todoMainSection.appendChild(cancelButton);
    todoPopUp.appendChild(todoMainSection)

    // create side section

    const todoSidebar = document.createElement("div");
    todoSidebar.id = "todo-sidebar";

    const projectTitle = document.createElement("div"); 
    projectTitle.classList.add("todo-meta");
    projectTitle.textContent = project.name;

    const todoDueDate = document.createElement("div");
    todoDueDate.classList.add("todo-meta");
    todoDueDate.textContent = format(todo.dueDate, "MM-dd-yyyy");

    const todoPriority = document.createElement("div");
    todoPriority.classList.add("todo-meta");
    todoPriority.textContent = `Priority ${todo.priority}`;
    todoPriority.style.color = priorityColor(todo.priority);

    todoSidebar.appendChild(projectTitle);
    todoSidebar.appendChild(todoDueDate);
    todoSidebar.appendChild(todoPriority);
    todoPopUp.appendChild(todoSidebar);

    document.body.appendChild(todoPopUp);
    
}

export function renderSubTodos(projectManager, todo, subTodoList) {

    subTodoList.replaceChildren();

    todo.list.forEach(subTodo => {
        const subTodoBlock = document.createElement("div");
        subTodoBlock.classList.add("sub-todo-block");

        const subTodoInfo = document.createElement("div");
        subTodoInfo.classList.add("sub-todo-info");

        const removeSubTodoButton = document.createElement("button"); 
        removeSubTodoButton.classList.add("remove-sub-todo");
        removeSubTodoButton.textContent = "O";
        removeSubTodoButton.style.color = priorityColor(subTodo.priority);
        removeSubTodoButton.addEventListener("click", () => removeSubTodo(projectManager, todo, subTodo, subTodoList));
        subTodoInfo.appendChild(removeSubTodoButton);

        const subTodoName = document.createElement("div");
        subTodoName.classList.add("sub-todo-name");
        subTodoName.textContent = subTodo.name;
        subTodoInfo.appendChild(subTodoName);

        subTodoBlock.appendChild(subTodoInfo);

        const subTodoDueDate = document.createElement("div");
        subTodoDueDate.classList.add("sub-todo-due-date");
        subTodoDueDate.textContent = format(subTodo.dueDate, "MM-dd-yyyy");
        subTodoBlock.appendChild(subTodoDueDate);

        const subTodoDescription = document.createElement("div");
        subTodoDescription.classList.add("sub-todo-description");
        subTodoDescription.textContent = subTodo.description;
        subTodoBlock.appendChild(subTodoDescription);

        subTodoList.appendChild(subTodoBlock)
    });
}

function removeSubTodo(projectManager, todo, subTodo, subTodoListNode) {
    todo.remove(subTodo.name);
    save(projectManager);
    renderSubTodos(projectManager, todo, subTodoListNode);
}
